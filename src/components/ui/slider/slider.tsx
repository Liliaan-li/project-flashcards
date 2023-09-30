import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

export const Slider = forwardRef<
  ElementRef<typeof SliderRadix.Root>,
  ComponentPropsWithoutRef<typeof SliderRadix.Root>
>(({ className, ...props }, ref) => (
  <div className={s.container}>
    <span>{props?.value?.[0]}</span>
    <SliderRadix.Root
      ref={ref}
      className={clsx(s.root, className)}
      defaultValue={[25, 75]}
      {...props}
    >
      <SliderRadix.Track className={s.track}>
        <SliderRadix.Range className={s.range} />
      </SliderRadix.Track>
      <SliderRadix.Thumb className={s.thumb} />
      <SliderRadix.Thumb className={s.thumb} />
    </SliderRadix.Root>
    <span>{props?.value?.[1]}</span>
  </div>
))
