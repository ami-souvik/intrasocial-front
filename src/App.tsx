import './App.css'
import AuthProvider from './context/AuthContext'
import { Feed } from './screens/feed/Feed'

function App() {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">
        Hello world!
      </h1>
      <AuthProvider>
        <h1 className="text-3xl font-bold underline">
          Welcome to IntraSocial
        </h1>
        <Feed />
      </AuthProvider>
    </>
  )
}

export default App
