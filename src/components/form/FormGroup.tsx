import { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

type FormGroupProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function FormGroup(props: FormGroupProps) {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames('flex', 'flex-col', 'mb-4', 'last:mb-0', classNameProp);
  return <div {...otherProps} className={className} />;
}

export default FormGroup;
