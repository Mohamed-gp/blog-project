import { useParams } from "react-router-dom"
import Posts from "../../components/posts/Posts"
import { posts } from "../../dummyData"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../redux/apiCalls/postsApiCall"



const Category = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.postsReducer.posts)
    
    
    const { category } = useParams()
    useEffect(() => {
        scrollTo(0,0)
        dispatch(getPosts(undefined,category))
        console.log(posts)
    },[])
    return (
        <div className="container">
            <p className="py-6 text-3xl font-bold">Post Based On {category}</p>
            <Posts posts={posts}/>
        </div>
    )
}
export default Category
