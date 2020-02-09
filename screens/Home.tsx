import * as React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import { AuthContext } from '@contexts/AuthContext'

export default function Home() {
  const { logout } = React.useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={() => logout()} />
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
