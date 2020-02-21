import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import quizIcon from '@assets/png/icons/quiz.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import useDisableBack from '@hooks/useDisableBack'
import api from '@helpers/api'
import Button from '@components/Button'

type Results = {
  correct: number
  total: number
}
export default function Tally({ navigation, route }) {
  useDisableBack()
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [results, setResults] = React.useState<Results>()

  React.useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await api(`/quiz/${route.params?.id}/tally`, {}, authToken)

        if (res.status === 200) {
          setResults(await res.json())
          setLoading(false)
        } else {
          navigation.navigate('Home')
        }
      } catch (error) {
        navigation.navigate('Home')
      }
    }

    bootstrap()
  }, [])

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      {loading ? (
        <Text>Calculating your scores...</Text>
      ) : (
        <>
          <View style={styles.details}>
            <Text size="xl" color="blue">
              DONE!
            </Text>
            <Text color="gray-900">YOUR SCORE IS:</Text>
          </View>
          <View style={styles.details}>
            <Text size="xl" color="gray-900">
              {results.correct} / {results.total}
            </Text>
          </View>
          <Button
            size="lg"
            title="Finish"
            onPress={() => navigation.navigate('Home')}
            style={styles.button}
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
    padding: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignItems: 'center'
  },
  button: {
    width: 120,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
