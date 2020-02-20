import * as React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  AsyncStorage
} from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'
import Button from '@components/Button'
import useDisableBack from '@hooks/useDisableBack'

interface ItemProps {
  subjectId: Number
  subject: Subject
  handleItemPress: Function
}

const Item: React.FC<ItemProps> = ({ subjectId, subject, handleItemPress }) => {
  return (
    <TouchableOpacity
      key={subject.id}
      style={{
        ...styles.listItem,
        backgroundColor:
          subject.id === subjectId
            ? 'rgba(52, 52, 52, 0.7)'
            : 'rgba(52, 52, 52, 0.4)'
      }}
      onPress={() => handleItemPress(subject.id)}
    >
      <Text size="lg" color="gray-900">
        {subject?.name}
      </Text>
    </TouchableOpacity>
  )
}

export default function Subject({ navigation }) {
  useDisableBack()
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [subjects, setSubjects] = React.useState<Subject[]>([])
  const [subjectId, setSubjectId] = React.useState<Number>(0)

  const handleNext = async () => {
    if (subjectId === 0) {
      alert('Please select a Subject!')
    } else {
      await AsyncStorage.setItem('QUIZ_SUBJECT', subjectId.toString())
      navigation.navigate('TimeMode')
    }
  }

  React.useEffect(() => {
    const fetchSubjects = async () => {
      const res = await api('/subjects', {}, authToken)

      if (res.status === 200) {
        setSubjects(await res.json())
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
        <>
          <View style={styles.details}>
            <Text color="blue">SELECT QUIZ SUBJECT:</Text>
          </View>
          <SafeAreaView
            style={{
              ...styles.listContainer,
              maxHeight: `${subjects.length * 20}%`
            }}
          >
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <Item
                  subjectId={subjectId}
                  subject={item}
                  handleItemPress={setSubjectId}
                />
              )}
              keyExtractor={subject => subject.id.toString()}
            />
          </SafeAreaView>
          <Button
            size="lg"
            title="Next"
            onPress={handleNext}
            style={{ ...styles.nextButton, bottom: subjects.length * 40 }}
          />
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
    alignItems: 'center'
  },
  listItem: {
    width: '100%',
    height: 70,
    marginBottom: 5,
    padding: 10,
    justifyContent: 'center'
  },
  nextButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 120
  }
})
