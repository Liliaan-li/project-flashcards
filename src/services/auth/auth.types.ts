export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type User = {
  avatar: string | null
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type SignUpArgs = {
  html: string
  name: string
  password: string
  email: string
  subject: string
  sendConfirmationEmail: boolean
}

export type RecoverPasswordArgs = {
  html: string
  email: string
  subject: string
}
export type CreateNewPasswordPasswordArgs = { token: string; password: string }
