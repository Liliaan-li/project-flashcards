import { toast } from 'react-hot-toast'

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: 'var(--color-accent-300)',
      color: '#fff',
      padding: '16px',
    },
    iconTheme: {
      primary: 'var(--color-accent-300)',
      secondary: '#FFFAEE',
    },
  })
}
export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      background: 'var(--color-accent-300)',
      color: '#fff',
      padding: '16px',
    },
    iconTheme: {
      primary: 'var(--color-accent-300)',
      secondary: '#FFFAEE',
    },
  })
}
