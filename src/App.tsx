import '@/styles/tiptap.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Content from './views/content/Content'
import Profile from './views/profile/Profile'
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
          <RouterProvider router={router} />
        </Mid>
        <Right/>
      </Body>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/content/:content",
    element: <Content />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default () => (
  <App />
)
