const Pagination = () => {
  return (
    <div className="flex items-center justify-center">
        <span className="p-2 text-white bg-blue-600 rounded-l-2xl previous">Prev</span>
        <div className="page-number">
            {
                [1,2,3,4,5].map(page => (
                    <span className="w-full h-full p-2 font-bold text-white bg-blue-400 ">{page}</span>
                ))
            }
        </div>
        <span className="p-2 text-white bg-blue-600 next rounded-r-2xl">Next</span>
    </div>
  )
}
export default Pagination