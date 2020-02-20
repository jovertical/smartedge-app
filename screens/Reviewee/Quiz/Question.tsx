import * as React from 'react'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import useDisableBack from '@hooks/useDisableBack'

export default function Question() {
  useDisableBack()

  return (
    <Master>
      <Text>Question # 1</Text>
    </Master>
  )
}
