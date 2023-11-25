import {
  CreateNewPasswordPasswordArgs,
  LoginArgs,
  RecoverPasswordArgs,
  SignUpArgs,
  User,
} from '@/services/auth/auth.types.ts'
import { baseApi } from '@/services/base-api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<User | null, void>({
      query: () => '/v1/auth/me',
      providesTags: ['Me'],
    }),
    login: builder.mutation<{ accessToken: string }, LoginArgs>({
      query: body => ({
        url: '/v1/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/v1/auth/logout',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(
            authService.util.updateQueryData('me', undefined, () => {
              return null
            })
          )
        } catch (e) {
          console.error(e)
        }
      },
      invalidatesTags: ['Me'],
    }),
    signUp: builder.mutation<void, SignUpArgs>({
      query: body => ({
        url: '/v1/auth/sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
      query: body => ({
        url: '/v1/auth/recover-password',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    createNewPassword: builder.mutation<void, CreateNewPasswordPasswordArgs>({
      query: ({ token, password }) => ({
        url: `/v1/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
      invalidatesTags: ['Me'],
    }),
    changeUserName: builder.mutation<User, string>({
      query: name => ({
        url: '/v1/auth/me',
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Me'],
    }),
    changeUserAvatar: builder.mutation<User, string>({
      query: avatar => ({
        url: '/v1/auth/me',
        method: 'PATCH',
        body: { avatar },
      }),
      invalidatesTags: ['Me'],
    }),
  }),
})

export const {
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useCreateNewPasswordMutation,
  useSignUpMutation,
  useChangeUserNameMutation,
} = authService
