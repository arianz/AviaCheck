import React from "react";
import { StyleSheet, Text, View } from "react-native";

const navibar = ()=>{
    return(
       <View style={styles.navibar}> 
        <view>
            <Text style={styles.navibarText}>
                AVIACHECK
            </Text>
        </view>
       </View>
    )
}
export default navibar

const styles= StyleSheet.create({
    navibar:{
        width:"100%",
        height:"100%",

    }
})