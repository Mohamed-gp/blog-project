import Title from "../../components/title/Title"

const CreatePost = () => {
  return (
    <>
      <div className="text-center">
        <Title title="Create New Post" />
      </div>
      <div className="contianer">
        <div className="w-[80%] mx-auto flex flex-col items-center gap-3 ">
          <input type="text" placeholder="Post Title" className="py-4 pl-5 w-80" />
          <select name="" id="">
            <option value="">music</option>
            <option value="">music</option>
            <option value="">music</option>
            <option value="">music</option>
            <option value="">music</option>
          </select>
          <input type="file" name="" id="" />
          <div className="w-full my-6 text-white rounded-lg bg-blue-color">
            <input type="submit" value="Create" className="w-full h-full py-4" />

          </div>
        </div>
      </div>
    </>
  )
}
export default CreatePost