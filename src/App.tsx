import '@/styles/tiptap.scss'
import Notifications from '@/screens/Notifications'
import Profile from '@/views/profile/Profile'
import { Feed } from '@/views/feed/Feed'
import { Body, Left, Mid, Right } from '@/components/Body'
import FeedTop from '@/views/feed/FeedTop'

function App() {
  return (
    <>
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
    </>
  )
}

export default () => (
  <App />
)
