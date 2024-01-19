import { Link } from "react-router-dom"
import Hero from "../../components/hero/Hero"
import Posts from "../../components/posts/Posts"
import SideBarPosts from "../../components/side-bar-posts/SideBarPosts"
import Title from "../../components/title/Title"
import {categories} from "../../dummyData"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPosts } from "../../redux/apiCalls/postsApiCall"
import Swal from "sweetalert2"


const Home = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.postsReducer.posts)
  const registeredMessage = useSelector(state => state.auth.registerUser)

  useEffect(() => {
    dispatch(getPosts())
  },[])
  if (registeredMessage) {
    Swal.fire({
      title: registeredMessage,
      text: registeredMessage,
      icon: "success",
    })
    
  }
  return (
    <>
    <Hero/>
    <div className="container px-6 pt-6">
      <Title title="Latest Posts" />
      <div className="flex flex-col gap-6 content lg:flex-row">
        <Posts posts={posts.slice(0,2)}/>
        <SideBarPosts categories={categories}/>
      </div>
      <div className="flex mb-6 justify-center py-4 font-bold text-white bg-[#292b2c] see-all-postsp">
        <Link to="/posts" className="w-full h-full text-center">See All Posts</Link>
      </div>
    </div>
    </>
  )
}
export default Home