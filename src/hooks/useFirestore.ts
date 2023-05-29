import { where } from 'firebase/firestore';
import { useOnQuerySnapshot } from './useOnSnapshot';
import { useCallback } from 'react';

function useFirestore(userId: string | undefined, locale: string) {
  const queryConstraints = userId !== undefined ? [where('userId', '==', userId)] : [];
  const [items] = useOnQuerySnapshot<IncomeExpense>('incomeAndExpenses', ...queryConstraints);
  const [categories] = useOnQuerySnapshot<Category>('categories', ...queryConstraints);

  const itemsWithCategory = useCallback(
    (items: IncomeExpense[], type: IncomeExpenseType) =>
      items
        .filter((item) => item.type === type)
        .map((item) => ({
          ...item,
          category: categories.find(({ id }) => id === item.categoryId)?.name,
          dateTime: new Date(item.date.seconds * 1000).toLocaleString(locale),
        }))
        .sort((a, b) => b.dateTime.localeCompare(a.dateTime)),
    [categories, locale]
  );

  const categoriesWithUseCount = useCallback(
    (categories: Category[]) =>
      categories.map((category) => ({
        ...category,
        useCount: items.filter((item) => item.categoryId === category.id).length,
      })),
    [items]
  );

  return {
    categories: categoriesWithUseCount(categories),
    expenses: itemsWithCategory(items, 'expense'),
    incomes: itemsWithCategory(items, 'income'),
  };
}

export default useFirestore;
