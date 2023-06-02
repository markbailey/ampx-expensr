// Need to use the React-specific entry point to import createApi
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  runTransaction,
  deleteDoc,
} from 'firebase/firestore';
import { RootState } from '../../store';

const db = getFirestore();
export const REDUCER_KEY = 'databaseApi';

// Define a service using a base URL and expected endpoints
export const databaseApi = createApi({
  reducerPath: REDUCER_KEY,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    addIncomeExpense: builder.mutation<string, Omit<IncomeExpense, 'id' | 'userId'>>({
      async queryFn(item, api) {
        const { auth } = api.getState() as RootState;
        const userId = auth.user?.uid as string;
        const date = new Date(item.date.seconds * 1000);
        const docRef = await addDoc(collection(db, 'incomeAndExpenses'), { ...item, date, userId });
        return { data: docRef.id };
      },
    }),

    addCategory: builder.mutation<string, Omit<Category, 'id' | 'userId'>>({
      async queryFn(item, api) {
        const { auth } = api.getState() as RootState;
        const userId = auth.user?.uid as string;
        const docRef = await addDoc(collection(db, 'categories'), { ...item, userId });
        return { data: docRef.id };
      },
    }),

    updateIncomeExpense: builder.mutation<string, IncomeExpense>({
      async queryFn(item, api) {
        const { auth } = api.getState() as RootState;
        const userId = auth.user?.uid as string;

        await runTransaction(db, async (transaction) => {
          const docRef = doc(db, 'incomeAndExpenses', item.id);
          const snapshot = await transaction.get(docRef);
          if (!snapshot.exists()) throw new Error(`${item.type} does not exist.`);
          const date = new Date(item.date.seconds * 1000);
          transaction.update(docRef, { ...item, date, userId });
        });

        return { data: item.id };
      },
    }),

    updateCategory: builder.mutation<string, Category>({
      async queryFn(item, api) {
        const { auth } = api.getState() as RootState;
        const userId = auth.user?.uid as string;

        await runTransaction(db, async (transaction) => {
          const docRef = doc(db, 'category', item.id);
          const snapshot = await transaction.get(docRef);
          if (!snapshot.exists()) throw new Error(`category does not exist.`);
          transaction.update(docRef, { ...item, userId });
        });

        return { data: item.id };
      },
    }),

    deleteRecord: builder.mutation<string, { id: string; path: string }>({
      async queryFn({ id, path }) {
        const docRef = doc(db, path, id);
        await deleteDoc(docRef);
        return { data: id };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddIncomeExpenseMutation,
  useAddCategoryMutation,
  useUpdateIncomeExpenseMutation,
  useUpdateCategoryMutation,
  useDeleteRecordMutation,
} = databaseApi;
