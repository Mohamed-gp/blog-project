import Pagination from "../../components/pagination/Pagination"
import Posts from "../../components/posts/Posts"
import SideBarPosts from "../../components/side-bar-posts/SideBarPosts"
import Title from "../../components/title/Title"
import { categories, posts } from "../../dummyData"

const PostsPage = () => {
  return (
    <>
      <div className="container px-6 pt-6">
        <Title title="Posts" />
        <div className="flex flex-col gap-6 content lg:flex-row">
          <div className="flex flex-col">
            <Posts posts={posts} />
            <Pagination />

          </div>
          <SideBarPosts categories={categories} />
        </div>
      </div>

    </>
  )
}
export default PostsPage