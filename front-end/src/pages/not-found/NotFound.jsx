import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div style={{ height: "calc(100vh - (72px +  48px))" ,display : "flex",justifyContent :"center",flexDirection : "column",alignItems : "center"}}>
        <p className="my-3 text-6xl font-bold text-red-color">404</p>
        <p className="my-2 text-xl font-bold">Page Not Found</p>
        <Link to="/" className="px-5 py-1 font-bold text-white rounded-2xl bg-blue-color">Go To <span  className="text-xl font-bold ">Home Page</span></Link>
    </div>
  )
}
export default NotFound