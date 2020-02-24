import * as React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'
import truncate from 'lodash/truncate'
import quizIcon from '@assets/png/icons/quiz.png'
import editIcon from '@assets/png/icons/edit-black.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

interface ItemProps {
  index: number
  question: Question
  navigation: any
}

const Item: React.FC<ItemProps> = ({ index, question, navigation }) => {
  return (
    <View key={question.id} style={styles.listItem}>
      <TouchableOpacity
        style={styles.listItemContent}
        onPress={() =>
          navigation.navigate('QuestionAnswers', { id: question.id })
        }
      >
        <Text size="lg" color="gray-900">
          {`${index + 1}. ${truncate(question.body, { length: 50 })}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('QuestionEdit', { id: question.id })}
      >
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default function Questions({ navigation, route }) {
  const subjectId = route.params?.id
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [questions, setQuestions] = React.useState<Question[]>([])

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const res = await api(`/subjects/${subjectId}/questions`, {}, authToken)

      if (res.status === 200) {
        setQuestions(await res.json())
      }

      setLoading(false)
    }

    fetchQuestions()
  }, [route.params])

  return (
    <Master
      navigation={navigation}
      withBack
      title="TAKE A QUIZ"
      titleIcon={quizIcon}
      titleIconPlacement="left"
    >
      {loading ? (
        <Text>Fetching questions...</Text>
      ) : (
        <>
          <View style={styles.details}>
            <Text color="blue">LIST OF QUESTIONS:</Text>
          </View>
          <SafeAreaView
            style={{ ...styles.listContainer, height: 65 * questions.length }}
          >
            <FlatList
              data={questions}
              renderItem={({ item, index }) => (
                <Item index={index} question={item} navigation={navigation} />
              )}
              keyExtractor={question => question.id.toString()}
            />
          </SafeAreaView>
          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              navigation.navigate('QuestionCreate', {
                id: subjectId
              })
            }
          >
            <Text>+ ADD QUESTION</Text>
          </TouchableOpacity>
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
    maxHeight: '65%'
  },
  listItem: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  action: {
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  bottomBar: {
    height: '20%',
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
})
