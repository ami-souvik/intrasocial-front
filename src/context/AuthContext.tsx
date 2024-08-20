import { createContext } from 'react';
import axios from 'axios';
import SignIn, { type SignInFormInputs } from '../components/forms/SignIn';
import { useEnvars } from '../hooks/useEnvars';
import usePersistState from '../hooks/usePersistState';

type AuthProps = {
  access?: string | null
  refresh?: string | null
}

const AuthContext = createContext<AuthProps>({});

export default function AuthProvider({ children }: { children: any }) {
  const tokenDefault: AuthProps = { access: null, refresh: null }
  const [token, setToken] = usePersistState<AuthProps>('token', tokenDefault);

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
  return (
    <AuthContext.Provider value={{ ...token }}>
      { !(token.access || token.refresh) ? <SignIn onSubmit={handleSignIn} /> :
        <div className='flex flex-col space-y-4'>
          <button onClick={handleSignOut}>Sign Out</button>
          {children}
        </div>
      }
    </AuthContext.Provider>
  )
}