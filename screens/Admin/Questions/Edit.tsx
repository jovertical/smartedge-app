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
}

export default function Edit({ navigation, route }) {
  const questionId = route.params?.id
  const { authToken } = React.useContext(AuthContext)
  const [subjectId, setSubjectId] = React.useState(0)
  const [body, setBody] = React.useState('')
  const [errors, setErrors] = React.useState<Errors>({})
  const [loading, setLoading] = React.useState(true)

  const handleSubmit = async () => {
    try {
      const res = await api(
        `/questions/${questionId}`,
        {
          method: 'PATCH',
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
          break

        case 200:
          navigation.navigate('SubjectQuestions', {
            id: subjectId,
            refresh: true
          })
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const bootstrap = async () => {
      const res = await api(`/questions/${questionId}`, {}, authToken)
      if (res.status === 200) {
        const data = await res.json()
        setBody(data?.body)
        setSubjectId(data?.subject_id)
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  return (
    <Master
      navigation={navigation}
      withBack
      title="TAKE A QUIZ"
      titleIcon={quizIcon}
      titleIconPlacement="left"
    >
      {loading ? (
        <Text>Please wait...</Text>
      ) : (
        <>
          <TextInput
            label="Question"
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
