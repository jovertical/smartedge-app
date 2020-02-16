import * as React from 'react'
import { StyleSheet } from 'react-native'
import omit from 'lodash/omit'
import quizIcon from '@assets/png/icons/quiz.png'
import Button from '@components/Button'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import Master from '@components/Layouts/Master'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

type Errors = {
  body?: string[]
  correct?: boolean
}

export default function Edit({ navigation, route }) {
  const answerId = route.params?.id
  const { authToken } = React.useContext(AuthContext)
  const [body, setBody] = React.useState('')
  const [correct, setCorrect] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})
  const [loading, setLoading] = React.useState(true)

  const handleSubmit = async () => {
    try {
      const res = await api(
        `/answers/${answerId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            body,
            correct
          })
        },
        authToken
      )

      switch (res.status) {
        case 422:
          const { errors = {} } = await res.json()
          setErrors(errors)
          break

        case 200:
          navigation.navigate('QuestionAnswers', {
            refresh: true
          })
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const fetchAnswer = async () => {
      const res = await api(`/answers/${answerId}`, {}, authToken)
      if (res.status === 200) {
        const data = await res.json()
        setBody(data?.body)
        setCorrect(data?.correct)
        setLoading(false)
      }
    }

    fetchAnswer()
  }, [])

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      {loading ? (
        <Text>Please wait...</Text>
      ) : (
        <>
          <TextInput
            label="Answer"
            value={body}
            onChangeText={text => {
              setBody(text)
              setErrors(omit(errors, ['body']))
            }}
            style={{ ...styles.inputContainer }}
            multiline={true}
            numberOfLines={4}
            error={errors.body}
          />

          <Button title="Update" style={styles.button} onPress={handleSubmit} />
        </>
      )}
    </Master>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10
  },
  button: {
    width: '100%'
  }
})
