import * as React from 'react'

type Props = {
  authToken?: string
  loggedOut: boolean
  user?: User
  login?(authToken: string): void
  logout?(): void
}

export const AuthContext = React.createContext<Props>({
  loggedOut: false
})
