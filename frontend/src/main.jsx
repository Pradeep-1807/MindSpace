import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Protected from './components/Protected.jsx'
import store from './store/store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import './index.css'

import { Home, Signup,  Posts, AddPost, SinglePostDetails, MyPosts, Profile } from './pages/index.js'

const router = createBrowserRouter([
  {
  path:'/',
  element: <App />,
  children: [
    {
      path:'/',
      element:(
        <Protected authentication={false}>
          <Home />
        </Protected>
      )
    },
    {
      path:'/signup',
      element:(
        <Protected authentication={false}>
          <Signup />
        </Protected>
      )
    },
    {
      path:'/posts',
      element:(
        <Protected authentication={true}>
          <Posts />
        </Protected>
      )
    },
    {
      path:'/add-post',
      element:(
        <Protected authentication={true}>
          <AddPost />
        </Protected>
      )
    },
    {
      path: '/post/:postId',
      element:(
        <Protected authentication={true}>
          <SinglePostDetails />
        </Protected>
      )
    },
    {
      path:'/my-posts',
      element:(
        <Protected authentication={true}>
          <MyPosts />
        </Protected>
      )
    },
    {
      path:'/profile',
      element:(
        <Protected authentication={true}>
          <Profile />
        </Protected>
      )
    }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
