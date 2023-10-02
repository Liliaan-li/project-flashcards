import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Select } from '@/components/ui/select'

const options = [
  {
    value: 'iPhone',
    label: 'iPhone',
  },
  {
    value: 'Samsung',
    label: 'Samsung',
  },
  {
    value: 'Huawei',
    label: 'Huawei',
  },
]

export default {
  title: 'Components/Select',
  component: Select,
} as Meta<typeof Select>

export const Primary = {
  render: (args: any) => {
    const [value, setValue] = useState(null)

    return (
      <>
        <Select {...args} value={value} onChange={setValue} />
      </>
    )
  },

  args: {
    disabled: false,
    options,
  },
}

export const PrimaryWithLabel = {
  render: (args: any) => {
    const [value, setValue] = useState(null)

    return (
      <>
        <Select {...args} value={value} onChange={setValue} />
      </>
    )
  },

  args: {
    disabled: false,
    options,
    label: 'Select',
  },
}

export const Error = {
  render: (args: any) => {
    const [value, setValue] = useState(null)

    return (
      <>
        <Select {...args} value={value} onChange={setValue} />
      </>
    )
  },

  args: {
    disabled: false,
    error: true,
    errorMessage: 'Ошибка',
    options,
  },
}
