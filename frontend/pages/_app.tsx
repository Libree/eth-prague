import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Layout} from '../components/layout/layout';
import {ApolloProvider} from '@apollo/client';
import {client} from '../apollo-config';
import UserProvider from '../context/UserProvider';

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

function MyApp({Component, pageProps}: AppProps) {
   return (
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            light: lightTheme.className,
            dark: darkTheme.className,
         }}
      >
         <NextUIProvider>
            <UserProvider>
               <ApolloProvider client={client}>
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
               </ApolloProvider>
            </UserProvider>
         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
