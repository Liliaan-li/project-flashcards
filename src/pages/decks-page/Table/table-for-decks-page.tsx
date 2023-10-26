import s from './table-for-decks-page.module.scss'

import { DeleteOutlined } from '@/assets/icons/components/DeleteForever/DeleteOutlined.tsx'
import Edit from '@/assets/icons/components/edit/edit.tsx'
import { Play } from '@/assets/icons/components/play/Play.tsx'
import { Table } from '@/components/ui/table'
import { DecksResponse } from '@/services/decks'

type TablePropsType = {
  decks: DecksResponse
}

const TableForDecksPage = ({ decks }: TablePropsType) => {
  return (
    <div>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell className={s.table_cell_name}>Name</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_cards}>Cards</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_lastUpdated}>Last Updated</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_creator}>Created by</Table.HeadCell>
          <Table.HeadCell className={s.table_cell_empty} />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {decks.items.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <div className={s.nameCell}>
                {item.cover !== null ? (
                  <img alt={item.name} src={item.cover} className={s.deckImage} />
                ) : (
                  ' '
                )}
                {item.name}
              </div>
            </Table.Cell>
            <Table.Cell>{item.cardsCount}</Table.Cell>
            <Table.Cell>{new Date(item.updated).toLocaleString()}</Table.Cell>
            <Table.Cell>{item.author.name}</Table.Cell>
            <Table.Cell>
              <div className={s.options}>
                <Play size={16} />
                <Edit />
                <DeleteOutlined size={16} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </div>
  )
}

export default TableForDecksPage
