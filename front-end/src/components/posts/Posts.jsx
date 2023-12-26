import PostItem from "./PostItem"

const Posts = ({posts}) => {
  return (
    <div className="flex flex-wrap items-center justify-center flex-[8]">
        {posts.map(post => <PostItem post={post} key={post._id}/>)}
    </div>
  )
}
export default Posts