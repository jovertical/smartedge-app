import * as React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Constants from 'expo-constants'
import { AuthContext } from '@contexts/AuthContext'
import { API_URL } from '@constants/config'

export default function Login() {
  const { login } = React.useContext(AuthContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState([])

  const handleLogin = async () => {
    const res = await fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        device_name: Constants.deviceId,
      })
    })

    switch (res.status) {
      case 422:
        const { errors = [] } = await res.json()
        setErrors(errors)
        break

      case 200:
        const authToken = await res.text()
        login({ authToken })
        break
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Email"
        textContentType="emailAddress"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        textContentType="password"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
