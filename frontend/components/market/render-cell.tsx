import React from 'react';
import { User, Text } from '@nextui-org/react';

interface Props {
   user: any;
   columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
   // @ts-ignore
   const cellValue = user[columnKey];
   switch (columnKey) {
      case 'token':
         return (
            <User squared src={user.picture?.original?.url} name={user.name} css={{ p: 0 }}>
               {user.token}
            </User>
         );
      case 'amount':
         return (
            <Text size={14} css={{ tt: 'capitalize' }}>
               {cellValue}
            </Text>
         );
      case 'price':
         return (
            <Text size={14} css={{ tt: 'capitalize' }}>
               {cellValue}
            </Text>
         );
      default:
         return cellValue;
   }
};
