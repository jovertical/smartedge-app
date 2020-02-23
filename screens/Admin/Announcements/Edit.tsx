import * as React from 'react'
import { StyleSheet } from 'react-native'
import omit from 'lodash/omit'
import announcementIcon from '@assets/png/icons/announcement.png'
import Button from '@components/Button'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import Master from '@components/Layouts/Master'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

type Errors = {
  title?: string[]
  body?: string[]
}

export default function Edit({ navigation, route }) {
  const announcementId = route.params?.id
  const { authToken } = React.useContext(AuthContext)
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  const [errors, setErrors] = React.useState<Errors>({})
  const [loading, setLoading] = React.useState(true)

  const handleSubmit = async () => {
    try {
      const res = await api(
        `/announcements/${announcementId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            title,
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
          navigation.navigate('Announcement', {
            refresh: true
          })
          break

        default:
          throw new Error('Cannot update Announcement!')
      }
    } catch (error) {
      alert(error?.message)
    }
  }

  React.useEffect(() => {
    const bootstrap = async () => {
      const res = await api(`/announcements/${announcementId}`, {}, authToken)
      if (res.status === 200) {
        const data = await res.json()
        setTitle(data.title)
        setBody(data?.body)
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  return (
    <Master
      navigation={navigation}
      withBack
      title="ANNOUNCEMENTS"
      titleIcon={announcementIcon}
      titleIconPlacement="right"
    >
      {loading ? (
        <Text>Please wait...</Text>
      ) : (
        <>
          <TextInput
            label="Title"
            value={title}
            onChangeText={text => {
              setTitle(text)
              setErrors(omit(errors, ['title']))
            }}
            style={styles.inputContainer}
            error={errors.title}
          />

          <TextInput
            label="Body"
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
