import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Component />,
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
  const { data, isLoading, isError } = useGetDecksQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  console.log(data)

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

function Component() {
  const { data } = useGetDecksQuery()
  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()

  return (
    <>
      <Button
        onClick={() => {
          createDeck({ name: 'new deck1' })
        }}
        style={{ width: '180px' }}
      >
        Create Deck
      </Button>
      {isDeckBeingCreated && <div>Creating deck....</div>}
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{new Date(item.updated).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{item.author.name}</Table.Cell>
              <Table.Cell>icons...</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
