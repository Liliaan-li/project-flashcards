import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from './components/ui/controlled/conrolled-checkbox/controlled-checkbox'
import { Typography } from './components/ui/typography/typography'
import className from './components/ui/typography/typography.module.scss'

import { useState, Fragment } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { TabContent, Tabs } from '@/components/ui/tab-switcher'

export function App() {
  const { control } = useForm()

  return (
    <div>
      <Typography.Link2 className={className.link2}>Hi</Typography.Link2>
      <ControlledCheckbox
        control={control}
        name={'rememberMe'}
        onChange={function (checked: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      <Tabs
        tabs={[
          { value: 'sprints', title: 'Switch1' },
          { value: 'weeks', title: 'Switch2' },
          { value: 'subjects', title: 'Switch3', disabled: true },
        ]}
        defaultValue={'sprints'}
        label={'Show packs cards'}
      >
        <Fragment key=".0">
          <TabContent value="sprints">Switch1</TabContent>
          <TabContent value="weeks">Switch2</TabContent>
          <TabContent value="subjects">Switch3</TabContent>
        </Fragment>
      </Tabs>
      <Checkbox checked={bool} onChange={onChange} />
    </div>
  )
}
