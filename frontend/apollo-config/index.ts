import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LENS_API } from '../lib/config';

export const client = new ApolloClient({ 
    uri: LENS_API, 
    cache: new InMemoryCache()
})