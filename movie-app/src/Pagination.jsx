import _ from "lodash";
import React from "react";

const Pagination = (props) => {
  const { movieCount, pageCount, currentPage, onPageChange } = props;

  console.log(`Current Page: ${currentPage}`);
  console.log(`Total Movies: ${movieCount}`);
  const btnCount = Math.ceil(movieCount / pageCount);

  if (btnCount === 1) return null;

  const noOnBtn = _.range(1, btnCount + 1);
  console.log(`Buttons: ${noOnBtn}`);

  return (
    <ul className="flex items-center justify-center space-x-2 mt-4">
      {noOnBtn.map((page) => (
        <li key={page}>
          <a
            href="#"
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 text-lg font-semibold rounded-lg border shadow-md transition-all ${
              currentPage === page
                ? "bg-red-800 text-white border-red-800"
                : "bg-red-500 text-white hover:bg-red-600 border-red-500"
            }`}
          >
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
