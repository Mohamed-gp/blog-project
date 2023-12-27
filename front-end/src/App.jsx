import Header from './components/header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/forms/Login'
import Register from './pages/forms/Register'
import PostsPage from './pages/posts-page/PostsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreatePost from './pages/create-post/CreatePost'
import Footer from './components/footer/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/posts' element={<PostsPage/>} />
          <Route path='/posts/create-post' element={<CreatePost/>} />
          <Route path='admin-dashboard' element={<AdminDashboard />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
