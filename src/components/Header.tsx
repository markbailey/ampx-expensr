import { HTMLAttributes } from 'react';
import { IconButton } from './Button';
import Dropdown, { MenuButton } from './Dropdown';
import { signOut } from '../store/auth';
import { useAppDispatch } from '../hooks';

type HeaderProps = HTMLAttributes<HTMLElement> & { user: UserState | null };

function Header(props: HeaderProps) {
  const dispatch = useAppDispatch();
  const { user, ...otherProps } = props;

  const onSignOutClick = () => confirm('Are you sure you want to sign out?') && dispatch(signOut());

  return (
    <header {...otherProps} className="z-[999] fixed inset-0 bottom-auto shadow-md">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <span className="flexself-center text-2xl font-semibold uppercase whitespace-nowrap dark:text-white">
              Expense Tracker
            </span>
          </div>

          <div className="flex items-center lg:order-2">
            <Dropdown
              className="top-14 right-4 w-56"
              trigger={
                <IconButton className="flex mx-3 text-sm !rounded-full md:mr-0 !p-0">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/assets/avatar_male.png"
                    alt="user photo"
                  />
                </IconButton>
              }
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.email}
                </span>
              </div>

              <div className="py-1 font-light text-gray-500 dark:text-gray-400">
                <MenuButton onClick={onSignOutClick}>Sign out</MenuButton>
              </div>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
