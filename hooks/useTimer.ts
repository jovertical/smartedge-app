import * as React from 'react'

export default function useTimer(lifetime: number) {
  const [time, setTime] = React.useState(lifetime)

  React.useEffect(() => {
    const recorder = setInterval(() => {
      if (time < 0) {
        setTime(lifetime)
      } else {
        setTime(time - 1)
      }
    }, 1000)

    return () => {
      clearInterval(recorder)
    }
  })

  return time
}
