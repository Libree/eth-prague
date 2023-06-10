import React, { useState, useEffect } from 'react';
import { Box } from '../styles/box';
import Chart, { Props } from 'react-apexcharts';
import { getSubscriptions } from '../../api/FetchGraphql';


export const SalesChart = () => {

   const [state, setState] = useState(
      [
         {
            name: 'Sales',
            data: [[]],
         },
      ]
   )

   const loadData = async () => {
      const subscriptions = await getSubscriptions()
      const subscriptionsFormated = subscriptions.data.subscriptionPayments.map((sub: any) => {
         return {
            ...sub,
            date: Date(sub.blockTimestamp)
         }
      })
      let cummulative = 0

      const values = subscriptionsFormated.map((sub: any) => { 
         cummulative += Number(sub.amount)
         return [parseInt(sub.blockTimestamp), cummulative] }
         )

      setState([
         {
            name: 'Sales',
            data: values,
         },
      ])
   }

   useEffect(() => {
      loadData()
   }, [])


   const options = {
      xaxis: {
         type: 'datetime',
      },
      tooltip: {
         x: {
            format: 'dd MMM yyyy'
         }
      }
   };

   return (

      <>
         <Box
            css={{
               width: '100%',
               zIndex: 5,
            }}
         >
            <div id="chart">
               <Chart
                  options={options}
                  series={state}
                  type="bar"
                  height={425}
               />
            </div>
         </Box>
      </>
   );
};
