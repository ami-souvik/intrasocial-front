import { createContext, useContext } from 'react';
import axios from 'axios';
import SignIn, { type SignInFormInputs } from '@/views/guest/SignIn';
import { useEnvars } from '../hooks/useEnvars';
import usePersistState from '../hooks/usePersistState';
import { checkRefresh } from '@/utils/webservice';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type AuthProps = {
  handleSignOut?: () => void
  access?: string | null
  refresh?: string | null
}

type Token = {
  access: string | null
  refresh: string | null
}

const AuthContext = createContext<AuthProps>({});

export default function AuthProvider({ children }: { children: any }) {
  const tokenDefault: Token = { access: null, refresh: null }
  const [token, setToken] = usePersistState<Token>('token', tokenDefault);

  const { VITE_API_BASE_URL } = useEnvars();
  function handleSignIn(data: SignInFormInputs) {
    axios
      .post(
        `${VITE_API_BASE_URL}/api/v1/token/`,
        data
      )
      .then((res) => {
        const { access, refresh } = res.data
        setToken({ access, refresh })
      })
      .catch(err => {
        alert(String(err))
      });
  }
  function handleSignOut() {
    setToken(tokenDefault)
  }

  // ApolloClient: GraphQL
  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_API_BASE_URL}/graphql/`,
  });

  const authLink = setContext((_, { headers }) => {
    return checkRefresh(token).then(t => {
      if(!t) {
        setToken(tokenDefault)
        throw Error("Authorization invalid or expired")
      }
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${t.access}`
        }
      }
    })
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  if(!(token.access || token.refresh)) return <SignIn onSubmit={handleSignIn} />
  return (
    <AuthContext.Provider value={{ handleSignOut, ...token }}>
      <ApolloProvider client={client}>
      {children }
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}