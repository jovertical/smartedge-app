import * as React from 'react'
import {
  View,
  ViewProps,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import backImage from '@assets/png/back.png'
import logoImage from '@assets/png/logo.png'
import overlayImage from '@assets/png/overlay.png'
import Text from '@components/Text'
import { colors } from '@constants/theme'

interface Props extends ViewProps {
  navigation?: any
  title?: string
  titleIcon?: ImageSourcePropType
  titleIconPlacement?: 'right' | 'left'
  withBack?: boolean
  horizontalAlign?: 'left' | 'center' | 'right'
  verticalAlign?: 'top' | 'center' | 'bottom'
  contentPadding?: number
  children: any
}

export default function Master({
  navigation,
  title,
  titleIcon,
  titleIconPlacement = 'right',
  withBack = false,
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
            <View
              style={[
                styles.title,
                {
                  flexDirection:
                    titleIconPlacement === 'right' ? 'row' : 'row-reverse'
                }
              ]}
            >
              <Text color="white" style={styles.titleText}>
                {title}
              </Text>
              {titleIcon && (
                <Image source={titleIcon} style={styles.titleIcon} />
              )}
            </View>
          )}
        </View>
        <Text color="greenDarker" style={styles.description}>
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
        {withBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={backImage} style={styles.backImage} />
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 16,
    marginHorizontal: 5
  },
  titleIcon: {
    width: 35,
    height: 35
  },
  description: {
    marginBottom: 10,
    paddingHorizontal: 20
  },
  content: {
    flex: 1
  },
  backButton: {
    position: 'absolute',
    bottom: 25,
    right: 25
  },
  backImage: {
    width: 70,
    height: 70
  }
})
