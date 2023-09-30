import { useState, Fragment } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { TabContent, Tabs } from '@/components/ui/tab-switcher'

export function App() {
  const [bool, setBool] = useState<boolean>(false)

  function onChange(checked: boolean): void {
    setBool(checked)
  }

  return (
    <div>
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
