import { ApolloClient, InMemoryCache, gql } from '@apollo/client'


export const getSubscriptions = async() => {


    const APIURL = 'https://api.studio.thegraph.com/query/47837/lens-subscriptions/version/latest'

    const tokensQuery = `
{
    subscriptionPayments(first: 5) {
      id
      profileId
      follower
      amount
      tokenAddress
    }
  }
`
    const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
    })

    const data = await client
        .query({
            query: gql(tokensQuery),
        })

    return data

}