import '@/styles/tiptap.scss'
import { Feed } from '@/views/feed/Feed'
import { Body, Left, Mid, Right } from '@/components/Body'
import FeedTop from '@/views/feed/FeedTop'

function App() {
  return (
    <>
      <FeedTop/>
      <Body>
        <Left/>
        <Mid>
          <Feed />
        </Mid>
        <Right/>
      </Body>
    </>
  )
}

export default () => (
  <App />
)
