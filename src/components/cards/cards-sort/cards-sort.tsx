import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './cards-sort.module.scss'

import { ArrowDown } from '@/assets/icons/components/arrow/arrow-down-icon.tsx'
import { ArrowUp } from '@/assets/icons/components/arrow/arrow-up-icon.tsx'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

export type Column = {
  key: string
  title: string
  sortable?: boolean
  className?: string
}

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

type Props = Omit<
  ComponentPropsWithoutRef<typeof Table.Head> & {
    columns: Column[]
    sort?: Sort
    onSort?: (sort: Sort) => void
  },
  'children'
>

export const CardsSort = forwardRef<ElementRef<typeof Table.Head>, Props>(
  ({ columns, sort, onSort, ...restProps }, ref) => {
    const sorted = (key: string, sortable?: boolean) => () => {
      if (!onSort || !sortable) {
        return
      }

      if (sort?.key !== key) {
        return onSort({ key, direction: 'asc' })
      }

      if (sort.direction === 'desc') {
        return onSort(null)
      }

      return onSort({
        key,
        direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      })
    }

    return (
      <Table.Head ref={ref} {...restProps}>
        <Table.Row>
          {columns.map(({ title, key, sortable, className }) => {
            const classNames = clsx(sortable && s.active, className)

            return (
              <Table.HeadCell key={key} onClick={sorted(key, sortable)} className={classNames}>
                <Typography.Subtitle2 className={s.sort}>
                  {title}
                  {sort && sort.key === key && (
                    <>
                      {sort.direction === 'asc' && <ArrowUp className={s.sortIcon} size={20} />}
                      {sort.direction !== 'asc' && <ArrowDown className={s.sortIcon} size={20} />}
                    </>
                  )}
                </Typography.Subtitle2>
              </Table.HeadCell>
            )
          })}
        </Table.Row>
      </Table.Head>
    )
  }
)
