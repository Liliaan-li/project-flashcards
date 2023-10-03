import { useState } from 'react'

import type { Meta } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modal'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'learn'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Modal>

export default meta

export const Default = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <>
        <Modal isOpen={open} onChange={setOpen} title="Add New Pack">
          <TextField label="Name Pack" />
          <Checkbox checked={open} onChange={setOpen} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '30px',
              gap: '10px',
            }}
          >
            <Button variant="secondary">Cancel</Button>
            <Button>Add New Pack</Button>
          </div>
        </Modal>
      </>
    )
  },
}

export const Learn = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <>
        <Modal isOpen={open} onChange={setOpen} title="Add New Pack" variant="learn">
          <div style={{ display: 'flex', marginTop: '45px' }}>
            <Typography.Subtitle1>Question</Typography.Subtitle1>
            <Typography.Body1>: How This works in JavaScript?</Typography.Body1>
          </div>
          <div style={{ display: 'flex', color: '#808080' }}>
            <Typography.Body2>Количество попыток ответов на вопрос: </Typography.Body2>
            <Typography.Subtitle2>10</Typography.Subtitle2>
          </div>
          <div style={{ marginTop: '41px' }}>
            <Button>Show Answer</Button>
          </div>
        </Modal>
      </>
    )
  },
}
