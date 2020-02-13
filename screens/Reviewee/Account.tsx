import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import Button from '@components/Button'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import accountIcon from '@assets/png/icons/account.png'

export default function Account() {
  const { user, logout } = React.useContext(AuthContext)

  return (
    <Master title="ACCOUNT INFO" titleIcon={accountIcon}>
      <View style={styles.container}>
        <Text size="lg" color="blue">
          ACCOUNT INFORMATION
        </Text>
        <View style={styles.details}>
          <Text size="lg" color="gray-900">
            NAME: {user?.name.toUpperCase()}
          </Text>
          <Text size="lg" color="gray-900">
            REVIEWEE NO: {user?.reviewee_profile?.reviewee_number ?? '-'}
          </Text>
          <Text size="lg" color="gray-900">
            ENROLLED FOR: {user?.reviewee_profile?.enrolled_for ?? '-'}
          </Text>
          <Text size="lg" color="gray-900">
            ACCOUNT EXP: {user?.reviewee_profile?.expired_at ?? '-'}
          </Text>
        </View>
      </View>
      <View style={styles.action}>
        <Button
          title="LOGOUT"
          size="lg"
          style={styles.logoutButton}
          onPress={logout}
        />
      </View>
    </Master>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    width: '100%',
    marginBottom: 20,
    padding: 20
  },
  details: {
    marginLeft: 10
  },
  action: {
    width: '100%',
    alignItems: 'center'
  },
  logoutButton: {
    width: 120
  }
})
