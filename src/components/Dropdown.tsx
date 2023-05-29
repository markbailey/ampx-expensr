import classNames from 'classnames';
import {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  createRef,
  forwardRef,
  useState,
} from 'react';

import { mount } from '../utilities/show';
import useClickOutside from '../hooks/useClickOutside';

type MenuProps = HTMLAttributes<HTMLDivElement> & { open: boolean };
type DropdownProps = HTMLAttributes<HTMLDivElement> & { trigger: ReactElement };

export function MenuButton(props: HTMLAttributes<HTMLButtonElement>) {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(
    'w-full',
    'text-left',
    'py-2',
    'px-4',
    'text-sm',
    'hover:bg-gray-100',
    'dark:hover:bg-gray-600',
    'dark:hover:text-white',
    classNameProp
  );

  return <button {...otherProps} className={className} />;
}

const Menu = forwardRef(function Menu(props: MenuProps, ref: ForwardedRef<HTMLDivElement>) {
  const { className: classNameProp, open, ...otherProps } = props;
  const className = classNames(
    'z-50',
    'fixed',
    'text-base',
    'list-none',
    'bg-white',
    'rounded',
    'divide-y',
    'divide-gray-100',
    'shadow dark:bg-gray-700',
    'dark:divide-gray-600',
    classNameProp
  );

  return mount(open, <div ref={ref} {...otherProps} className={className} />);
});

function Dropdown(props: DropdownProps) {
  const { trigger, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});

  const ref = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
    if (triggerRef.current !== null && !isOpen) {
      const { height, top: triggerTop, right } = triggerRef.current.getBoundingClientRect();
      const { width } = document.body.getBoundingClientRect();
      setStyle({ top: triggerTop + height + 8, right: width - right });
    }
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref}>
      {cloneElement(trigger, {
        ref: triggerRef,
        'aria-expanded': isOpen,
        onClick: toggleMenu,
      })}

      <Menu {...otherProps} open={isOpen} style={style} />
    </div>
  );
}

export default Dropdown;
