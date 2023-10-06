import { Tooltip } from '@radix-ui/react-tooltip'
import { Meta } from '@storybook/react'
import { JSX } from 'react/jsx-runtime'

import DeleteForever from '@/assets/icons/components/DeleteForever/DeleteForever'
import Edit from '@/assets/icons/components/edit/edit'
import { Dropdown, ToolbarItemWithIcon, ToolbarProps } from '@/components/ui/dropdown/dropdown'
import { useDarkMode } from '@/hooks/useDarkMode/usedarkmode'

export default {
  title: 'Components/Disclosure/Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>

export const Dark = {
  render: (args: JSX.IntrinsicAttributes & ToolbarProps) => {
    useDarkMode()

    return <Dropdown {...args} />
  },

  args: {
    children: (
      <>
        <ToolbarItemWithIcon icon={<Edit />} text="Изменить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
      </>
    ),
  },
}

export const Light = {
  render: (args: JSX.IntrinsicAttributes & ToolbarProps) => {
    return <Dropdown {...args} />
  },

  args: {
    children: (
      <>
        <ToolbarItemWithIcon icon={<Edit />} text="Изменить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
        <ToolbarItemWithIcon icon={<DeleteForever />} text="Удалить" onSelect={() => {}} />
      </>
    ),
  },
}

export const WithDisabledItem = {
  render: (args: JSX.IntrinsicAttributes & ToolbarProps) => {
    return <Dropdown {...args} />
  },

  args: {
    children: (
      <>
        <ToolbarItemWithIcon icon={<Edit />} text="Изменить" onSelect={() => {}} />
      </>
    ),
  },
}
