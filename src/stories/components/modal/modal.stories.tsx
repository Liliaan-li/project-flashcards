import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modal'
import { TextField } from '@/components/ui/text-field'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const AddPack: Story = {
  render: args => {
    const [open, setOpen] = useState(true)

    return (
      <>
        <Modal {...args} title="Add New Pack" onOpenChange={setOpen} open={open}>
          <div style={{ padding: '20px' }}>
            <TextField value="" label="Name Pack" />
            <Checkbox onChange={() => {}} label="Private" />
            <div
              style={{
                display: 'flex',
                gap: '150px',
                justifyContent: 'space-between',
                padding: '20px 0 25px',
              }}
            >
              <Button variant="secondary">Cancel</Button>
              <Button>Add New Pack</Button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}

export const DeletePack: Story = {
  render: args => {
    const [open, setOpen] = useState(true)

    return (
      <>
        <Modal {...args} title="Delete Deck" onOpenChange={setOpen} open={open}>
          <div style={{ padding: '20px' }}>
            <p>
              Do you really want to remove <span>123</span>?
            </p>
            <p>All cards will be deleted.</p>
            <div
              style={{
                display: 'flex',
                gap: '150px',
                justifyContent: 'space-between',
                padding: '20px 0 25px',
              }}
            >
              <Button variant="secondary">Cancel</Button>
              <Button>Add New Pack</Button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}
