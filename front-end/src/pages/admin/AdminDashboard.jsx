import AdminMain from "./AdminMain"
import AdminSideBar from "./AdminSideBar"

const AdminDashboard = () => {
  return (
    <div className="flex" style={{ minHeight: "calc(100vh - (72px +  48px))" }}>
      <AdminSideBar/>
      <AdminMain/>
    </div>
  )
}
export default AdminDashboard