import React, { useContext, useEffect, useState } from 'react';
import { Table, Text } from '@nextui-org/react';
import { Box } from '../styles/box';
import { columns } from './data';
import { RenderCell } from './render-cell';
import { User } from '../../context';
import { getSubscriptions } from '.././../api/FetchGraphql';


export const SubsTableWrapper = () => {
   const { reload, getTokenMetadata } = useContext(User);
   const [subscriptions, setSubscriptions] = useState([]);

   const getData = async () => {
      const subscriptions = await getSubscriptions()
      const subscriptionsWithToken = await Promise.all(
         subscriptions.data.subscriptionPayments.map(async(token) => {
            const metadata = await getTokenMetadata(token.tokenAddress)
            console.log(metadata)
            return {
               ...token,
               ...metadata
            }
         })
      )

      console.log(subscriptionsWithToken)
      setSubscriptions(subscriptionsWithToken);
   };

   useEffect(() => {
      getData();
   }, [reload]);

   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
      >
         {!subscriptions.length ? (
            <Box css={{ margin: '5rem 0' }}>
               <Text b color={"gray"} css={{ padding: '0.1rem', marginTop: '3rem' }}>
                  No subscriptions found. Please add a subscription to see it here.
               </Text>
            </Box>
         ) : (
            <Table
               aria-label="Example table with custom cells"
               css={{
                  height: 'auto',
                  minWidth: '100%',
                  boxShadow: 'none',
                  width: '100%',
                  px: 0,
               }}
               selectionMode="none"
            >
               <Table.Header columns={columns}>
                  {(column) => (
                     <Table.Column
                        key={column.uid}
                        hideHeader={column.uid === 'actions'}
                        align={column.uid === 'actions' ? 'center' : 'start'}
                     >
                        {column.name}
                     </Table.Column>
                  )}
               </Table.Header>
               <Table.Body items={subscriptions}>
                  {(subscriptions) => (
                     <Table.Row>
                        {(columnKey) => (
                           <Table.Cell>
                              <RenderCell user={subscriptions} columnKey={columnKey} />
                           </Table.Cell>
                        )}
                     </Table.Row>
                  )}
               </Table.Body>
               <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={8}
                  onPageChange={(page) => console.log({ page })}
               />
            </Table>
         )}
      </Box>
   );
};
