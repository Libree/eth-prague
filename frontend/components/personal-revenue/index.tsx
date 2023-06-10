import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { UsersIcon } from '../icons/breadcrumb/users-icon';
import { Flex } from '../styles/flex';
import {Box} from '../styles/box';
import { SalesChart } from '../charts/sales';
import { SalesForecastChart } from '../charts/sales-forecast';
import { User } from '../../context';
import { LoginToContinueModal } from '../modals/login-to-continue';

export const PersonalRevenue = () => {
   const { isLogged, setOpenAlertModal } = useContext(User);

   useEffect(() => {
      !isLogged && setOpenAlertModal(true);
   }, [isLogged]);

   return (
      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
            overflow: 'hidden',
         }}
         justify={'center'}
         direction={'column'}
      >
         <Breadcrumbs>
            <Crumb>
               <HouseIcon />
               <Link href={'/'}>
                  <CrumbLink href="#">Home</CrumbLink>
               </Link>
               <Text>/</Text>
            </Crumb>

            <Crumb>
               <UsersIcon />
               <CrumbLink href="#">Users</CrumbLink>
               <Text>/</Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#">List</CrumbLink>
            </Crumb>
         </Breadcrumbs>

         <Box css={{ margin: '0.5rem 0' }}>
            <Text h3>My Sales</Text>
            <SalesChart />
         </Box>

         <Box css={{ margin: '0.5rem 0' }}>
            <Text h3>Sales Forecast</Text>
            <SalesForecastChart />
         </Box>

         <LoginToContinueModal />
      </Flex>
   );
};
