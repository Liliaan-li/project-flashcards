import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { SignInPage } from '@/pages'
import { MainDecksPage } from '@/pages/decks-page/decks-page-with-header/decks-page-with-header.tsx'
import CheckEmailPage from '@/pages/forgot-pages/check-email-page/check-email-page.tsx'
import { CreateNewPasswordPage } from '@/pages/forgot-pages/create-new-password-page'
import { ForgotPasswordPage } from '@/pages/forgot-pages/forgot-password-page/forgot-password-page.tsx'
import { ProfilePage } from '@/pages/profile-page'
import { SignUpPage } from '@/pages/sign-up-page'
import { useMeQuery } from '@/services/auth/auth.service.ts'

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
        path: '/login',
      },
      {
        element: <ForgotPasswordPage />,
        path: '/password-recovery',
      },
      {
        element: <CreateNewPasswordPage />,
        path: '/create-new-password/:token',
      },
      {
        element: <CheckEmailPage />,
        path: '/check-email',
      },
      {
        element: <SignUpPage />,
        path: '/sign-up',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainDecksPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
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
  // const [logout] = useLogoutMutation()

  return (
    <>
      {/*<Button onClick={logout}>logout</Button>*/}
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
