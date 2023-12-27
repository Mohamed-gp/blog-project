import { useEffect, useState } from "react"
import Pagination from "../../components/pagination/Pagination"
import Posts from "../../components/posts/Posts"
import SideBarPosts from "../../components/side-bar-posts/SideBarPosts"
import Title from "../../components/title/Title"
import { categories, posts } from "../../dummyData"



const PostsPage = () => {
  const [postPerPage,setpostPerPage] = useState(2)
  const [currentPage,setcurrentPage] = useState(1)
  let firstIndex = (currentPage - 1 )  * postPerPage 
  let lastIndex = currentPage   * postPerPage 
  const postsPagesNumber = posts.length / postPerPage



  return (
    <>
      <div className="container px-6 pt-6">
        <Title title="Posts" />
        <div className="flex flex-col gap-6 content lg:flex-row">
          <div className="flex flex-col  flex-wrap items-center justify-center flex-[8]">
            <Posts posts={posts.slice(firstIndex,lastIndex)} />
            <Pagination currentPage={currentPage} setcurrentPage={setcurrentPage} postPerPage={postsPagesNumber}/>
          </div>
          <SideBarPosts categories={categories} />
        </div>
      </div>



    </>
  )
}
export default PostsPage