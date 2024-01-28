import Header from './components/header/Header'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
import UsersTable from './pages/admin/UsersTable'
import CommentsTable from './pages/admin/CommentsTable'
import PostsTable from './pages/admin/PostsTable'
import CategoriesTable from './pages/admin/CategoriesTable'
import ForgetPassword from './pages/forms/ForgetPassword'
import ResetPassword from './pages/forms/ResetPassword'
import NotFound from './pages/not-found/NotFound'
import { useSelector } from 'react-redux'



function App() {
  const user = useSelector(state => state.auth.user)
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={user ? <Navigate to="/"/> : <Login />} />
          <Route path='/register' element={user ? <Navigate to="/"/> : <Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/posts'>
            <Route index element={<PostsPage />} />
            <Route path='create-post' element={!user ? <Navigate to="/"/> : <CreatePost />} />
            <Route path='details/:id' element={<PostDetails />} />
            <Route path='categories/:category' element={<Category />} />
          </Route>
          <Route path='/admin-dashboard'>
            <Route index element={!user?.isAdmin ? <Navigate to="/"/> : <AdminDashboard />} />
            <Route path='users-table' element={!user?.isAdmin ? <Navigate to="/"/> : <UsersTable />} />
            <Route path='comments-table' element={!user?.isAdmin ? <Navigate to="/"/> : <CommentsTable />} />
            <Route path='posts-table' element={!user?.isAdmin ? <Navigate to="/"/> : <PostsTable />} />
            <Route path='categories-table' element={!user?.isAdmin ? <Navigate to="/"/> : <CategoriesTable />} />
          </Route>
          <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to="/" />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
