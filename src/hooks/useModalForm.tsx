import { useState } from 'react';
import {
  useAddCategoryMutation,
  useAddIncomeExpenseMutation,
  useUpdateCategoryMutation,
  useUpdateIncomeExpenseMutation,
} from '../services/firebase';
import {
  CategoryForm,
  CategoryFormProps,
  IncomeExpenseForm,
  IncomeExpenseFormProps,
} from '../components/form';
import { ModalProps } from '../components/Modal';

type FormType = 'category' | 'income' | 'expense';
type FormAction = 'add' | 'edit';
type FormProps = CategoryFormProps | IncomeExpenseFormProps;
export interface ModalOptions {
  title: string;
  type: 'income' | 'expense' | 'category';
  action: 'add' | 'edit';
  data?: ItemWithCategory | Category;
}

function useModalForm(categories: Category[]) {
  const [modalProps, setModalProps] = useState<ModalProps>({ open: false, title: '' });
  const [formType, setFormType] = useState<FormType | null>(null);
  const [formProps, setFormProps] = useState<FormProps>({} as FormProps);

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [addIncomeExpense] = useAddIncomeExpenseMutation();
  const [updateIncomeExpense] = useUpdateIncomeExpenseMutation();

  const hideModal = () => {
    setModalProps({ open: false, title: '' });
    setFormType(null);
    setFormProps({} as FormProps);
  };

  const showModal = (options: ModalOptions) => {
    const { title, type, action, data } = options;
    setModalProps({ open: true, title });
    setFormType(type);

    switch (type) {
      case 'category':
        setFormProps({ data, onSubmit: onFormSubmit(type, action) } as FormProps);
        break;
      case 'income':
      case 'expense':
        setFormProps({ type, data, categories, onSubmit: onFormSubmit(type, action) } as FormProps);
        break;
      default:
        break;
    }
  };

  const onFormSubmit = (type: FormType, action: FormAction) => (data: IncomeExpense | Category) => {
    hideModal();
    switch (type) {
      case 'category':
        if (action === 'edit') updateCategory(data as Category);
        else addCategory(data as Category);
        break;
      case 'income':
      case 'expense':
        if (action === 'edit') updateIncomeExpense(data as IncomeExpense);
        else addIncomeExpense(data as IncomeExpense);
        break;
      default:
        break;
    }
  };

  const renderForm = () => {
    switch (formType) {
      case 'category':
        return <CategoryForm {...(formProps as CategoryFormProps)} />;
      case 'income':
      case 'expense':
        return <IncomeExpenseForm {...(formProps as IncomeExpenseFormProps)} />;
      default:
        return null;
    }
  };

  return { modalProps, showModal, hideModal, renderForm };
}

export default useModalForm;
