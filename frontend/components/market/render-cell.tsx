import React from 'react';
import { User, Text } from '@nextui-org/react';

interface Props {
   user: any;
   columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
   // @ts-ignore
   switch (columnKey) {
      case 'principal':
         return (
            <>3</>
         );
      case 'amount':
         return (
            <>{user.amount}</>
         );
      case 'collateral':
         return (
            <>{user.collateral}</>
         );
      case 'duration':
         return (
            <>{user.duration}</>
         );
      default:
         return <></>;
   }
};
