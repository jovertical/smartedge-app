import * as React from 'react'
import { StyleSheet } from 'react-native'
import omit from 'lodash/omit'
import quizIcon from '@assets/png/icons/quiz.png'
import Button from '@components/Button'
import TextInput from '@components/TextInput'
import Master from '@components/Layouts/Master'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

type Errors = {
  body?: string[]
}

export default function Create({ navigation, route }) {
  const subjectId = route.params?.id
  const { authToken } = React.useContext(AuthContext)
  const [body, setBody] = React.useState('')
  const [errors, setErrors] = React.useState<Errors>({})
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const res = await api(
        `/subjects/${subjectId}/questions`,
        {
          method: 'POST',
          body: JSON.stringify({
            body
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
          navigation.navigate('SubjectQuestions', {
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
        label="Question"
        value={body}
        onChangeText={text => {
          setBody(text)
          setErrors(omit(errors, ['body']))
        }}
        style={styles.inputContainer}
        multiline={true}
        numberOfLines={4}
        error={errors.body}
      />

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
  button: {
    width: '100%'
  }
})
