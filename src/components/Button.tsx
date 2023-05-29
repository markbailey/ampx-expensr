import classNames from 'classnames';
import { ButtonHTMLAttributes, ForwardedRef, PropsWithChildren, forwardRef } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { className: classNameProps, ...otherProps } = props;
  const className = classNames(
    'flex',
    'items-center',
    'justify-center',
    'text-white',
    'bg-blue-700',
    'hover:bg-blue-800',
    'focus-visible:ring-4',
    'focus-visible:ring-blue-300',
    'active:ring-4',
    'active:ring-blue-300',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'px-4',
    'py-2',
    'dark:bg-blue-600',
    'dark:hover:bg-blue-700',
    'focus-visible:outline-none',
    'dark:focus-visible:ring-blue-800',
    'dark:active:ring-blue-800',
    classNameProps
  );

  return <button type="button" {...otherProps} ref={ref} className={className} />;
});

export const IconButton = forwardRef(function IconButton(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { className: classNameProps, ...otherProps } = props;
  const className = classNames(
    'p-2',
    'text-gray-500',
    'rounded-lg',
    'hover:text-gray-900',
    'hover:bg-gray-100',
    'dark:text-gray-400',
    'dark:hover:text-white',
    'dark:hover:bg-gray-700',
    'focus-visible:ring-4',
    'focus-visible:ring-gray-300',
    'active:ring-4',
    'active:ring-gray-300',
    'dark:focus-visible:ring-gray-600',
    'dark:active:ring-gray-600',
    classNameProps
  );

  return <button type="button" {...otherProps} ref={ref} className={className} />;
});

export default Button;
