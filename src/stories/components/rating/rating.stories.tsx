import { Meta, StoryObj } from '@storybook/react'

import { Rating } from '@/components/ui/rating'

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    rating: Number,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    rating: 5,
    size: 25,
  },
}

export const Outline: Story = {
  args: {
    rating: 0,
    size: 25,
  },
}

export const Mixed: Story = {
  args: {
    rating: 3,
    maxRating: 8,
    size: 25,
  },
}
