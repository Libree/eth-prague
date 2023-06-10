import React from 'react';
import {User as UserCell} from '@nextui-org/react';
import { formatAddress } from '../../utils';

interface Props {
   user: any;
   columnKey: string | React.Key;
}

export const RenderCell = ({user, columnKey}: Props) => {
   // @ts-ignore
   const cellValue = user[columnKey];
   switch (columnKey) {
      case 'name':
         return (
            <UserCell squared src={user.picture?.original?.url} name={user.name || formatAddress(user.ownedBy)} css={{p: 0}}>
               {user.handle}
            </UserCell>
         );
      case 'symbol':
         return (
            <></>
         );
      case 'price':
         return (
            <></>
         );
      case 'paymentToken':
         return (
            <></>
         );
      case 'address':
         return (
            <></>
         );
      default:
         return cellValue;
   }
};
