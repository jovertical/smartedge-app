import * as React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import Button from '@components/Button'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'
import useDisableBack from '@hooks/useDisableBack'

interface ItemProps {
  index: number
  selectedAnswer: number
  answer: Answer
  handleItemPress: Function
}

const Item: React.FC<ItemProps> = ({
  index,
  selectedAnswer,
  answer,
  handleItemPress
}) => {
  return (
    <TouchableOpacity
      key={answer.id}
      style={{
        ...styles.listItem,
        backgroundColor:
          answer.id === selectedAnswer
            ? 'rgba(52, 52, 52, 0.7)'
            : 'rgba(52, 52, 52, 0.4)'
      }}
      onPress={() => handleItemPress(answer.id)}
    >
      <Text size="lg" color="gray-900">
        {`${String.fromCharCode(97 + index).toUpperCase()}. ${answer?.body}`}
      </Text>
    </TouchableOpacity>
  )
}

export default function Question({ navigation }) {
  useDisableBack()
  const { authToken } = React.useContext(AuthContext)
  const [quiz, setQuiz] = React.useState<Quiz>()
  const [question, setQuestion] = React.useState<Question>()
  const [questionNumber, setQuestionNumber] = React.useState<number>(1)
  const [selectedAnswer, setSelectedAnswer] = React.useState<number>(-1)
  const [loading, setLoading] = React.useState<boolean>(false)

  const submitAnswer = async () => {
    setLoading(true)

    const res = await api(
      `/quizzes/${quiz.id}/answers`,
      {
        method: 'POST',
        body: JSON.stringify({
          answer_id: selectedAnswer
        })
      },
      authToken
    )

    if (res.status === 201) {
      const updatedQuiz = await fetchQuiz()
      setQuiz(updatedQuiz)
      setLoading(false)
    } else {
      throw new Error('Cannot submit your answer, try again later.')
    }
  }

  const fetchQuiz = async (): Promise<Quiz> => {
    const res = await api(`/quiz/active`, {}, authToken)

    if (res.status === 200) {
      const updatedQuiz = await res.json()
      return updatedQuiz
    } else if (res.status === 404) {
      // no active quiz for the user.
      navigation.navigate('Tally')
    }
  }

  React.useEffect(() => {
    const bootstrap = async () => {
      if (!quiz) {
        return
      }

      try {
        setLoading(true)

        const res = await api(`/quiz/${quiz?.id}/next-question`, {}, authToken)
        const newQuestion = await res.json()

        if (res.status === 200) {
          setQuestion(newQuestion)
          setQuestionNumber(newQuestion.question.number)
          setLoading(false)
        } else if (res.status === 404) {
          navigation.navigate('Tally')
        }
      } catch (error) {
        console.error(error)
      }
    }

    bootstrap()
  }, [quiz?.answers])

  React.useEffect(() => {
    const bootstrap = async () => {
      try {
        const updatedQuiz = await fetchQuiz()
        setQuiz(updatedQuiz)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    setLoading(true)
    bootstrap()
  }, [])

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      {loading ? (
        <Text>Fetching question...</Text>
      ) : (
          <>
            <View style={styles.details}>
              <Text color="blue">Q#: {questionNumber}</Text>
              <Text>{question?.body}</Text>
            </View>
            <SafeAreaView style={styles.listContainer}>
              <FlatList
                data={question?.answers}
                renderItem={({ item, ...props }) => (
                  <Item
                    selectedAnswer={selectedAnswer}
                    answer={item}
                    handleItemPress={setSelectedAnswer}
                    {...props}
                  />
                )}
                keyExtractor={(answer: Answer) => answer.id.toString()}
              />
              <Button
                size="lg"
                onPress={
                  selectedAnswer === -1
                    ? () => alert('Please select your answer!')
                    : submitAnswer
                }
                title={quiz?.checking_mode === 'per_item' ? 'CHECK' : 'NEXT'}
                style={styles.button}
              />
            </SafeAreaView>
          </>
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
    width: '100%'
  },
  listItem: {
    height: 50,
    marginBottom: 5,
    padding: 10,
    justifyContent: 'center'
  },
  button: {
    width: 120,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
