import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './deck-dropdown.module.scss'

import { DeleteOutlined } from '@/assets/icons/components/DeleteForever/DeleteOutlined.tsx'
import Edit from '@/assets/icons/components/edit/edit.tsx'
import More from '@/assets/icons/components/More/More.tsx'
import { Play } from '@/assets/icons/components/play/Play.tsx'
import { Button } from '@/components/ui/button'
import { Dropdown, ToolbarItemWithIcon } from '@/components/ui/dropdown/dropdown.tsx'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks'

type DeckDropdownProps = {
  data: Deck
  isOwner: boolean
  openCreateModal: () => void
  setDeckDeleteId: (value: string) => void
  setDeckEditId: (value: string) => void
}

export const DeckDropdown: FC<DeckDropdownProps> = ({
  data,
  isOwner,
  openCreateModal,
  setDeckDeleteId,
  setDeckEditId,
}) => {
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      <Typography.LARGE>{data.name}</Typography.LARGE>
      {isOwner && (
        <div className={s.header}>
          <div className={s.drop}>
            <Dropdown
              trigger={
                <div className={s.more}>
                  <More size={25} />
                </div>
              }
            >
              <div>
                <ToolbarItemWithIcon
                  icon={<Play color={'var(--color-light-100)'} />}
                  text="Learn"
                  onSelect={() => navigate(`/decks/${data.id}/learn`)}
                />
                <ToolbarItemWithIcon
                  icon={<Edit color={'var(--color-light-100)'} />}
                  text="Edit"
                  onSelect={() => setDeckEditId(data.id)}
                />
                <ToolbarItemWithIcon
                  icon={<DeleteOutlined color={'var(--color-light-100)'} />}
                  text="Delete"
                  onSelect={() => setDeckDeleteId(data.id)}
                />
              </div>
            </Dropdown>
          </div>
          <div>
            <Button onClick={openCreateModal}>
              <Typography.Subtitle2>Add New Card</Typography.Subtitle2>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
