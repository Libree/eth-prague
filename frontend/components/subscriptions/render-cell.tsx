import React from 'react';
import { User as UserCell } from '@nextui-org/react';
import { formatAddress } from '../../utils';

interface Props {
   user: any;
   columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
   // @ts-ignore
   const cellValue = user[columnKey];
   switch (columnKey) {
      case 'name':
         return (
            <>{user.name}</>
         );
      case 'symbol':
         return (
            <>{user.symbol}</>
         );
      case 'price':
         return (
            <>{user.amount}</>
         );
      case 'paymentToken':
         return (
            <>USDC</>
         );
      case 'address':
         return (
            <>{user.tokenAddress}</>
         );
      default:
         return cellValue;
   }
};
