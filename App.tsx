import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext, LoginProps } from './contexts/AuthContext'
import LoginScreen from './screens/Auth/Login'
import LoadingScreen from './screens/Loading'
import HomeScreen from './screens/Home'
import ProfileScreen from './screens/Profile'

type State = {
  loading: boolean
  loggedOut: boolean
  authToken: string
}

type Action =
  | { type: 'LOGIN'; authToken?: string }
  | { type: 'RESTORE_TOKEN'; authToken?: string }
  | { type: 'LOGOUT'; authToken?: string }

const Stack = createStackNavigator()

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: State, { authToken, ...action }: Action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            authToken,
            loading: false
          }
        case 'LOGIN':
          return {
            ...prevState,
            loggedOut: false,
            authToken
          }
        case 'LOGOUT':
          return {
            ...prevState,
            loggedOut: true,
            authToken: undefined
          }
      }
    },
    {
      loading: false,
      loggedOut: false,
      authToken: null
    }
  )

  const authContext = React.useMemo(
    () => ({
      login: async ({ authToken }: LoginProps) => {
        dispatch({ type: 'LOGIN', authToken })
      },
      logout: () => dispatch({ type: 'LOGOUT' })
    }),
    []
  )

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {state.loading ? (
            <Stack.Screen name="Loading" component={LoadingScreen} />
          ) : state.authToken === null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}
