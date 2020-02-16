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
import editIcon from '@assets/png/icons/edit.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

interface ItemProps {
  question: Question
  navigation: any
}

const Item: React.FC<ItemProps> = ({ question, navigation }) => {
  return (
    <View key={question.id} style={styles.listItem}>
      <TouchableOpacity
        style={styles.listItemContent}
        onPress={() => navigation.navigate('SubjectQuestions', question.id)}
      >
        <Text size="lg" color="gray-900">
          {question?.body}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton}>
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default function Questions({ navigation, route }) {
  const subject: Subject = route.params?.subject
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [questions, setQuestions] = React.useState<Question[]>([])

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const res = await api(`/subjects/${subject?.id}/questions`, {}, authToken)

      if (res.status === 200) {
        setQuestions(await res.json())
      }

      setLoading(false)
    }

    fetchQuestions()
  }, [])

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      {loading ? (
        <Text>Fetching questions...</Text>
      ) : (
        <>
          <View style={styles.subjectDetails}>
            <Text align="center" size="lg">
              {subject?.name.toUpperCase()}
            </Text>
          </View>
          <SafeAreaView style={styles.listContainer}>
            <FlatList
              data={questions}
              renderItem={({ item }) => (
                <Item question={item} navigation={navigation} />
              )}
              keyExtractor={question => question.id.toString()}
            />
          </SafeAreaView>
        </>
      )}
    </Master>
  )
}

const styles = StyleSheet.create({
  subjectDetails: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
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
