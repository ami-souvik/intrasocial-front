import AuthProvider from './context/AuthContext'
import Profile from './screens/Profile'
import { Feed } from './screens/feed/Feed'

function App() {
  return (
    <AuthProvider>
      <div className='flex'>
        <div className='w-[275px]'>
          <Profile />
        </div>
        <div className='w-3/5'>
          <Feed />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
