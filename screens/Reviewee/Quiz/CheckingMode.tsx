import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import Button from '@components/Button'

export default function CheckingMode({ navigation }) {
  const [checkingMode, setTimeMode] = React.useState('')

  const handleStart = async () => {
    if (!checkingMode) {
      alert('Please select a Checking Mode!')
    } else {
      await AsyncStorage.setItem('QUIZ_CHECKING_MODE', checkingMode)
      alert('Lets go!')
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
    alignItems: 'center',
    width: '100%'
  },
  listItem: {
    width: '100%',
    marginBottom: 5,
    padding: 10
  },
  startButton: {
    marginTop: 20,
    width: 120
  }
})
