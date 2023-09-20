import * as React from 'react'

export type IconProps = {
  size?: number
  svgProps?: React.SVGProps<SVGSVGElement>
} & Omit<React.HTMLProps<HTMLSpanElement>, 'color' | 'size'>

export const IconWrapper: React.FC<{ icon: React.ReactNode } & IconProps> = ({
  icon,
  size: sizeProp,
  ...restProps
}) => {
  const size = sizeProp ? `${sizeProp}px` : '20px'

  return (
    <span
      role="img"
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        fontSize: 'inherit',
      }}
      {...restProps}
    >
      {icon}
    </span>
  )
}
