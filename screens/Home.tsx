import * as React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { AuthContext } from '@contexts/AuthContext'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { colors } from '@constants/theme'
import accountIcon from '@assets/png/icons/account.png'
import announcementIcon from '@assets/png/icons/announcement.png'
import uploadIcon from '@assets/png/icons/upload.png'
import quizIcon from '@assets/png/icons/quiz.png'

export default function Home({ navigation }) {
  const { user } = React.useContext(AuthContext)

  return (
    <Master verticalAlign="center" horizontalAlign="right" contentPadding={0}>
      <View style={styles.linkSmall}>
        <Text
          color="white"
          style={styles.linkSmallText}
          onPress={() => navigation.navigate('Announcement')}
        >
          ANNOUNCEMENTS
        </Text>
        <Image source={announcementIcon} style={styles.smallIcon} />
      </View>
      <View style={styles.linkMedium}>
        <Image source={uploadIcon} style={styles.mediumIcon} />
        <Text color="white" style={styles.linkMediumText}>
          UPLOADS
        </Text>
      </View>
      <View style={styles.linkLarge}>
        <Text color="white" align="center" style={styles.linkLargeText}>
          PROBLEM OF THE DAY!
        </Text>
      </View>
      <View style={styles.linkMedium}>
        <Image source={quizIcon} style={styles.mediumIcon} />
        <Text
          color="white"
          style={styles.linkMediumText}
          onPress={() => {
            if (user?.type === 'admin') {
              navigation.navigate('SubjectList')
            } else {
              if (user?.quizzes.filter(q => !q.completed_at).length > 0) {
                navigation.navigate('Question')
              } else {
                navigation.navigate('SubjectList')
              }
            }
          }}
        >
          TAKE A QUIZ!
        </Text>
      </View>
      <View style={styles.linkSmall}>
        <Text
          color="white"
          style={styles.linkSmallText}
          onPress={() => navigation.navigate('Account')}
        >
          ACCOUNT INFO
        </Text>
        <Image source={accountIcon} style={styles.smallIcon} />
      </View>
    </Master>
  )
}

const styles = StyleSheet.create({
  linkSmall: {
    backgroundColor: colors.greenDarker,
    width: '70%',
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkSmallText: {
    fontSize: 20
  },
  linkMedium: {
    backgroundColor: colors.green,
    width: '80%',
    height: '16%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkMediumText: {
    fontSize: 30
  },
  linkLarge: {
    backgroundColor: colors.greenLightest,
    width: '90%',
    height: '24%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkLargeText: {
    fontSize: 40
  },
  smallIcon: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  mediumIcon: {
    width: 60,
    height: 60,
    marginRight: 10
  }
})
