import { Link } from 'react-router-dom'

import s from './table-for-decks-page.module.scss'

import { DeleteOutlined } from '@/assets/icons/components/DeleteForever/DeleteOutlined.tsx'
import Edit from '@/assets/icons/components/edit/edit.tsx'
import { Play } from '@/assets/icons/components/play/Play.tsx'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { DecksResponse } from '@/services/decks'

type TablePropsType = {
  decks: DecksResponse
  currentUserId: string | undefined
  onEditClick: (id: string) => void
  onDeleteClick: (id: string) => void
}

const TableForDecksPage = ({
  decks,
  currentUserId,
  onDeleteClick,
  onEditClick,
}: TablePropsType) => {
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)
  const handleEditClick = (id: string) => () => onEditClick(id)

  if (decks.items.length < 0) {
    return <div>no card</div>
  }

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell className={s.table_cell_name}>Name</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_cards}>Cards</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_lastUpdated}>Last Updated</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_creator}>Created by</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_empty} />
        </Table.Row>
      </Table.Head>
      <Table.Body
        style={{
          borderLeft: '1px solid var(--color-dark-500)',
          borderRight: '1px solid var(--color-dark-500)',
        }}
      >
        {decks.items.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <div className={s.nameCell}>
                {item.cover !== null ? (
                  <Link to={`/decks/${item.id}/cards`}>
                    <img alt={item.name} src={item.cover} className={s.deckImage} />
                  </Link>
                ) : (
                  ' '
                )}
                <Link to={`/decks/${item.id}/cards`}>{item.name}</Link>
              </div>
            </Table.Cell>
            <Table.Cell>{item.cardsCount}</Table.Cell>
            <Table.Cell>{new Date(item.updated).toLocaleString()}</Table.Cell>
            <Table.Cell>{item.author.name}</Table.Cell>
            <Table.Cell>
              <div className={s.learn}>
                <div className={s.options}>
                  {item.cardsCount > 0 && (
                    <Button as={Link} to={`/decks/${item.id}/learn`} variant="link">
                      <Play size={16} />
                    </Button>
                  )}
                </div>
                <div className={s.edit}>
                  {item.author.id === currentUserId && (
                    <>
                      <Edit onClick={handleEditClick(item.id)} />
                      <DeleteOutlined size={16} onClick={handleDeleteClick(item.id)} />
                    </>
                  )}
                </div>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default TableForDecksPage
