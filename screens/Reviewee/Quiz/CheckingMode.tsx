import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import Button from '@components/Button'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'
import useDisableBack from '@hooks/useDisableBack'

export default function CheckingMode({ navigation }) {
  useDisableBack()
  const { authToken } = React.useContext(AuthContext)
  const [checkingMode, setTimeMode] = React.useState('')

  const handleStart = async () => {
    if (!checkingMode) {
      alert('Please select a Checking Mode!')
    } else {
      try {
        const subjectId = await AsyncStorage.getItem('QUIZ_SUBJECT')
        const timeMode = await AsyncStorage.getItem('QUIZ_TIME_MODE')
        const questionCount = await AsyncStorage.getItem('QUIZ_QUESTION_COUNT')

        const res = await api(
          `/subjects/${subjectId}/quizzes`,
          {
            method: 'POST',
            body: JSON.stringify({
              time_mode: timeMode,
              question_count: questionCount,
              checking_mode: checkingMode
            })
          },
          authToken
        )

        const quiz = await res.json()

        await api(
          `/quizzes/${quiz.id}/questions`,
          {
            method: 'POST',
            body: JSON.stringify({
              question_count: questionCount
            })
          },
          authToken
        )

        if (res.status === 201) {
          navigation.navigate('Question')
        } else {
          navigation.navigate('Home')
          alert('You cannot proceed, please try again.')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      <View style={styles.details}>
        <Text color="blue">SELECT MODE OF CHECKING:</Text>
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={{
            ...styles.listItem,
            backgroundColor:
              checkingMode === 'per_item'
                ? 'rgba(52, 52, 52, 0.7)'
                : 'rgba(52, 52, 52, 0.4)'
          }}
          onPress={() => setTimeMode('per_item')}
        >
          <Text size="lg" color="gray-900">
            PER ITEM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.listItem,
            backgroundColor:
              checkingMode === 'per_quiz'
                ? 'rgba(52, 52, 52, 0.7)'
                : 'rgba(52, 52, 52, 0.4)'
          }}
          onPress={() => setTimeMode('per_quiz')}
        >
          <Text size="lg" color="gray-900">
            PER QUIZ
          </Text>
        </TouchableOpacity>
        <Button
          size="lg"
          title="Start"
          onPress={handleStart}
          style={styles.startButton}
        />
      </View>
    </Master>
  )
}

const styles = StyleSheet.create({
  details: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  listContainer: {
    width: '100%'
  },
  listItem: {
    marginBottom: 5,
    padding: 10
  },
  startButton: {
    width: 120,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
