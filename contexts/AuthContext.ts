import * as React from 'react'

export type LoginProps = {
  authToken: string
}

type Props = {
  login?(props: LoginProps): void
  logout?(): void
}

export const AuthContext = React.createContext<Props>({})
