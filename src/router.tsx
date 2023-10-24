import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { DecksPage } from '@/pages/decks-page/decks-page.tsx'
import { useGetDecksQuery } from '@/services/decks/decks.service.ts'

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
        path: '/login',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Header
          isAuth={true}
          userInfo={{
            name: 'Buba',
            avatar:
              'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
            email: 'ioji@gmaikjjjjjjjjjjjjjjjjjjl.com',
          }}
        />
        <DecksPage />
      </>
    ),
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  const [logout] = useLogoutMutation()

  return (
    <>
      <Button onClick={logout}>logout</Button>
      <RouterProvider router={router} />
    </>
  )
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError

  if (isLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

//просто чтоб было
// function Component() {
//   const { data } = useGetDecksQuery()
//   const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
//
//   return (
//     <>
//       <Button
//         onClick={() => {
//           createDeck({ name: 'new deck1' })
//         }}
//         style={{ width: '180px' }}
//       >
//         Create Deck
//       </Button>
//       {isDeckBeingCreated && <div>Creating deck....</div>}
//       <Table.Root>
//         <Table.Head>
//           <Table.Row>
//             <Table.HeadCell>Name</Table.HeadCell>
//             <Table.HeadCell>Cards</Table.HeadCell>
//             <Table.HeadCell>Last Updated</Table.HeadCell>
//             <Table.HeadCell>Created by</Table.HeadCell>
//             <Table.HeadCell></Table.HeadCell>
//           </Table.Row>
//         </Table.Head>
//         <Table.Body>
//           {data?.items.map(item => (
//             <Table.Row key={item.id}>
//               <Table.Cell>{item.name}</Table.Cell>
//               <Table.Cell>{item.cardsCount}</Table.Cell>
//               <Table.Cell>{new Date(item.updated).toLocaleDateString()}</Table.Cell>
//               <Table.Cell>{item.author.name}</Table.Cell>
//               <Table.Cell>icons...</Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>
//     </>
//   )
// }
