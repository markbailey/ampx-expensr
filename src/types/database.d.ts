declare type IncomeExpenseType = 'expense' | 'income';

declare interface FirestoreDate {
  seconds: number;
  nanoseconds: number;
}

declare interface IncomeExpense {
  id: string;
  type: IncomeExpenseType;
  userId: string;
  categoryId: string;
  name: string;
  amount: number;
  date: FirestoreDate;
}

declare interface Category {
  id: string;
  userId: string;
  name: string;
  color: string;
}

declare type CategoryWithUseCount = Category & { useCount: number };
declare interface ItemWithCategory extends IncomeExpense {
  category?: string;
  dateTime: string;
}
