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
  subject: Subject
  navigation: any
}

const Item: React.FC<ItemProps> = ({ subject, navigation }) => {
  return (
    <View key={subject.id} style={styles.listItem}>
      <TouchableOpacity
        style={styles.listItemContent}
        onPress={() =>
          navigation.navigate('SubjectQuestions', { id: subject.id })
        }
      >
        <Text size="lg" color="gray-900">
          {subject?.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('SubjectEdit', { id: subject.id })}
      >
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default function List({ navigation, route }) {
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [subjects, setSubjects] = React.useState<Subject[]>([])

  React.useEffect(() => {
    const fetchSubjects = async () => {
      const res = await api('/subjects', {}, authToken)

      if (res.status === 200) {
        const newSubjects = await res.json()
        setSubjects(newSubjects)
      }

      setLoading(false)
    }

    fetchSubjects()
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
        <Text>Fetching subjects...</Text>
      ) : (
        <>
          <View style={styles.details}>
            <Text color="blue">SELECT QUIZ SUBJECT:</Text>
          </View>
          <SafeAreaView style={styles.listContainer}>
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <Item subject={item} navigation={navigation} />
              )}
              keyExtractor={subject => subject.id.toString()}
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
  bottomBar: {
    height: '20%',
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
})
