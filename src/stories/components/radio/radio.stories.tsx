import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '@/components/ui/radio'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: 'iPhone', value: 'iPhone' },
      { label: 'Samsung', value: 'Samsung' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    options: [
      { label: 'iPhone', value: 'iPhone' },
      { label: 'Samsung', value: 'Samsung' },
    ],
    disabled: true,
  },
}
