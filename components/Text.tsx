import * as React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'
import { colors, ColorTypes } from '@constants/theme'

interface Props extends TextProps {
  color?: ColorTypes
  weight?: 'extrabold' | 'extralight'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'left' | 'center' | 'right'
  children?: React.ReactNode
  style?: StyleSheet.NamedStyles<{}>
}

export default function({
  color = 'greenDarker',
  weight = 'extrabold',
  size = 'md',
  align = 'left',
  style,
  ...props
}: Props): React.ReactElement {
  return (
    <Text
      style={{
        color: colors[color],
        fontFamily: `mont-${weight}`,
        fontSize:
          size === 'sm' ? 12 : size === 'lg' ? 18 : size === 'xl' ? 26 : 14,
        textAlign: align,
        ...style
      }}
      {...props}
    >
      {props.children}
    </Text>
  )
}
