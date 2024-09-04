import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import App from '@/App.tsx'
import '@/index.css'
import { checkRefresh } from '@/utils/webservice';
import Content from './views/content/Content';
import AuthProvider from './context/AuthContext';
import AppWrapper from './AppWrapper';

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_BASE_URL}/graphql/`,
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/content/:contentId",
    element: <Content />,
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <AppWrapper>
          <RouterProvider router={router} />
        </AppWrapper>
      </AuthProvider>
    </ApolloProvider>
  // </StrictMode>,
)
