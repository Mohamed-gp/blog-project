import { Link } from "react-router-dom"
import Hero from "../../components/hero/Hero"
import Posts from "../../components/posts/Posts"
import SideBarPosts from "../../components/side-bar-posts/SideBarPosts"
import Title from "../../components/title/Title"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getPosts } from "../../redux/apiCalls/postsApiCall"
import Swal from "sweetalert2"
import { getCategories } from "../../redux/apiCalls/categoriesCall"


const Home = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.postsReducer.posts)
  const categories = useSelector(state => state.categoriesReducer.categories)


  useEffect(() => {
    dispatch(getPosts())
    dispatch(getCategories())
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("userRegisteredMessage")) {
      Swal.fire({
        title: localStorage.getItem("userRegisteredMessage"),
        icon: "success",
      })
    }
    localStorage.removeItem("userRegisteredMessage")
  }, [localStorage.getItem("userRegisteredMessage")])

  return (
    <>
      {/* <Hero /> */}
      <div className="container px-6 pt-6" style={{minHeight : "calc(100vh - 80.5px - 54px)"}}>
        <Title title="Latest Posts" />
        <div className="flex flex-col gap-6 content lg:flex-row">
          <Posts posts={posts.slice(0, 2)} />
          <SideBarPosts categories={categories} />
        </div>
        <div className="flex mb-6 justify-center py-4 font-bold text-white bg-[#292b2c] see-all-postsp">
          <Link to="/posts" className="w-full h-full text-center">See All Posts</Link>
        </div>
      </div>
    </>
  )
}
export default Home