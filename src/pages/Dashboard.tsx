import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  Legend,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { RootState } from '../store';
import { useDeleteRecordMutation } from '../services/firebase';
import { useAppSelector } from '../hooks';
import useModalForm, { ModalOptions } from '../hooks/useModalForm';
import useFirestore from '../hooks/useFirestore';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { BreakdownCard, OverviewCard } from '../components/card/';
import Modal from '../components/Modal';

const Region = { currency: 'GBP', locale: 'en-GB' } as const;
ChartJS.register(CategoryScale, LinearScale, BarElement, BarElement, Legend, Tooltip);

const getChartData = (totalIncome: number, totalExpenses: number) => ({
  labels: ['Total Income', 'Total Expenses', 'Remaining'],
  datasets: [
    {
      axis: 'y',
      label: 'Amount',
      data: [totalIncome, totalExpenses, totalIncome - totalExpenses],
      fill: false,
      backgroundColor: ['#33691e', '#b71c1c', '#ff6f00'],
    },
  ],
});

function Dashboard() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [deleteRecord] = useDeleteRecordMutation();

  const { categories, expenses, incomes } = useFirestore(user?.uid, Region.locale);
  const { modalProps, showModal, hideModal, renderForm } = useModalForm(categories);
  const remainingAmount = useMemo(() => totalIncome - totalExpenses, [totalExpenses, totalIncome]);

  const onAddItemClick = (type: 'income' | 'expense' | 'category') => () => {
    const title = type === 'category' ? 'Add category' : `Add ${type}`;
    const options = { type, action: 'add', title } as ModalOptions;
    showModal(options);
  };

  const onEditItemClick = (type: 'income' | 'expense' | 'category') => (id: string) => {
    const title = type === 'category' ? 'Edit category' : `Edit ${type}`;
    const options = { type, action: 'edit', title } as ModalOptions;
    const data =
      type === 'category'
        ? categories.find((category) => category.id === id)
        : [...incomes, ...expenses].find((item) => item.id === id);

    showModal({ ...options, data });
  };

  const onDeleteItemClick = (path: 'incomeAndExpenses' | 'categories') => (id: string) =>
    confirm('Are you sure you want to delete this record?') && deleteRecord({ id, path });

  useEffect(() => {
    const newTotalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalExpenses(newTotalExpenses);
  }, [expenses, setTotalExpenses]);

  useEffect(() => {
    const newTotalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    setTotalIncome(newTotalIncome);
  }, [incomes, setTotalIncome]);

  return (
    <Fragment>
      <Header user={user} />
      <Modal {...modalProps} onClosed={hideModal}>
        {renderForm()}
      </Modal>

      <main className="p-4 h-auto pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 mb-4">
          <OverviewCard
            icon="payments"
            name="Total Income"
            amount={totalIncome}
            className="text-lightgreen-900 dark:text-lightgreen-900"
            {...Region}
          />

          <OverviewCard
            icon="request-quote"
            name="Total Expenses"
            amount={totalExpenses}
            className="text-red-900 dark:text-red-900"
            {...Region}
          />

          <OverviewCard
            icon="savings"
            name="Remaining"
            amount={remainingAmount}
            className="!text-amber-900 dark:!text-amber-900 col-span-1 sm:col-span-2 lg:col-span-1"
            {...Region}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 mb-4">
          <div className="grid place-content-stretch place-self-stretch">
            <DataTable
              title="Incomes"
              columns={['name', 'category', 'amount', 'dateTime']}
              items={incomes}
              onItemAddClick={onAddItemClick('income')}
              onItemEditClick={onEditItemClick('income')}
              onItemDeleteClick={onDeleteItemClick('incomeAndExpenses')}
            />
          </div>

          <div className="grid place-content-stretch place-self-stretch">
            <DataTable
              title="Expenses"
              columns={['name', 'category', 'amount', 'dateTime']}
              items={expenses}
              onItemAddClick={onAddItemClick('expense')}
              onItemEditClick={onEditItemClick('expense')}
              onItemDeleteClick={onDeleteItemClick('incomeAndExpenses')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 mb-4">
          <BreakdownCard
            type="Incomes"
            items={incomes}
            categories={categories}
            className="place-self-stretch"
          />

          <div className="grid place-content-stretch place-self-stretch col-span-1 sm:col-span-2 lg:col-span-1 order-3 lg:order-2">
            <DataTable
              title="Categories"
              columns={['name', 'color', 'useCount']}
              items={categories}
              onItemAddClick={onAddItemClick('category')}
              onItemEditClick={onEditItemClick('category')}
              onItemDeleteClick={onDeleteItemClick('categories')}
            />
          </div>

          <BreakdownCard
            type="Expense"
            items={expenses}
            categories={categories}
            className="place-self-stretch order-2 lg:order-3"
          />
        </div>

        <div className="rounded-lg text-gray-800 bg-off-white dark:text-gray-400 dark:bg-gray-800 p-8 mb-4">
          <h2 className="text-center rounded-t-lg p-3 -mx-4 -mt-4 mb-2">Overview</h2>
          <Bar data={getChartData(totalIncome, totalExpenses)} />
        </div>
      </main>

      <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
        Created by <span className="text-blue-700 font-semibold">Mark Bailey</span>
      </p>
    </Fragment>
  );
}

export default Dashboard;
