import { useState } from 'react'

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
  count?: number
  setCurrentPage: (page: number) => void
  page?: number
  pageOptions: number[]
  pageChange?: (itemPage: number) => void
  active?: boolean
  onChange?: (page: number) => void
  className?: string
}

export const Pagination = ({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
  page,
  pageOptions,
  pageChange,
}: PaginationProps) => {
  const pageNums = usePagination(currentPage, lastPage, maxLength)
  const [selectedPage, setSelectedPage] = useState(currentPage)

  const handleChangePage = (selectedPage: string) => {
    setSelectedPage(+selectedPage)
    setCurrentPage(+selectedPage)
  }
  const selectOptions = pageOptions.map(value => ({
    label: value.toString(),
    value: value.toString(),
  }))

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === lastPage

  const showPageSelect = !!page && !!pageOptions && !!pageChange
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
        <div
          className={classNames.selectBox}
          {...{
            page: selectedPage,
            pageOptions,
            pageChange,
          }}
        >
          Show
          <Select
            className={classNames.select}
            value={selectedPage.toString()}
            options={selectOptions}
            onValueChange={handleChangePage}
          />
          in page
        </div>
      )}
    </div>
  )
}
