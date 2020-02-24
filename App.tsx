import * as React from 'react'
import { AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font'
import pick from 'lodash/pick'
import RobotoMedium from '@assets/fonts/Roboto-Medium.ttf'
import RobotoBold from '@assets/fonts/Roboto-Bold.ttf'

import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'
import LoginScreen from '@screens/Auth/Login'
import LoadingScreen from '@screens/Loading'
import HomeScreen from '@screens/Home'
import AdminAccountsScreen from '@screens/Admin/Accounts'
import AdminSubjectListScreen from '@screens/Admin/Subjects/List'
import AdminSubjectCreateScreen from '@screens/Admin/Subjects/Create'
import AdminSubjectEditScreen from '@screens/Admin/Subjects/Edit'
import AdminSubjectQuestionsScreen from '@screens/Admin/Subjects/Questions'
import AdminQuestionCreateScreen from '@screens/Admin/Questions/Create'
import AdminQuestionEditScreen from '@screens/Admin/Questions/Edit'
import AdminQuestionAnswersScreen from '@screens/Admin/Questions/Answers'
import AdminAnswerCreateScreen from '@screens/Admin/Answers/Create'
import AdminAnswerEditScreen from '@screens/Admin/Answers/Edit'
import AdminAnnouncementScreen from '@screens/Admin/Announcements/List'
import AdminAnnouncementCreateScreen from '@screens/Admin/Announcements/Create'
import AdminAnnouncementEditScreen from '@screens/Admin/Announcements/Edit'

import RevieweeQuizSubjectScreen from '@screens/Reviewee/Quiz/Subject'
import RevieweeQuizTimeModeScreen from '@screens/Reviewee/Quiz/TimeMode'
import RevieweeQuizQuestionCountScreen from '@screens/Reviewee/Quiz/QuestionCount'
import RevieweeQuizCheckingModeScreen from '@screens/Reviewee/Quiz/CheckingMode'
import RevieweeQuizQuestionScreen from '@screens/Reviewee/Quiz/Question'
import RevieweeQuizTallyScreen from '@screens/Reviewee/Quiz/Tally'
import RevieweeAnnouncementScreen from '@screens/Reviewee/Announcements'
import RevieweeAccountScreen from '@screens/Reviewee/Account'

type State = {
  fontLoaded: boolean
  loading: boolean
  loggedOut: boolean
  authToken?: string
  user?: User
}

type Action =
  | { type: 'SET_FONT_LOADED' }
  | { type: 'FETCH_USER_SUCCESS'; authToken: string; user: User }
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
            authToken: action.authToken,
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
      ...pick(state, ['authToken', 'loggedOut', 'user']),
      login: async (authToken: string) => {
        await AsyncStorage.setItem('authToken', authToken)
        dispatch({ type: 'LOGIN', authToken })
      },
      logout: async () => {
        await api('/auth/logout', { method: 'POST' }, state.authToken)
        await AsyncStorage.removeItem('authToken')
        dispatch({ type: 'LOGOUT' })
      }
    }),
    [state.user]
  )

  React.useEffect(() => {
    const fetchUser = async (authToken: string) => {
      try {
        const res = await api('/auth/user', {}, authToken)

        if (res.status === 200) {
          const user = await res.json()
          dispatch({ type: 'FETCH_USER_SUCCESS', authToken, user })
        } else {
          dispatch({ type: 'FETCH_USER_FAILED' })
          dispatch({ type: 'LOGOUT' })
        }
      } catch (error) {
        dispatch({ type: 'LOGOUT' })
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
        'roboto-medium': RobotoMedium,
        'roboto-bold': RobotoBold
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
              {state.user?.type === 'admin' ? (
                <>
                  <Stack.Screen
                    name="SubjectList"
                    component={AdminSubjectListScreen}
                  />
                  <Stack.Screen
                    name="SubjectCreate"
                    component={AdminSubjectCreateScreen}
                  />
                  <Stack.Screen
                    name="SubjectEdit"
                    component={AdminSubjectEditScreen}
                  />
                  <Stack.Screen
                    name="SubjectQuestions"
                    component={AdminSubjectQuestionsScreen}
                  />
                  <Stack.Screen
                    name="QuestionCreate"
                    component={AdminQuestionCreateScreen}
                  />
                  <Stack.Screen
                    name="QuestionEdit"
                    component={AdminQuestionEditScreen}
                  />
                  <Stack.Screen
                    name="QuestionAnswers"
                    component={AdminQuestionAnswersScreen}
                  />
                  <Stack.Screen
                    name="AnswerCreate"
                    component={AdminAnswerCreateScreen}
                  />
                  <Stack.Screen
                    name="AnswerEdit"
                    component={AdminAnswerEditScreen}
                  />
                  <Stack.Screen
                    name="Announcement"
                    component={AdminAnnouncementScreen}
                  />
                  <Stack.Screen
                    name="AnnouncementCreate"
                    component={AdminAnnouncementCreateScreen}
                  />
                  <Stack.Screen
                    name="AnnouncementEdit"
                    component={AdminAnnouncementEditScreen}
                  />
                  <Stack.Screen
                    name="Account"
                    component={AdminAccountsScreen}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="SubjectList"
                    component={RevieweeQuizSubjectScreen}
                  />
                  <Stack.Screen
                    name="TimeMode"
                    component={RevieweeQuizTimeModeScreen}
                  />
                  <Stack.Screen
                    name="QuestionCount"
                    component={RevieweeQuizQuestionCountScreen}
                  />
                  <Stack.Screen
                    name="CheckingMode"
                    component={RevieweeQuizCheckingModeScreen}
                  />
                  <Stack.Screen
                    name="Question"
                    component={RevieweeQuizQuestionScreen}
                  />
                  <Stack.Screen
                    name="Tally"
                    component={RevieweeQuizTallyScreen}
                  />
                  <Stack.Screen
                    name="Announcement"
                    component={RevieweeAnnouncementScreen}
                  />
                  <Stack.Screen
                    name="Account"
                    component={RevieweeAccountScreen}
                  />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}
