import * as React from 'react'

export type LoginProps = {
  authToken: string
}

type Props = {
  loggedOut: boolean
  user?: User
  login?(props: LoginProps): void
  logout?(): void
}

export const AuthContext = React.createContext<Props>({
  loggedOut: false
})
