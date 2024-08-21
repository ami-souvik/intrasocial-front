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
        <div className='flex-1 max-w-[800px]'>
          <Feed />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
