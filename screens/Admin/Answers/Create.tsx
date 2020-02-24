import * as React from 'react'
import { StyleSheet, CheckBox, View } from 'react-native'
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

export default function Create({ navigation, route }) {
  const questionId = route.params?.id
  const { authToken } = React.useContext(AuthContext)
  const [body, setBody] = React.useState('')
  const [correct, setCorrect] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await api(
        `/questions/${questionId}/answers`,
        {
          method: 'POST',
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
          setLoading(false)
          break

        case 201:
          navigation.navigate('QuestionAnswers', {
            refresh: true
          })
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Master
      navigation={navigation}
      withBack
      title="TAKE A QUIZ"
      titleIcon={quizIcon}
      titleIconPlacement="left"
    >
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

      <View style={styles.checkbox}>
        <CheckBox value={correct} onValueChange={() => setCorrect(!correct)} />
        <Text>Correct Answer</Text>
      </View>

      <Button
        title="Create"
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      />
    </Master>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10
  },
  checkbox: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: '100%'
  }
})
