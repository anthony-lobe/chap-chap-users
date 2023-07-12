import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function Parameters () {
    return (
        <View>

                <LinearGradient colors={['#f78f20', '#fd644f']} style={{ width: '85%', height: 68, alignSelf: 'center',  borderRadius: 15, marginTop: 60 }}>
                    <View style={styles.headerTitle}>

                    <Text style={styles.textConfig}> Paramètres </Text>

                    </View>
                </LinearGradient>


        </View>
    )
}

const styles = StyleSheet.create(
    {
        headerTitle: {
            flexDirection: "row"
        }, 
        textConfig: {
            alignSelf: 'center'
        }
    }
)

