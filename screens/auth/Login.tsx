import * as React from 'react'
import { View, StyleSheet, Image, ImageBackground, Linking } from 'react-native'
import Constants from 'expo-constants'
import omit from 'lodash/omit'
import logoImage from '@assets/png/logo.png'
import overlayImage from '@assets/png/overlay.png'
import Button from '@components/Button'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { AuthContext } from '@contexts/AuthContext'
import { FB_PAGE } from '@constants/links'
import api from '@helpers/api'

type Errors = {
  email?: string[]
  password?: string[]
  device_name?: string[]
}

export default function Login() {
  const { login } = React.useContext(AuthContext)
  const [email, setEmail] = React.useState('josh.sisor@gmail.com')
  const [password, setPassword] = React.useState('smartedge')
  const [errors, setErrors] = React.useState<Errors>({})

  const handleLogin = async () => {
    try {
      const res = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          device_name: Constants.deviceId
        })
      })

      switch (res.status) {
        case 422:
          const { errors = {} } = await res.json()
          setErrors(errors)
          break

        case 200:
          const authToken = await res.text()
          login(authToken)
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={overlayImage} style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.form}>
            <Image source={logoImage} style={styles.logo} />
            <Text
              color="greenDarker"
              size="xl"
              align="center"
              style={styles.title}
            >
              Welcome to the Smart Edge App!
            </Text>
            <TextInput
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text)
                setErrors(omit(errors, ['email']))
              }}
              value={email}
              style={styles.input}
              label="Email"
              error={errors.email}
            />
            <TextInput
              textContentType="password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => {
                setPassword(text)
                setErrors(omit(errors, ['password']))
              }}
              value={password}
              style={styles.input}
              label="Password"
              error={errors.password}
            />
            <Button onPress={handleLogin} title="Login" style={styles.button} />
          </View>
          <View style={styles.links}>
            <Text color="greenDarker" style={styles.link}>
              Contact Us
            </Text>
            <Text color="greenDarker" style={styles.link}>
              FAQs
            </Text>
            <Text
              color="greenDarker"
              style={styles.link}
              onPress={() => Linking.openURL(FB_PAGE)}
            >
              Facebook Page
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  overlay: {
    width: '100%',
    height: '100%'
  },
  content: {
    flex: 1,
    marginVertical: 75
  },
  form: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: '75%',
    height: 150,
    marginBottom: 10
  },
  title: {
    width: '75%',
    marginBottom: 20
  },
  input: {
    width: '50%'
  },
  button: {
    width: '50%',
    marginTop: 5
  },
  links: {
    alignItems: 'center'
  },
  link: {}
})
