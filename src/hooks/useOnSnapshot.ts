/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { collection, getFirestore, onSnapshot, query, QueryConstraint } from 'firebase/firestore';

const db = getFirestore();

export function useOnQuerySnapshot<T>(path: string, ...queryConstraints: QueryConstraint[]) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const q = query(collection(db, path), ...queryConstraints);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as T[];
      setData(newData);
    });

    return () => unsubscribe();
  }, []);

  return [data];
}
