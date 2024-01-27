import { useEffect, useState } from "react"
import Pagination from "../../components/pagination/Pagination"
import Posts from "../../components/posts/Posts"
import SideBarPosts from "../../components/side-bar-posts/SideBarPosts"
import Title from "../../components/title/Title"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, getPostsCount } from "../../redux/apiCalls/postsApiCall"
import { getCategories } from "../../redux/apiCalls/categoriesCall"




const PostsPage = () => {
  const dispatch = useDispatch()
  const [currentPage, setcurrentPage] = useState(1)
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getCategories())
  },[])
  const posts = useSelector(state => state.postsReducer.posts)
  const postsCount = useSelector(state => state.postsReducer.postsCount)
  const categories = useSelector(state => state.categoriesReducer.categories)
  
  useEffect(() => {
    dispatch(getPosts(currentPage))
  },[currentPage])
  useEffect(() => {
    dispatch(getPostsCount())
  })

  // const [postPerPage, setpostPerPage] = useState(2)
  // const [currentPage, setcurrentPage] = useState(1)
  // let firstIndex = (currentPage - 1) * postPerPage
  // let lastIndex = currentPage * postPerPage
  // const postsPagesNumber = posts.length / postPerPage



  return (
    <div className="container px-6 pt-6">
      <Title title="Posts" />
      <div className="hidden lg:block">
        <div className="flex-col gap-6 lg:flex content lg:flex-row">
          <Posts posts={posts} />
          <SideBarPosts categories={categories} />
        </div>
        <Pagination currentPage={currentPage} setcurrentPage={setcurrentPage} postsCount={postsCount}/>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-6 ">
          <Posts posts={posts} />
          <Pagination currentPage={currentPage} setcurrentPage={setcurrentPage} postsCount={postsCount} />
        </div>
        <SideBarPosts categories={categories} />
      </div>
    </div>
  )
}
export default PostsPage