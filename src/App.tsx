import '@/styles/tiptap.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Content from './views/content/Content'
import Profile from './views/profile/Profile'
import { Feed } from '@/views/feed/Feed'
import { Body, Left, Mid, Right } from '@/components/Body'
import FeedTop from '@/views/feed/FeedTop'
import ContentAdd from '@/views/content/ContentAdd'

function App() {
  return (
    <div id="app" className="h-screen overflow-y-scroll">
      <FeedTop />
      <Body className="pt-[68px]">
        <Left />
        <Mid>
          <RouterProvider router={router} />
        </Mid>
        <Right />
      </Body>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />
  },
  {
    path: '/content/create',
    element: <ContentAdd />
  },
  {
    path: '/content/:content',
    element: <Content />
  },
  {
    path: '/profile',
    element: <Profile />
  }
])

export default () => <App />
