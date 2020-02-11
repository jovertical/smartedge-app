import * as React from 'react'
import {
  View,
  ViewProps,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native'
import logoImage from '@assets/png/logo.png'
import overlayImage from '@assets/png/overlay.png'
import Text from '@components/Text'
import { colors } from '@constants/theme'

interface Props extends ViewProps {
  title?: string
  sectionType?: 'TAQ' | 'UPLOADS' | 'ACCOUNT' | 'ANNOUNCEMENTS'
  horizontalAlign?: 'left' | 'center' | 'right'
  verticalAlign?: 'top' | 'center' | 'bottom'
  contentPadding?: number
  children: any
}

export default function Master({
  title,
  horizontalAlign = 'left',
  verticalAlign = 'top',
  contentPadding = 10,
  children
}: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <ImageBackground source={overlayImage} style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Image source={logoImage} style={styles.logo} />
          </View>
          {title && (
            <View style={styles.title}>
              <Text color="white" size="xl">
                {title}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.description}>
          "Be the best prepared ECE examinee!"
        </Text>
        <View
          style={{
            alignItems:
              horizontalAlign === 'center'
                ? 'center'
                : horizontalAlign === 'right'
                ? 'flex-end'
                : 'flex-start',
            justifyContent:
              verticalAlign === 'center'
                ? 'center'
                : verticalAlign === 'bottom'
                ? 'flex-end'
                : 'flex-start',
            paddingHorizontal: contentPadding,
            ...styles.content
          }}
        >
          <>{children}</>
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
  header: {
    width: '100%',
    height: 100,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoWrapper: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '90%',
    height: '90%'
  },
  title: {
    width: '50%',
    height: '50%',
    paddingHorizontal: 10,
    backgroundColor: colors.greenDarker,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  description: {
    marginBottom: 10,
    paddingHorizontal: 20
  },
  content: {
    flex: 1
  }
})
