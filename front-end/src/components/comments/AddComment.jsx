import { useState } from "react"
import { toast } from "react-toastify"

const AddComment = () => {
  const [comment,setcomment] = useState("")
  const formOnSubmit = (e) => {
    e.preventDefault()
    setcomment("")
    return toast.success("comment added successfully")
  }
  return (
    <form onSubmit={formOnSubmit} className="flex flex-col items-end w-full gap-3 my-5">
      <input value={comment} onChange={(e) => {setcomment(e.target.value)}} type="text" placeholder="Add Your Comment" className="w-full py-3 pl-4"/>
      <button type="submit" disabled={comment.length === 0} className="px-4 py-1 text-white rounded-xl bg-blue-color disabled:opacity-50">Comment</button>
    </form>
  )
}
export default AddComment