import { Link } from "react-router-dom"
import Hero from "../../components/hero/Hero"
import Posts from "../../components/posts/Posts"
import SideBarPosts from "../../components/side-bar-posts/SideBarPosts"
import Title from "../../components/title/Title"
import {posts,categories} from "../../dummyData"

const Home = () => {
  return (
    <>
    <Hero/>
    <div className="container px-6 pt-6">
      <Title title="Latest Posts" />
      <div className="flex flex-col gap-6 content lg:flex-row">
        <Posts posts={posts.slice(0,2)}/>
        <SideBarPosts categories={categories}/>
      </div>
    </div>
      <div className="flex justify-center py-4 font-bold text-white bg-[#292b2c] see-all-postsp">
        <Link to="/posts" className="w-full h-full text-center">See All Posts</Link>
      </div>
    </>
  )
}
export default Home