import '@/styles/tiptap.scss'

import AuthProvider from '@/context/AuthContext'
import Notifications from '@/screens/Notifications'
import Profile from '@/views/profile/Profile'
import { Feed } from '@/views/feed/Feed'
import { Body, Left, Mid, Right } from '@/components/Body'
import AppWrapper from '@/AppWrapper'
import FeedTop from '@/views/feed/FeedTop'

function App() {
  return (
    <AuthProvider>
      <FeedTop/>
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
