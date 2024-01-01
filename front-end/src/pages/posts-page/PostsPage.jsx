import { useEffect, useState } from "react"
import Pagination from "../../components/pagination/Pagination"
import Posts from "../../components/posts/Posts"
import SideBarPosts from "../../components/side-bar-posts/SideBarPosts"
import Title from "../../components/title/Title"
import { categories, posts } from "../../dummyData"



const PostsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const [postPerPage, setpostPerPage] = useState(2)
  const [currentPage, setcurrentPage] = useState(1)
  let firstIndex = (currentPage - 1) * postPerPage
  let lastIndex = currentPage * postPerPage
  const postsPagesNumber = posts.length / postPerPage



  return (
    <>
      <div className="container px-6 pt-6">
        <Title title="Posts" />
        <div className="hidden lg:block">
          <div className="flex-col gap-6 lg:flex content lg:flex-row">
            <Posts posts={posts.slice(firstIndex, lastIndex)} />
            <SideBarPosts categories={categories} />
          </div>
          <Pagination currentPage={currentPage} setcurrentPage={setcurrentPage} postsPagesNumber={postsPagesNumber} />
        </div>
        <div className="lg:hidden">
          <div className="flex flex-col gap-6 ">
            <Posts posts={posts.slice(firstIndex, lastIndex)} />
            <Pagination currentPage={currentPage} setcurrentPage={setcurrentPage} postsPagesNumber={postsPagesNumber} />
          </div>
          <SideBarPosts categories={categories} />
        </div>
      </div>



    </>
  )
}
export default PostsPage