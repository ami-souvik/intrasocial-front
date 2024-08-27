import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import App from './App.tsx'
import './index.css'

import { checkRefresh } from './utils/webservice';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
});

const authLink = setContext((_, { headers }) => {
  return checkRefresh().then(access => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${access}`
      }
    }
  })
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  // </StrictMode>,
)
