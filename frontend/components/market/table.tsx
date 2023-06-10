import React from 'react';
import { Table, Text } from '@nextui-org/react';
import { Box } from '../styles/box';
import { columns } from './data';
import { RenderCell } from './render-cell';

interface TableProps {
   profiles: any[];
}

export const MarketTableWrapper = ({ profiles }: TableProps) => {
   const users = profiles;
   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
      >
         {!users.length ? (
            <Box css={{ margin: '5rem 0' }}>
               <Text b color={"gray"} css={{ padding: '0.1rem', marginTop: '3rem' }}>
                  No data found. Create a new order to see it here.
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
               <Table.Body items={users}>
                  {(profile) => (
                     <Table.Row>
                        {(columnKey) => (
                           <Table.Cell>
                              <RenderCell user={profile} columnKey={columnKey} />
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
