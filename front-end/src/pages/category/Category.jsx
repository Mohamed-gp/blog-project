import { useParams } from "react-router-dom"
import Posts from "../../components/posts/Posts"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPostBasedCate, getPosts } from "../../redux/apiCalls/postsApiCall"



const Category = () => {
    const dispatch = useDispatch()
    const postsByCat = useSelector(state => state.postsReducer.postsCate)
    
    
    const { category } = useParams()
    useEffect(() => {
        scrollTo(0,0)
        dispatch(getPostBasedCate(category))
        console.log(postsByCat)
    },[])
    return (
        <div className="container">
            <p className="py-6 text-3xl font-bold">Post Based On {category}</p>
            <Posts posts={postsByCat}/>
        </div>
    )
}
export default Category
