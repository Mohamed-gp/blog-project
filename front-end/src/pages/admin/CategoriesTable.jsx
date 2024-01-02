import AdminSideBar from "./AdminSideBar"

const CategoriesTable = () => {
  return (
    <div className="flex" style={{ minHeight: "calc(100vh - (72px +  48px))" }}>
            <AdminSideBar />
            <table className="mx-auto space-x-2">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4, 5,6,7,8,9,10].map(item => (
                        <tr key={item}>
                            <td>{item}</td>
                            <td>{item}</td>
                            <td>{item}</td>
                            <td>{item}</td>
                            <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}
export default CategoriesTable