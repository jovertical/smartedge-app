import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import Button from '@components/Button'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'
import useDisableBack from '@hooks/useDisableBack'

export default function QuestionCount({ navigation }) {
  useDisableBack()
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [questionCounters, setQuestionCounters] = React.useState<Number[]>([])
  const [questionCount, setQuestionCount] = React.useState(-1)

  const handleNext = async () => {
    if (questionCount === -1) {
      alert('Please select how many questions!')
    } else {
      await AsyncStorage.setItem(
        'QUIZ_QUESTION_COUNT',
        questionCounters[questionCount].toString()
      )
      navigation.navigate('CheckingMode')
    }
  }

  React.useEffect(() => {
    const bootstrap = async () => {
      const subjectId = await AsyncStorage.getItem('QUIZ_SUBJECT')
      const res = await api(`/subjects/${subjectId}/questions`, {}, authToken)

      if (res.status === 200) {
        const questions = await res.json()

        if (questions.length >= 100) {
          setQuestionCounters([20, 50, 100])
        } else if (questions.length >= 50) {
          setQuestionCounters([20, 50])
        } else if (questions.length >= 20) {
          setQuestionCounters([20])
        } else {
          setQuestionCounters([questions.length])
        }

        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      <View style={styles.details}>
        <Text color="blue">SELECT NO. OF QUESTIONS:</Text>
      </View>
      {loading ? (
        <Text>Generating selection...</Text>
      ) : (
        <View style={styles.listContainer}>
          {questionCounters.map((count, i) => (
            <TouchableOpacity
              key={i}
              style={{
                ...styles.listItem,
                backgroundColor:
                  questionCount === i
                    ? 'rgba(52, 52, 52, 0.7)'
                    : 'rgba(52, 52, 52, 0.4)'
              }}
              onPress={() => setQuestionCount(i)}
            >
              <Text size="lg" color="gray-900">
                {count}
              </Text>
            </TouchableOpacity>
          ))}
          <Button
            size="lg"
            title="Next"
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      )}
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
    alignItems: 'center',
    width: '100%'
  },
  listItem: {
    width: '100%',
    marginBottom: 5,
    padding: 10
  },
  nextButton: {
    marginTop: 20,
    width: 120
  }
})
