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
  subject: Subject
}

const Item: React.FC<ItemProps> = ({ subject }) => {
  return (
    <View key={subject.id} style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text size="lg" color="gray-900">
          {subject?.name.toUpperCase()}
        </Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default function Subjects() {
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
  }, [])

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      {loading ? (
        <Text>Fetching subjects...</Text>
      ) : (
        <SafeAreaView style={styles.listContainer}>
          <FlatList
            data={subjects}
            renderItem={({ item }) => <Item subject={item} />}
            keyExtractor={subject => subject.id.toString()}
          />
        </SafeAreaView>
      )}
    </Master>
  )
}

const styles = StyleSheet.create({
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
