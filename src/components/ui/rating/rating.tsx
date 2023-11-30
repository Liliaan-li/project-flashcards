import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './rating.module.scss'

import { StarOutline } from '@/assets/icons/components/star/star-outline.tsx'
import { Star } from '@/assets/icons/components/star/star.tsx'

type RatingProps = {
  rating: number
  maxRating?: number
  size?: number
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const Rating = forwardRef<ElementRef<'div'>, RatingProps>(
  ({ rating, maxRating = 5, size = 1.6, className, ...restProps }, ref): JSX.Element => {
    const stars = [...Array(maxRating)].map((_, idx) => idx + 1)

    const ratingClasses = clsx(s.root, className)

    return (
      <div ref={ref} className={ratingClasses} {...restProps}>
        {stars.map((star, idx) => {
          return rating >= star ? (
            <Star key={idx} color="var(--color-warning-300)" size={size} />
          ) : (
            <StarOutline key={idx} color="var(--color-warning-300)" size={size} />
          )
        })}
      </div>
    )
  }
)
