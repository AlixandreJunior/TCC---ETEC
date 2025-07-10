import { StyleSheet} from "react-native"
import { Text, View } from "react-native"

interface UserInfoSectionProps{
    displayName: string
    avatarChar: string
    joinYear: number | string
}

export const UserInfoSection: React.FC<UserInfoSectionProps> = ({
    avatarChar,
    displayName,
    joinYear
}) => {
    return(
        <View style={styles.formCardCommon}>
            <View style={styles.userInfo}>
            <View>
                <Text style={styles.userName}>{displayName}</Text>
                <Text style={styles.joinDate}>Entrou em {joinYear}</Text>
            </View>
            <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{avatarChar}</Text>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
  formCardCommon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth:1, 
    borderColor: '#F3F4F6',
    paddingVertical: 15,
    paddingHorizontal:20 ,
    width: '100%',
    maxWidth: 400,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 5,
  },

  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 1,
  },
  joinDate: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7F8C8D',
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 35,
    backgroundColor: '#79D457',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
  },
})