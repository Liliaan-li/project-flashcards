import { useMemo } from 'react'

//origin code: https://github.com/dominicarrojado/react-typescript-pagination/blob/main/src/lib/pagination.ts

export const usePagination = (currentPage: number, lastPage: number, maxLength: number) => {
  return useMemo(() => {
    const res: number[] = []

    if (lastPage <= maxLength) {
      for (let i = 1; i <= lastPage; i++) {
        res.push(i)
      }
    } else {
      const firstPage = 1
      const confirmedPagesCount = 3
      const deductedMaxLength = maxLength - confirmedPagesCount
      const sideLength = deductedMaxLength / 2

      if (currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
        for (let j = 1; j <= sideLength + firstPage; j++) {
          res.push(j)
        }

        res.push(NaN)

        for (let k = lastPage - sideLength; k <= lastPage; k++) {
          res.push(k)
        }
      } else if (
        currentPage - firstPage >= deductedMaxLength &&
        lastPage - currentPage >= deductedMaxLength
      ) {
        const deductedSideLength = sideLength - 1

        res.push(1)
        res.push(NaN)

        for (let l of Array.from(
          { length: deductedMaxLength },
          (_, i) => currentPage - deductedSideLength + i
        )) {
          res.push(l)
        }

        res.push(NaN)
        res.push(lastPage)
      } else {
        const isNearFirstPage = currentPage - firstPage < lastPage - currentPage
        let remainingLength = maxLength

        if (isNearFirstPage) {
          for (let m = 1; m <= currentPage + 1; m++) {
            res.push(m)
            remainingLength -= 1
          }

          res.push(NaN)
          remainingLength -= 1

          for (let n of Array.from(
            { length: remainingLength },
            (_, i) => lastPage - (remainingLength - 1) + i
          )) {
            res.push(n)
          }
        } else {
          for (let o = lastPage; o >= currentPage - 1; o--) {
            res.unshift(o)
            remainingLength -= 1
          }

          res.unshift(NaN)
          remainingLength -= 1

          for (let p of Array.from({ length: remainingLength }, (_, i) => i + 1)) {
            res.unshift(p)
          }
        }
      }
    }

    return res
  }, [currentPage, lastPage, maxLength])
}
