import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import announcementIcon from '@assets/png/icons/announcement.png'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

export default function Announcements({ navigation, route }) {
  const { authToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([])

  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await api('/announcements', {}, authToken)

      if (res.status === 200) {
        setAnnouncements(await res.json())
      }

      setLoading(false)
    }

    fetchAnnouncements()
  }, [route.params])

  return (
    <Master
      navigation={navigation}
      withBack
      title="ANNOUNCEMENTS"
      titleIcon={announcementIcon}
      titleIconPlacement="right"
    >
      {loading || announcements.length < 1 ? (
        <Text>Fetching announcements...</Text>
      ) : (
          <View style={styles.details}>
            <Text size="xl" color="blue" weight="bold">
              {announcements[0]?.title.toUpperCase()}
            </Text>
            <Text style={styles.body}>{announcements[0]?.body}</Text>
          </View>
        )}
    </Master>
  )
}

const styles = StyleSheet.create({
  details: {
    width: '100%',
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  body: {
    marginLeft: 20
  },
  bottomBar: {
    height: '20%',
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
})
