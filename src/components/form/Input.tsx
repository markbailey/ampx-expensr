import classNames from 'classnames';
import { ForwardedRef, HTMLProps, forwardRef } from 'react';

type InputProps = HTMLProps<HTMLInputElement>;

const Input = forwardRef(function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(
    'bg-gray-50',
    'border',
    'border-gray-300',
    'text-gray-900',
    'sm:text-sm',
    'rounded-lg',
    'focus:ring-blue-600',
    'focus:border-blue-600',
    'block',
    'w-full',
    'p-2.5',
    'dark:bg-gray-700',
    'dark:border-gray-600',
    'dark:placeholder-gray-400',
    'dark:text-white',
    'dark:focus:ring-blue-500',
    'dark:focus:border-blue-500',
    classNameProp
  );

  return <input {...otherProps} ref={ref} className={className} />;
});

export default Input;
