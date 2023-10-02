import { FC, ReactNode } from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tab-switcher.module.scss'

import typographyStyle from '@/components/ui/typography/typography.module.scss'
import { Typography } from '@/components/ui/typography/typography.tsx'

export type TabType = {
  /** A unique value that associates the trigger with a content. */
  value: string
  title: string
  disabled?: boolean
}

type TabsProps = {
  tabs: TabType[]
  /** The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs. */
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
  fullWidth?: boolean
  label?: string
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  value,
  defaultValue,
  children,
  fullWidth,
  onValueChange,
  label,
}) => {
  const classNames = {
    root: s.root,
    list: s.list,
    trigger: clsx(s.trigger, fullWidth && s.fullWidth),
    body1: clsx(typographyStyle.body1, s.title),
  }

  return (
    <TabsRadixUI.Root
      className={classNames.root}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {label && <Typography.Body1 className={classNames.body1}>{label}</Typography.Body1>}
      <TabsRadixUI.List className={classNames.list}>
        {tabs.map(tab => {
          return (
            <TabsRadixUI.Trigger
              className={classNames.trigger}
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
            >
              <Typography.Body1 className={classNames.body1}>{tab.title}</Typography.Body1>
            </TabsRadixUI.Trigger>
          )
        })}
      </TabsRadixUI.List>
      {children}
    </TabsRadixUI.Root>
  )
}

export type TabContentProps = {
  value: string
  children: ReactNode
}

export const TabContent: FC<TabContentProps> = ({ value, children }) => {
  return (
    <TabsRadixUI.Content className={s.content} value={value}>
      {children}
    </TabsRadixUI.Content>
  )
}
