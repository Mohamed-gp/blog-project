import { useParams } from "react-router-dom"
import Posts from "../../components/posts/Posts"
import { posts } from "../../dummyData"
import { useEffect } from "react"

const Category = () => {
    const { category } = useParams()
    useEffect(() => {
        scrollTo(0,0)
    },[])
    return (
        <div className="container">
            <p className="py-6 text-3xl font-bold">Post Based On {category}</p>
            <Posts posts={posts}/>
        </div>
    )
}
export default Category
