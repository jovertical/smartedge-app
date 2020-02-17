import * as React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import editIcon from '@assets/png/icons/edit-black.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

interface ItemProps {
  index: number
  answer: Answer
  navigation: any
}

const Item: React.FC<ItemProps> = ({ index, answer, navigation }) => {
  return (
    <View key={answer.id} style={styles.listItem}>
      <TouchableOpacity style={styles.listItemContent}>
        <Text size="lg" color={answer.correct ? 'red' : 'gray-900'}>
          {`${String.fromCharCode(97 + index).toUpperCase()}. ${answer?.body}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('AnswerEdit', {
            id: answer.id
          })
        }
      >
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default function Answers({ navigation, route }) {
  const questionId = route.params?.id
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [question, setQuestion] = React.useState<Question>(null)
  const [answers, setAnswers] = React.useState<Answer[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const questionRes = await api(`/questions/${questionId}`, {}, authToken)

      if (questionRes.status === 200) {
        setQuestion(await questionRes.json())
      }

      const answersRes = await api(
        `/questions/${questionId}/answers`,
        {},
        authToken
      )

      if (answersRes.status === 200) {
        setAnswers(await answersRes.json())
      }

      setLoading(false)
    }

    fetchData()
  }, [route.params])

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      {loading ? (
        <Text>Fetching answers...</Text>
      ) : (
        <>
          <View style={styles.details}>
            <Text size="lg" color="blue">
              QUESTION:
            </Text>
            <Text size="lg">{question.body}</Text>
          </View>
          <SafeAreaView style={styles.listContainer}>
            <FlatList
              data={answers}
              renderItem={({ item, ...props }) => (
                <Item answer={item} navigation={navigation} {...props} />
              )}
              keyExtractor={answer => answer.id.toString()}
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
    maxHeight: '80%'
  },
  listItem: {
    width: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  listItemContent: {
    width: '90%'
  },
  editButton: {},
  editIcon: {
    width: 30,
    height: 30
  },
  bottomBar: {
    height: '20%',
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
})
