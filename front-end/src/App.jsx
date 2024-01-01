import Header from './components/header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/forms/Login'
import Register from './pages/forms/Register'
import PostsPage from './pages/posts-page/PostsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreatePost from './pages/create-post/CreatePost'
import Footer from './components/footer/Footer'
import PostDetails from './pages/post-details/PostDetails'
import Category from './pages/category/Category'
import Profile from './pages/profile/Profile'



function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/posts'>
            <Route index element={<PostsPage />} />
            <Route path='create-post' element={<CreatePost />} />
            <Route path='details/:id' element={<PostDetails />} />
            <Route path='categories/:category' element={<Category />} />
          </Route>
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
