import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Pagination } from '@/components/ui/pagination/pagination.tsx'

export default {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>

export const Default = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const TOTAL_PAGES_COUNT = 10
  const lastPage = 20

  return (
    <>
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        maxLength={7}
        lastPage={lastPage}
        onChange={setPage}
        count={TOTAL_PAGES_COUNT}
        page={perPage}
        pageOptions={[1, 5, 8, 12, 20]}
        pageChange={setPerPage}
      />
    </>
  )
}
