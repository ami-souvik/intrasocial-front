import AuthProvider from './context/AuthContext'
import Notifications from './screens/Notifications'
import Profile from './screens/Profile'
import { Feed } from './screens/feed/Feed'

function App() {
  return (
    <AuthProvider>
      <div className='flex'>
        <div className='hidden lg:block w-full lg:w-1/4'>
          <div className='fixed w-full lg:w-1/4'>
            <Profile />
          </div>
        </div>
        <div className='w-screen lg:w-1/2'>
          <Feed />
        </div>
        <div className='hidden lg:block w-full lg:w-1/4'>
          <Notifications />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
