import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

export const Slider = forwardRef<
  ElementRef<typeof SliderRadix.Root>,
  ComponentPropsWithoutRef<typeof SliderRadix.Root>
>(({ className, max = 0, value = [0, max], onValueChange, ...props }, ref) => {
  useEffect(() => {
    if (value[1] === undefined || value[1] === null) {
      onValueChange?.([value[0], max])
    }
  }, [max, value, onValueChange])

  return (
    <div className={s.container}>
      <span className={s.value}>{value?.[0]}</span>
      <SliderRadix.Root
        ref={ref}
        max={max}
        className={clsx(s.root, className)}
        onValueChange={onValueChange}
        defaultValue={[25, 75]}
        {...props}
        value={value}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.thumb} />
        <SliderRadix.Thumb className={s.thumb} />
      </SliderRadix.Root>
      <span className={s.value}>{value?.[1]}</span>
    </div>
  )
})
