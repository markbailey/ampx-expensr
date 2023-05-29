import { FormEvent, createRef } from 'react';
import Button from '../Button';
import FormGroup from './FormGroup';
import Input from './Input';
import Label from './Label';

export interface FormProps {
  type: IncomeExpenseType;
  data?: ItemWithCategory;
  categories: Category[];
  onSubmit(data: IncomeExpense): void;
}

function formatDateTimeString(firestoreDate?: FirestoreDate) {
  if (firestoreDate === undefined) return '';

  const date = new Date(firestoreDate.seconds * 1000);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');

  return `${year}-${month}-${day}T${hour}:${minute}`;
}

function IncomeExpenseForm(props: FormProps) {
  const nameRef = createRef<HTMLInputElement>();
  const amountRef = createRef<HTMLInputElement>();
  const dateRef = createRef<HTMLInputElement>();
  const categoryRef = createRef<HTMLSelectElement>();

  const { type, data, categories, onSubmit } = props;
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef.current?.value ?? '';
    const amount = parseInt(amountRef.current?.value ?? '-1', 10);
    const dateValue = dateRef.current?.value ?? '';
    const categoryId = categoryRef.current?.value ?? '';

    if (name === '' || amount === -1 || dateValue === '' || categoryId === '') return;
    const date = new Date(dateValue);
    const firestoreDate = { seconds: date.getTime() / 1000, nanoseconds: 0 };
    const idProp = data !== undefined ? { id: data.id } : {};

    onSubmit({
      ...idProp,
      type,
      name,
      amount,
      date: firestoreDate,
      categoryId,
      userId: data?.userId,
    } as IncomeExpense);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            ref={nameRef}
            type="text"
            name="name"
            id="name"
            placeholder="Type product name"
            defaultValue={data?.name}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="amount">Amount</Label>
          <Input
            ref={amountRef}
            type="number"
            name="amount"
            id="amount"
            placeholder="2995"
            defaultValue={data?.amount}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">Date</Label>
          <Input
            ref={dateRef}
            type="dateTime-local"
            name="date"
            id="date"
            defaultValue={formatDateTimeString(data?.date)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <select
            ref={categoryRef}
            id="category"
            defaultValue={data?.categoryId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option>Select category</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
            ;
          </select>
        </FormGroup>
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export default IncomeExpenseForm;
