
import { getAuth } from "@firebase/auth"
import { LinearGradient } from "expo-linear-gradient"
import {View } from 'react-native'
 
export function Course () {

    const auth = getAuth()

    console.log(auth.currentUser.uid)
    return (
        <View>
             <LinearGradient colors={['#f78f20', '#fd644f']} style={{ width: '100%', height: 300,  borderRadius: 30, }}>
                </LinearGradient>

        </View>
    )
}