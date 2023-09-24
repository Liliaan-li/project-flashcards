import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { LogoutIcon } from '@/icons/logout/logout-icon.tsx'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button {...args}>Primary button</Button>
      <Button {...args}>
        <LogoutIcon size={20} />
        Primary button
      </Button>
    </div>
  ),
}

export const Secondary: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button {...args} variant="secondary">
        Secondary button
      </Button>
      <Button {...args} variant="secondary">
        <LogoutIcon size={20} />
        Primary button
      </Button>
    </div>
  ),
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Tertiary Button',
    disabled: false,
  },
}

export const AsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
