import { Link } from "react-router-dom"

const AdminCardLink = ({count,link}) => {
  return (
    <div className="flex flex-col flex-wrap p-2 border-2 border-black rounded-xl w-[100%] sm:w-[47%] lg:w-[23%]">
        <p className="text-xl font-bold capitalize">{link}</p>
        <p className="mb-2 text-xl font-bold text-red-500">{count}</p>
        <div className="flex items-center justify-end">
            <Link className="px-2 py-1 text-sm text-white rounded-lg bg-green-color" to={`/admin-dashboard/${link}-table`}>see All {link}</Link>
        </div>
    </div>
  )
}
export default AdminCardLink