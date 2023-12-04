import { useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

export type ControlledCheckboxProps = {
  control: any
  name: string
} & Omit<CheckboxProps, 'checked' | 'onValueChange'>

export const ControlledCheckbox = ({ control, name, ...rest }: ControlledCheckboxProps) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  })

  return <Checkbox {...rest} checked={value} onChange={onChange} id={name} />
}
