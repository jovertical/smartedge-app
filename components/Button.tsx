import * as React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import Text from '@components/Text'
import { colors, ColorTypes } from '@constants/theme'

interface Props extends TouchableOpacityProps {
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: ColorTypes
  children?: React.ReactNode
  style?: StyleSheet.NamedStyles<{}>
}

export default function({
  title,
  size = 'md',
  color = 'greenDarker',
  style,
  ...props
}: Props): React.ReactElement {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors[color],
        borderRadius: 50,
        height:
          size === 'sm'
            ? 30
            : size === 'md'
            ? 40
            : size === 'lg'
            ? 50
            : size === 'xl'
            ? 60
            : 40,
        padding:
          size === 'sm'
            ? 4
            : size === 'md'
            ? 8
            : size === 'lg'
            ? 16
            : size === 'xl'
            ? 32
            : 8,
        ...style
      }}
      {...props}
    >
      <Text color="white">{title}</Text>
    </TouchableOpacity>
  )
}
