import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from '../../button';
import icon from '../../assets/header-icon.gif';
import { Sheet, SheetContent, SheetTrigger } from '../../sheet';
import { HeaderItems } from './Header.constants';

import { useStores } from '@/shared/contexts';
import { useLogout } from '@/entities/User/hooks';

export const Header = observer(() => {
  const {
    userStore: { roles: userRoles },
  } = useStores();

  const { mutate } = useLogout();
  const handleLogoutClick = ():void => {
    mutate()
  }

  const links = HeaderItems.map(
    ({ name, link, roles }): ReactElement | undefined => {
      const hasAccess = Array.from(roles).some((role) =>
        userRoles.includes(role),
      );

      if (hasAccess) {
        return (
          <Link
            to={link}
            className='transition-colors hover:text-foreground/80 text-foreground'
            key={name}
          >
            {name}
          </Link>
        );
      }
    },
  );

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center mx-auto'>
        <div className='mx-4 hidden md:flex'>
          <nav className='mr-6 flex items-center space-x-2'>
            <img src={icon} className='w-12' />
            <span className='font-bold text-xl'>HITs Internship</span>
          </nav>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            {links}
          </nav>
        </div>

        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            {/* Здесь можно добавить поиск или другие элементы */}
          </div>
          <nav className='flex items-center'>
            <Button variant='outline' className='mr-2' onClick={handleLogoutClick}>
              Выйти
            </Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                className='px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='pr-0'>
              <MobileNav links={links} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
});

const MobileNav = ({ links }: { links: (ReactElement | undefined)[] }) => {
  return (
    <div className='flex flex-col space-y-3 pt-6 ml-6'>
      <div>
        <img src={icon} className='w-12 -ml-2' />
        <nav className='text-foreground font-bold text-lg mb-4'>
          HITs Internship
        </nav>
      </div>
      {links}
    </div>
  );
};
