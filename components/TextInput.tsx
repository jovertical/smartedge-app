import * as React from 'react'
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native'
import Text from '@components/Text'
import { colors, ColorTypes } from '@constants/theme'

interface Props extends TextInputProps {
  color?: ColorTypes
  label?: string
  error?: string[]
  style?: StyleSheet.NamedStyles<{}>
}

export default function({
  color = 'greenDarker',
  error,
  label,
  style,
  ...props
}: Props): React.ReactElement {
  return (
    <>
      {label && (
        <Text color="greenDarker" style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        style={{
          ...styles.input,
          borderColor: error ? colors.red : colors[color],
          marginBottom: error ? 3 : 5,
          ...style
        }}
        {...props}
      />
      {error && (
        <Text color="red" style={styles.error}>
          {error[0]}
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 2,
    backgroundColor: '#ffffff'
  },
  label: {
    marginBottom: 3
  },
  error: {
    marginBottom: 3
  }
})
