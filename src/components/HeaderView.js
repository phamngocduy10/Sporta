import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';

export default function HeaderView() {
    return (
        <View style={{ height: 50, flexDirection: "row", alignItems: "center", width: "100%" }}>
            <View style={{ flex: 0.1 }}>
                <Icon
                    name="left"
                    size={27}
                    style={{ color: "#f59600", marginLeft: 10 }}
                >

                </Icon>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center", color: "#40376e" }}>HeaderView</Text>
            </View>

        </View>
    )
}