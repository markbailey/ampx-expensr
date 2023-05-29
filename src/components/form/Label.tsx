import classNames from 'classnames';
import { HTMLProps } from 'react';

type LabelProps = HTMLProps<HTMLLabelElement>;

function Label(props: LabelProps) {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(
    'block',
    'mb-2',
    'text-sm',
    'font-medium',
    'text-gray-900',
    'dark:text-white',
    classNameProp
  );

  return <label {...otherProps} className={className} />;
}

export default Label;
