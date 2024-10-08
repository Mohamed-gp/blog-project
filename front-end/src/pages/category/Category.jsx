import { useParams } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostBasedCate, getPosts } from "../../redux/apiCalls/postsApiCall";

const Category = () => {
  const dispatch = useDispatch();
  const postsByCat = useSelector((state) => state.postsReducer.postsCate);

  const { category } = useParams();
  useEffect(() => {
    scrollTo(0, 0);
    dispatch(getPostBasedCate(category));
  }, []);
  return (
    <div
      className="container"
      style={{ minHeight: "calc(100vh - (81px +  48px))" }}
    >
      <p className="py-6 text-3xl font-bold">Post Based On {category}</p>
      {postsByCat.length === 0 && (
        <p className="text-2xl text-center">No Post Found In This Category</p>
      )}
      <Posts posts={postsByCat} />
    </div>
  );
};
export default Category;
