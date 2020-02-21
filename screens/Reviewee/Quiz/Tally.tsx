import * as React from 'react'
import quizIcon from '@assets/png/icons/quiz.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import useDisableBack from '@hooks/useDisableBack'

export default function Tally({ navigation }) {
  useDisableBack()

  return (
    <Master title="TAKE A QUIZ" titleIcon={quizIcon} titleIconPlacement="left">
      <Text>
        Tally
      </Text>
    </Master>
  )
}