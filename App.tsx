import * as React from 'react'
import { AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font'
import montExtraBold from '@assets/fonts/mont-extrabold.otf'
import montExtraLight from '@assets/fonts/mont-extralight.otf'
import { AuthContext } from '@contexts/AuthContext'
import { API_URL } from '@constants/config'
import LoginScreen from '@screens/Auth/Login'
import LoadingScreen from '@screens/Loading'
import HomeScreen from '@screens/Home'
import ProfileScreen from '@screens/Profile'

type State = {
  fontLoaded: boolean
  loading: boolean
  loggedOut: boolean
  authToken?: string
  user?: User
}

type Action =
  | { type: 'SET_FONT_LOADED' }
  | { type: 'FETCH_USER_SUCCESS'; user: User }
  | { type: 'FETCH_USER_FAILED' }
  | { type: 'LOGIN'; authToken: string }
  | { type: 'LOGOUT' }

const Stack = createStackNavigator()

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: State, action: Action) => {
      switch (action.type) {
        case 'SET_FONT_LOADED':
          console.log('SET_FONT_LOADED')
          return {
            ...prevState,
            fontLoaded: true
          }
        case 'FETCH_USER_FAILED':
          console.log('FETCH_USER_FAILED')
          return {
            ...prevState,
            loading: false,
            user: null
          }
        case 'FETCH_USER_SUCCESS':
          console.log('FETCH_USER_SUCCESS')
          return {
            ...prevState,
            loading: false,
            user: action.user
          }
        case 'LOGIN':
          console.log('LOGIN')
          return {
            ...prevState,
            loggedOut: false,
            authToken: action.authToken
          }
        case 'LOGOUT':
          console.log('LOGOUT')
          return {
            ...prevState,
            loggedOut: true,
            authToken: null,
            user: null
          }
      }
    },
    {
      fontLoaded: false,
      loading: false,
      authToken: null,
      loggedOut: false,
      user: null
    }
  )

  const authContext = React.useMemo(
    () => ({
      loggedOut: state.loggedOut,
      user: state.user,
      login: async (authToken: string) => {
        AsyncStorage.setItem('authToken', authToken)
        dispatch({ type: 'LOGIN', authToken })
      },
      logout: () => {
        AsyncStorage.removeItem('authToken')
        dispatch({ type: 'LOGOUT' })
      }
    }),
    [state.user]
  )

  React.useEffect(() => {
    const fetchUser = async (authToken: string) => {
      const res = await fetch(API_URL + '/auth/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })

      if (res.status === 200) {
        const user = await res.json()
        dispatch({ type: 'FETCH_USER_SUCCESS', user })
      } else {
        dispatch({ type: 'FETCH_USER_FAILED' })
      }
    }

    const bootstrap = async () => {
      const authToken = await AsyncStorage.getItem('authToken')

      if (authToken === null) {
        dispatch({ type: 'LOGOUT' })
      } else {
        fetchUser(authToken)
      }
    }

    bootstrap()
  }, [state.loggedOut])

  React.useEffect(() => {
    const bootstrap = async () => {
      await Font.loadAsync({
        'mont-extrabold': montExtraBold,
        'mont-extralight': montExtraLight
      })

      dispatch({ type: 'SET_FONT_LOADED' })
    }

    bootstrap()
  }, [])

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.loading || !state.fontLoaded ? (
            <Stack.Screen name="Loading" component={LoadingScreen} />
          ) : state.loggedOut ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                animationTypeForReplace: state.loggedOut ? 'pop' : 'push'
              }}
            />
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
