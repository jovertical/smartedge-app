import * as React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'

export default function Login() {
  const { login } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button title="Login" onPress={() => login({ authToken: 'foo-token' })} />
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
