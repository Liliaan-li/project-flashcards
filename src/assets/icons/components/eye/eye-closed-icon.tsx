import { IconProps, IconWrapper } from '@/assets/icons/IconWrapper.tsx'

export const EyeClosed = (allProps: IconProps) => {
  const { svgProps: props, ...restProps } = allProps

  return (
    <IconWrapper
      icon={
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M4.71 3.29C4.61676 3.19676 4.50607 3.1228 4.38425 3.07234C4.26243 3.02188 4.13186 2.99591 4 2.99591C3.86814 2.99591 3.73757 3.02188 3.61575 3.07234C3.49393 3.1228 3.38324 3.19676 3.29 3.29C3.10169 3.47831 2.99591 3.7337 2.99591 4C2.99591 4.2663 3.10169 4.5217 3.29 4.71L8.92 10.34C8.5638 11.0026 8.43058 11.7624 8.54009 12.5067C8.64959 13.2509 8.99599 13.9401 9.52794 14.4721C10.0599 15.004 10.7491 15.3504 11.4934 15.4599C12.2376 15.5694 12.9974 15.4362 13.66 15.08L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29L4.71 3.29ZM12 13.5C11.6022 13.5 11.2206 13.342 10.9393 13.0607C10.658 12.7794 10.5 12.3978 10.5 12V11.93L12.06 13.49L12 13.5Z"
            fill="currentColor"
          />
          <path
            d="M12.22 17C7.92 17.1 5.1 13.41 4.22 12C4.84647 11.0007 5.59936 10.0865 6.46 9.27999L5 7.87C3.87133 8.93347 2.90441 10.1564 2.13 11.5C2.04223 11.652 1.99603 11.8245 1.99603 12C1.99603 12.1755 2.04223 12.348 2.13 12.5C2.76 13.59 6.13 19 12.02 19H12.27C13.3775 18.9671 14.4708 18.7404 15.5 18.33L13.92 16.75C13.3644 16.8962 12.7942 16.98 12.22 17Z"
            fill="currentColor"
          />
          <path
            d="M21.87 11.5C21.23 10.39 17.7 4.81999 11.73 4.99999C10.6225 5.03285 9.52924 5.25961 8.5 5.66999L10.08 7.24999C10.6356 7.10382 11.2058 7.01997 11.78 6.99999C16.07 6.88999 18.89 10.59 19.78 12C19.1381 13.0023 18.3682 13.9167 17.49 14.72L19 16.13C20.1428 15.0693 21.1234 13.8462 21.91 12.5C21.9918 12.3445 22.0311 12.1702 22.0241 11.9946C22.0171 11.8191 21.9639 11.6485 21.87 11.5Z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  )
}