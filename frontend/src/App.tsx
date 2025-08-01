import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'
import  Blogs from './pages/blogs'
import Create  from './pages/createBlog'
import  Edit  from './pages/edit'
import LandingPage from './pages/landing_page'
import { Loader } from './pages/Loader'
import  Preview from './pages/Preview'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Funny404 from './components/NotFound'
import UsernotFound from './components/UserNotfound'
import EditBlogById from './pages/edit_blogid'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/loading" element={<Loader />} />
          {/* returning all blogs  */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/edit" element={<Edit/>} />
          <Route path='/editblogbyid/:id' element={<EditBlogById/>}/>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/preview' element={< Preview/>} />
          <Route path='/dashboard' element={< Dashboard />} />
          {/* user profile paths = */}
          <Route path='/u/:username' element={<Profile />} />
          {/* 404 not found */}
          <Route path='/not-found' element={<Funny404/>} />
          <Route path='/user-not-found' element={< UsernotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App