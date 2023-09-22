import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/components/ui/text-field/text-field.tsx'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField value={text} onChange={e => setText(e.currentTarget.value)} />
      </>
    )
  },
  args: {
    label: 'Input',
    placeholder: 'Input',
  },
}

export const Search: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField
          iconSearch
          onClearClick={() => {
            setText('')
          }}
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />
      </>
    )
  },
  args: {
    label: 'Input',
    placeholder: 'Input',
    iconSearch: true,
  },
}

export const Invalid: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField
          value={text}
          onChange={e => setText(e.currentTarget.value)}
          errorMessage={'Error'}
          placeholder={'Input'}
        />
      </>
    )
  },
  args: {
    label: 'Input',
  },
}
