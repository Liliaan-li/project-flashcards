import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '@/components/ui/slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <>
        <Slider />
      </>
    )
  },
}
