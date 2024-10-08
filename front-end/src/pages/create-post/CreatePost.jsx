import { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/apiCalls/postsApiCall";
import { ThreeDots } from "react-loader-spinner";
import { getCategories } from "../../redux/apiCalls/categoriesCall";

const CreatePost = () => {
  const [postTitle, setpostTitle] = useState("");
  const [postCategory, setpostCategory] = useState("programming");
  const [postDescription, setpostDescription] = useState("");
  const [file, setfile] = useState(null);
  const dispatch = useDispatch();
  // to do : creating then navigate to home for the ux
  //  const createdPost = useSelector(state => state.postsReducer.inProcess)
  const loading = useSelector((state) => state.postsReducer.isLoading);

  const categories = useSelector((state) => state.categoriesReducer.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const formOnSubmit = (e) => {
    e.preventDefault();
    if (postTitle.trim() === "") {
      return toast.error(
        "post title" /*{position : "top-center",theme: "colored"})*/
      );
    }
    if (postCategory.trim() === "") {
      return toast.error("post category is required");
    }
    if (postDescription.trim() === "") {
      return toast.error("post description is required");
    }
    if (!file) {
      return toast.error("post image is required");
    }

    // we send it as formData because we have file and we can't send it as json
    const formData = new FormData();
    // key : value
    formData.append("image", file);
    formData.append("title", postTitle);
    formData.append("description", postDescription);
    formData.append("category", postCategory);
    dispatch(createPost(formData));
    // we can't send it in the console like this : console.log(formData)
    // for (const entry of formData.entries()) {
    //   console.log(entry);
    // }
  };

  return (
    <>
      <div
        className="container px-6 create-post-container"
        style={{ height: "calc(100vh - (81px +  55px))" }}
      >
        <div className="text-center">
          <Title title="Create New Post" />
        </div>
        <form
          onSubmit={formOnSubmit}
          action=""
          className="flex gap-2 flex-col lg:w-[450px] items-center mx-auto"
        >
          <input
            value={postTitle}
            type="text"
            className="w-full h-10 pl-4 rounded-xl"
            placeholder="Post Title"
            onChange={(e) => {
              setpostTitle(e.target.value);
            }}
          />
          <select
            value={postCategory}
            name=""
            id=""
            className="w-full h-10 pl-4 rounded-xl"
            onChange={(e) => {
              setpostCategory(e.target.value);
            }}
          >
            <option disabled>Select A Category</option>
            {categories?.map((category, index) => (
              <option
                value={category?.title}
                selected={index == 0}
                key={category?._id}
              >
                {category.title}
              </option>
            ))}
          </select>
          <textarea
            value={postDescription}
            name=""
            id=""
            className="w-full pt-4 pl-4 resize-none h-36 rounded-xl"
            placeholder="Post Description"
            onChange={(e) => {
              setpostDescription(e.target.value);
            }}
          ></textarea>
          <input
            type="file"
            name="file"
            id="file"
            className="w-full py-3 pl-4 cursor-pointer rounded-xl bg-gray-color"
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />
          {loading ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <input
              type="submit"
              value="Create"
              className="w-full h-10 font-bold text-white rounded-xl bg-blue-color"
            />
          )}
        </form>
      </div>
    </>
  );
};
export default CreatePost;
