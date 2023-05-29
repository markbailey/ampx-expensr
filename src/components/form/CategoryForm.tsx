import { FormEvent, createRef } from 'react';
import Button from '../Button';
import FormGroup from './FormGroup';
import Input from './Input';
import Label from './Label';

export type FormProps = {
  data?: Category;
  onSubmit(data: Category): void;
};

function CategoryForm(props: FormProps) {
  const nameRef = createRef<HTMLInputElement>();
  const colorRef = createRef<HTMLInputElement>();
  const { data, onSubmit } = props;

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value ?? '';
    const color = colorRef.current?.value ?? '';

    if (name === '' || color === '') return;
    const idProp = data !== undefined ? { id: data.id } : {};

    onSubmit({
      ...idProp,
      name,
      color,
      userId: data?.userId ?? '',
    } as Category);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          placeholder="Category name"
          defaultValue={data?.name}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="color">Color</Label>
        <Input
          ref={colorRef}
          type="color"
          name="color"
          id="color"
          className="h-10"
          placeholder="color"
          defaultValue={data?.color}
          required
        />
      </FormGroup>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export default CategoryForm;
