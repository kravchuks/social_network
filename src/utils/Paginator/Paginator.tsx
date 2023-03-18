import React, { useState } from "react";

import styles from "./Paginator.module.css";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  portionSize: number;
  currentPage: number;
  onPAgeChanged: (pageNumber: number) => void;
};

let Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  portionSize,
  currentPage,
  onPAgeChanged,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let RightPortionPageNumber = portionNumber * portionSize;
  return (
    <div>
      {portionNumber > 1 && (
        <button
          className={styles.submit}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= RightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              onClick={() => {
                onPAgeChanged(p);
              }}
              key={p}
              className={currentPage === p ? styles.selctedPage : styles.page}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          className={styles.submit}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
