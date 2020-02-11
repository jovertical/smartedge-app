import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { AuthContext } from '@contexts/AuthContext'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { colors } from '@constants/theme'

export default function Home() {
  const { logout, user } = React.useContext(AuthContext)

  return (
    <Master verticalAlign="center" horizontalAlign="right" contentPadding={0}>
      <Text onPress={logout}>Logout</Text>
      <View style={styles.linkSmall}>
        <Text color="white" style={{ fontSize: 20 }}>
          ANNOUNCEMENTS
        </Text>
      </View>
      <View style={styles.linkMedium}>
        <Text color="white" style={{ fontSize: 30 }}>
          UPLOADS
        </Text>
      </View>
      <View style={styles.linkLarge}>
        <Text color="white" align="center" style={{ fontSize: 40 }}>
          PROBLEM OF THE DAY!
        </Text>
      </View>
      <View style={styles.linkMedium}>
        <Text color="white" style={{ fontSize: 30 }}>
          TAKE A QUIZ!
        </Text>
      </View>
      <View style={styles.linkSmall}>
        <Text color="white" style={{ fontSize: 20 }}>
          ACCOUNT INFO
        </Text>
      </View>
    </Master>
  )
}

const styles = StyleSheet.create({
  linkSmall: {
    backgroundColor: colors.greenDarker,
    width: '70%',
    height: '12%',
    padding: 10,
    justifyContent: 'center'
  },
  linkMedium: {
    backgroundColor: colors.green,
    width: '80%',
    height: '16%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  linkLarge: {
    backgroundColor: colors.greenLightest,
    width: '90%',
    height: '24%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
