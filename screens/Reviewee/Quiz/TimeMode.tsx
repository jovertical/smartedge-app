import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import Button from '@components/Button'
import useDisableBack from '@hooks/useDisableBack'

export default function TimeMode({ navigation }) {
  useDisableBack()
  const [timeMode, setTimeMode] = React.useState('')

  const handleNext = async () => {
    if (!timeMode) {
      alert('Please select a Time Mode!')
    } else {
      await AsyncStorage.setItem('QUIZ_TIME_MODE', timeMode)
      navigation.navigate('QuestionCount')
    }
  }

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      <View style={styles.details}>
        <Text color="blue">SELECT TIME MODE:</Text>
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={{
            ...styles.listItem,
            backgroundColor:
              timeMode === 'classic'
                ? 'rgba(52, 52, 52, 0.7)'
                : 'rgba(52, 52, 52, 0.4)'
          }}
          onPress={() => setTimeMode('classic')}
        >
          <Text size="lg" color="gray-900">
            CLASSIC
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.listItem,
            backgroundColor:
              timeMode === 'timed'
                ? 'rgba(52, 52, 52, 0.7)'
                : 'rgba(52, 52, 52, 0.4)'
          }}
          onPress={() => setTimeMode('timed')}
        >
          <Text size="lg" color="gray-900">
            TIMED
          </Text>
        </TouchableOpacity>
        <Button
          size="lg"
          title="Next"
          onPress={handleNext}
          style={styles.nextButton}
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
  nextButton: {
    marginTop: 20,
    width: 120
  }
})
