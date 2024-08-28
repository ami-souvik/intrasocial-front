import { Top } from './components/Top'
import AuthProvider from './context/AuthContext'
import Notifications from './screens/Notifications'
import Profile from './screens/Profile'
import { Feed } from './screens/feed/Feed'
import ContentForm from './components/forms/ContentForm'
import { Body, Left, Mid, Right } from './components/Body'

function App() {
  return (
    <AuthProvider>
      <Top>
        <ContentForm />
      </Top>
      <Body>
        <Left>
          <Profile />
        </Left>
        <Mid>
          <Feed />
        </Mid>
        <Right>
          <Notifications />
        </Right>
      </Body>
    </AuthProvider>
  )
}

export default App
