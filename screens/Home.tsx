import * as React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import { AuthContext } from '@contexts/AuthContext'
import { colors } from '@constants/theme'

export default function Home() {
  const { logout, user } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 5 }}>Hello {user?.name ?? 'Guest'}!</Text>
      <Button title="Logout" onPress={() => logout()} color={colors.green} />
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
