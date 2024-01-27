import { Link } from "react-router-dom"
import Title from "../title/Title"

const SideBarPosts = ({ categories }) => {
  return (
    <div className="side-bar flex-[4]">
      <div className="flex justify-center mb-3 border-y-primary-color bg-[#c9baba] border-y-2">
        <Title title="CATEGORIES" />
      </div>
      <div className="flex flex-col items-center gap-2 my-4">
        {categories?.map(category => (
          <Link style={{ clipPath: "polygon(9% 0, 100% 0, 100% 100%, 9% 100%, 0 50%)" }} className="relative w-full py-2 text-lg font-bold text-center capitalize duration-500 category-link bg-gray-color hover:bg-pumpkin-color hover:text-white " key={category._id}
            to={`/posts/categories/${category.title}`}>
            {category.title}
          </Link>
        ))}
      </div>
    </div >
  )
}
export default SideBarPosts