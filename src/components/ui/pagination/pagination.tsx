import s from './pagination.module.scss'

import { ArrowLeft } from '@/assets/icons/components/arrow/arrow-left-icon.tsx'
import { ArrowRight } from '@/assets/icons/components/arrow/arrow-right-icon.tsx'
import { PagePagination } from '@/components/ui/pagination/page-pagination.tsx'
import { usePagination } from '@/components/ui/pagination/usePagination.ts'
import { Select } from '@/components/ui/select'

export type PaginationProps = {
  currentPage: number
  lastPage: number
  maxLength: number
  setCurrentPage: (page: number) => void
  page: number
  options: number[]
  pageChange: (itemPage: number) => void
  className?: string
}

export const Pagination = ({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
  page,
  options,
  pageChange,
}: PaginationProps) => {
  const pageNums = usePagination(currentPage, lastPage, maxLength)

  const handleChangePage = (selectedPage: string) => {
    pageChange(+selectedPage)
  }
  const selectOptions = options.map(value => ({
    label: value.toString(),
    value: value.toString(),
  }))

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === lastPage

  const showPageSelect = !!page && !!options && !!pageChange
  const classNames = {
    root: s.root,
    button: s.button,
    item: s.item,
    selectBox: s.selectBox,
    select: s.select,
  }

  return (
    <div className={classNames.root}>
      <button
        disabled={isFirstPage}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={classNames.button}
      >
        <ArrowLeft size={16} />
      </button>
      {pageNums.map((p, i) => (
        <PagePagination
          key={i}
          active={currentPage === p}
          onClick={() => setCurrentPage(p)}
          disabled={isNaN(p)}
          className={`${classNames.item} ${p === currentPage ? s.active : ''}`}
        >
          {!isNaN(p) ? p : '...'}
        </PagePagination>
      ))}
      <button
        disabled={isLastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={classNames.button}
      >
        <ArrowRight size={16} />
      </button>
      {showPageSelect && (
        <div className={classNames.selectBox}>
          Show
          <Select
            className={classNames.select}
            value={page.toString()}
            options={selectOptions}
            onValueChange={handleChangePage}
          />
          in page
        </div>
      )}
    </div>
  )
}
