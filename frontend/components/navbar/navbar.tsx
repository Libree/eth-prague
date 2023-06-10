import {Button, Input, Link, Navbar} from '@nextui-org/react';
import React, { useContext, useState, useEffect } from 'react';
import {SupportIcon} from '../icons/navbar/support-icon';
import {SearchIcon} from '../icons/searchicon';
import {Box} from '../styles/box';
import {BurguerButton} from './burguer-button';
import {NotificationsDropdown} from './notifications-dropdown';
import {UserDropdown} from './user-dropdown';
import { User } from '../../context';
import {TestUserModal} from '../modals/create-test-user';
import { useRouter } from 'next/router';
import SelectedHandle from '../selected-user/selected';

interface Props {
   children: React.ReactNode;
}

export const NavbarWrapper = ({children}: Props) => {
   const router = useRouter();
   const { isLogged, loginLens, checkIsLogged } = useContext(User);
   const [openModal, setOpenModal] = useState(false);

   useEffect(() => {
      isLogged && checkIsLogged();
   }, [router.pathname])

   const collapseItems = [
      'Profile',
      'Dashboard',
      'Activity',
      'Analytics',
      'System',
      'Deployments',
      'My Settings',
      'Team Settings',
      'Help & Feedback',
      'Log Out',
   ];
   return (
      <Box
         css={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            overflowY: 'auto',
            overflowX: 'hidden',
         }}
      >
         <Navbar
            isBordered
            css={{
               'borderBottom': '1px solid $border',
               'justifyContent': 'space-between',
               'width': '100%',
               '@md': {
                  justifyContent: 'space-between',
               },

               '& .nextui-navbar-container': {
                  'border': 'none',
                  'maxWidth': '100%',

                  'gap': '$6',
                  '@md': {
                     justifyContent: 'space-between',
                  },
               },
            }}
         >
            <Navbar.Content showIn="md">
               <BurguerButton />
            </Navbar.Content>
            <Navbar.Content
               hideIn={'md'}
               css={{
                  width: '100%',
               }}
            >
               <Input
                  clearable
                  contentLeft={
                     <SearchIcon
                        fill="var(--nextui-colors-accents6)"
                        size={16}
                     />
                  }
                  contentLeftStyling={false}
                  css={{
                     'w': '100%',
                     'transition': 'all 0.2s ease',
                     '@xsMax': {
                        w: '100%',
                        // mw: '300px',
                     },
                     '& .nextui-input-content--left': {
                        h: '100%',
                        ml: '$4',
                        dflex: 'center',
                     },
                  }}
                  placeholder="Search..."
               />
            </Navbar.Content>
            <Navbar.Content>
               <Box css={{ width: '2rem', '@md': { width: '5rem' }, '@lg' : { width: '10rem' } }} />

               {isLogged ? (
                  <>
                     <Navbar.Content hideIn={'md'}>
                        <SelectedHandle />
                     </Navbar.Content>

                     <Navbar.Content>
                        <NotificationsDropdown />
                     </Navbar.Content>

                     <Navbar.Content hideIn={'md'}>
                        <SupportIcon />
                     </Navbar.Content>

                     <Navbar.Content>
                        <UserDropdown />
                     </Navbar.Content>
                  </>
               ) : (
                  <>
                     <Navbar.Content>
                        <Button
                           color="secondary"
                           css={{ minWidth: '100%' }}
                           onPress={loginLens}
                        >
                           Login
                        </Button>
                     </Navbar.Content>
                  </>
               )}
            </Navbar.Content>

            <Navbar.Collapse>
               {collapseItems.map((item, index) => (
                  <Navbar.CollapseItem
                     key={item}
                     activeColor="secondary"
                     css={{
                        color:
                           index === collapseItems.length - 1 ? '$error' : '',
                     }}
                     isActive={index === 2}
                  >
                     <Link
                        color="inherit"
                        css={{
                           minWidth: '100%',
                        }}
                        href="#"
                     >
                        {item}
                     </Link>
                  </Navbar.CollapseItem>
               ))}
            </Navbar.Collapse>
         </Navbar>
         {children}
         <TestUserModal
            openModal={openModal}
            closeHandler={() => setOpenModal(false)}
         />
      </Box>
   );
};
