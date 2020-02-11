import * as React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground
} from 'react-native'
import Constants from 'expo-constants'
import omit from 'lodash/omit'
import logoImage from '@assets/png/logo.png'
import overlayImage from '@assets/png/overlay.png'
import Button from '@components/Button'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import { API_URL } from '@constants/config'
import { colors } from '@constants/theme'

type Fields = {
  email?: string
  password?: string
  device_name?: string
}

export default function Login() {
  const { login } = React.useContext(AuthContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState<Fields>({})

  const handleLogin = async () => {
    const res = await fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
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
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={overlayImage} style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.form}>
            <Image source={logoImage} style={styles.logo} />
            <Text size="xl" align="center" style={styles.title}>
              Welcome to the Smart Edge App!
            </Text>
            <Text color="green" style={styles.inputLabel}>
              Email
            </Text>
            <TextInput
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text)
                setErrors(omit(errors, ['email']))
              }}
              value={email}
              style={[styles.input, errors.email ? styles.hasError : null]}
            />
            {errors.email && (
              <Text color="red" style={styles.inputError}>
                {errors.email[0]}
              </Text>
            )}
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              textContentType="password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => {
                setPassword(text)
                setErrors(omit(errors, ['password']))
              }}
              value={password}
              style={[styles.input, errors.password && styles.hasError]}
            />
            {errors.password && (
              <Text color="red" style={styles.inputError}>
                {errors.password[0]}
              </Text>
            )}
            <View style={styles.buttonWrapper}>
              <Button onPress={handleLogin} title="Login" />
            </View>
          </View>
          <View style={styles.links}>
            <Text style={styles.link}>Contact Us</Text>
            <Text style={styles.link}>FAQs</Text>
            <Text style={styles.link}>Facebook Page</Text>
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
    width: '50%',
    height: 40,
    marginBottom: 5,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 2,
    color: colors.green,
    backgroundColor: '#ffffff'
  },
  hasError: {
    borderColor: colors.red,
    marginBottom: 1
  },
  inputLabel: {
    marginBottom: 3
  },
  inputError: {
    marginBottom: 3
  },
  buttonWrapper: {
    width: '50%',
    marginTop: 5
  },
  links: {
    alignItems: 'center'
  },
  link: {}
})
