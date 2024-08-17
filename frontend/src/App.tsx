import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'
import { Blogs } from './pages/blogs'
import { Createblog } from './pages/createBlog'
import { Edit } from './pages/edit'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          {/* returning all blogs  */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/edit" element={<Edit/>} />
          <Route path='/createblog' element={<Createblog/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App