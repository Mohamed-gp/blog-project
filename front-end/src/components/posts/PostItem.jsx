import { Link } from "react-router-dom"

const PostItem = ({ post }) => {
  return (
    <div className="flex flex-col w-full p-4 mb-8 bg-white rounded-lg post-item">
      <div className="object-contain mb-2 overflow-hidden w-[65%] mx-auto rounded-xl ">
        <img loading="lazy" src={`${post?.image?.url}`} alt={post?.title} className="mx-auto" />
      </div>
      <div className="flex flex-col gap-1 post-info">
        <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-b-black profile">
          <div className="flex items-center gap-1 text-xs sm:text-base ">
            <strong className="text-green-sea-color">
              Author:
            </strong>
            <Link to={`/profile/${post.user.id}`} className="font-medium capitalize text-primary-color" >{post?.user?.username}</Link>
          </div>
          <div className="font-bold post-date text-green-sea-color">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>

        <div className="flex items-center justify-between text-2xl font-bold post-details">
          <h4>{post?.title}</h4>
          <Link to={`/posts/categories/${post?.category}`} className="px-3 py-1 text-lg font-normal text-white rounded-lg bg-pumpkin-color ">{post?.category}</Link>
        </div>
        <p className="my-4 leading-relaxed post-description line-clamp-2">
          {post?.description}
          Lorem ipsum dolor sit amet consectetu
          r adipisicing elit. Velit natus ut tota
          m provident tempore? Eos nobis suscipit e
          a placeat, molestiae corporis quod cumque do
          loremque tenetur? Unde doloribus adipisci
          accusantium earum.
          Lorem ipsum dolor sit amet consectetu
          r adipisicing elit. Velit natus ut tota
          m provident tempore? Eos nobis suscipit e
          a placeat, molestiae corporis quod cumque do
          loremque tenetur? Unde doloribus adipisci
          accusantium earum.
          Lorem ipsum dolor sit amet consectetu
          r adipisicing elit. Velit natus ut tota
          m provident tempore? Eos nobis suscipit e
          a placeat, molestiae corporis quod cumque do
          loremque tenetur? Unde doloribus adipisci
          accusantium earum.
        </p>
        <Link className="w-full py-2 font-bold text-center text-white bg-green-color rounded-xl" to={`/posts/details/${post?._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  )
}
export default PostItem