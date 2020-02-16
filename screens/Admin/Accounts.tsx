import * as React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'
import accountIcon from '@assets/png/icons/account.png'
import editIcon from '@assets/png/icons/edit.png'
import Button from '@components/Button'
import Master from '@components/Layouts/Master'
import Text from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import api from '@helpers/api'

interface ItemProps {
  user: User
}

const Item: React.FC<ItemProps> = ({ user }) => {
  return (
    <View key={user.id} style={styles.userCard}>
      <View>
        <Text size="lg" color="gray-900">
          NAME: {user?.name.toUpperCase()}
        </Text>
        <Text size="lg" color="gray-900">
          REVIEWEE NO: {user?.reviewee_profile?.reviewee_number}
        </Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default function Accounts() {
  const { authToken, logout } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<Boolean>(true)
  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    const fetchUsers = async () => {
      const res = await api('/users?type=reviewee', {}, authToken)

      if (res.status === 200) {
        const newUsers = await res.json()
        setUsers(newUsers)
      }

      setLoading(false)
    }

    fetchUsers()
  }, [])

  return (
    <Master title="ACCOUNT INFO" titleIcon={accountIcon}>
      {loading ? (
        <Text>Fetching reviewees...</Text>
      ) : (
        <SafeAreaView style={styles.listContainer}>
          <FlatList
            data={users}
            renderItem={({ item }) => <Item user={item} />}
            keyExtractor={user => user.id.toString()}
          />
        </SafeAreaView>
      )}
      <View style={styles.bottomBar}>
        <Button title="LOGOUT" size="lg" onPress={logout} />
      </View>
    </Master>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    maxHeight: '80%'
  },
  userCard: {
    width: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  editButton: {},
  editIcon: {
    width: 30,
    height: 30
  },
  bottomBar: {
    height: '20%',
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
})
