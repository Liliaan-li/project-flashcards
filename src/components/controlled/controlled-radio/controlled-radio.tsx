import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Radio, RadioProps } from '@/components/ui/radio'

type ControlledRadioGroupProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioProps, 'value | onValueChange'>

export const ControlledRadio = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: ControlledRadioGroupProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  return <Radio {...restProps} onValueChange={onChange} value={value} name={name} />
}
