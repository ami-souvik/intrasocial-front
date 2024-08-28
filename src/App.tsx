import './styles/tiptap.scss'

import { Top } from './components/Top'
import AuthProvider from './context/AuthContext'
import { useContentForm } from './context/ContentFormContext'
import Notifications from './screens/Notifications'
import Profile from './screens/Profile'
import { Feed } from './screens/feed/Feed'
import { Body, Left, Mid, Right } from './components/Body'
import AppWrapper from './AppWrapper'

function App() {
  const { openContentForm } = useContentForm()
  return (
    <AuthProvider>
      <Top>
        <div className="flex justify-end">
          <button className="bg-teal-700 rounded-2xl" onClick={openContentForm}>📝 Write</button>
        </div>
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

export default () => (
  <AppWrapper><App /></AppWrapper>
)
