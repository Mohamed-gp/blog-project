import { useState } from "react"


const Pagination = ({ currentPage, setcurrentPage, postsCount }) => {
  let emptyArray = []
  const pagesMax = Math.ceil(postsCount / 3)
  for (let i = 1; i <= pagesMax; i++) {
    emptyArray.push(i)
  }


  return (
    <>
      {pagesMax > 1 &&
        <div className="flex items-center justify-center mb-6">
          <button disabled={currentPage <= 1} className="px-3 py-2 text-white bg-blue-600 border border-orange-300 cursor-pointer disabled:opacity-50 rounded-l-2xl previous" onClick={() => { setcurrentPage(prev => prev - 1) }}>Prev</button>
          <div className="flex items-center page-number">
            {
              emptyArray.map(page => (
                <span onClick={() => { setcurrentPage(+page) }} key={page} className={`${page == currentPage ? "opacity-50" : ""} flex items-center justify-center w-full cursor-pointer h-full px-4 border border-orange-300 py-2 font-bold text-white bg-blue-600`}>{page}</span>
              ))
            }
          </div>

          <button disabled={currentPage >= pagesMax} className="px-3 py-2 text-white bg-blue-600 border border-orange-300 cursor-pointer next rounded-r-2xl disabled:opacity-50" onClick={() => { setcurrentPage(prev => prev + 1) }}>Next</button>

        </div>
      }
    </>
  )
}
export default Pagination