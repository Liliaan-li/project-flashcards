import { Header } from '@/components/ui/header/header.tsx'

export function App() {
  return (
    <Header
      isAuth={true}
      userInfo={{
        name: 'Buba',
        avatar:
          'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        email: 'ioji@gmaikjjjjjjjjjjjjjjjjjjl.com',
      }}
    />
  )
}
