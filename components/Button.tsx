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
  color?: ColorTypes
  children?: React.ReactNode
  style?: StyleSheet.NamedStyles<{}>
}

export default function({
  title,
  color = 'green',
  style,
  ...props
}: Props): React.ReactElement {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors[color],
        height: 40,
        ...style
      }}
      {...props}
    >
      <Text color="white">{title}</Text>
    </TouchableOpacity>
  )
}
