import { useParams } from "react-router-dom"
import { posts } from "../../dummyData"

const PostDetails = () => {
  const { id } = useParams()
  let post = posts.find(post => post._id === +id)
  return (
    <div className="container px-6 my-6">
      <div className="lg:w-[400px] mx-auto">
        <div>
          <img src={`/assets${post.image}`} alt="" />
        </div>
      </div>
    </div>
  )
}
export default PostDetails