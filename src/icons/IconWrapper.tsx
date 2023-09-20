import * as React from 'react'

export type IconProps = {
  /** Set width and height of icon in pixels */
  /** Props to pass directly to svg element  */
  svgProps?: React.SVGProps<SVGSVGElement>
} & Omit<React.HTMLProps<HTMLSpanElement>, 'color' | 'size'>

export const IconWrapper: React.FC<{ icon: React.ReactNode } & IconProps> = ({
  icon,
  ...restProps
}) => {
  return (
    <span
      role="img"
      style={{
        width: '20px',
        height: '20px',
        display: 'inline-flex',
        fontSize: 'inherit',
      }}
      {...restProps}
    >
      {icon}
    </span>
  )
}
