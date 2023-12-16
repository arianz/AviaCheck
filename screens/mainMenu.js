// import { Button } from "native-base";
import React, { Component, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,

} from "react-native";
import { NativeBaseProvider } from "native-base";
// cheklist berisi semua data datanya ditaroh disini. atau kalo mau misahin silakan
const checklist = [
    {
        "bab": "1",
        "judul": "before start",
        "isi": [{
            "command": "engine brake",
            "status": "aktif"
        }]
    },
    {
        "bab": "2",
        "judul": "before taxi",
        "isi": [{
            "command": "engine brake",
            "status": "aktif"
        }]
    }
]

const mainMenu = () => {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item}>
                <View style={{ flexDirection: "row", alignItems: "flex-start"  }}>
                    <View style={{ flexDirection: "column", alignItems: "flex-start",paddingVertical: "10px" }}>
                        <Text style={styles.itemText}>{item.judul}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <FlatList
                    data={checklist}
                    keyExtractor={(item) => item.bab}
                    renderItem={renderItem}
                />
            </View>
        </NativeBaseProvider>
    );
};

export default mainMenu;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        backgroundColor: "#193F8A",
        borderCurve: "10%",
        borderBottomColor: "#ddd",
    },
    itemText: {
        fontSize: 18,
        fontWeight: "bold",
        color:"white"
    },
});