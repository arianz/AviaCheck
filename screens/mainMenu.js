import { Button } from "native-base";
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
import { NativeBaseProvider, } from "native-base";
import { CheckBox } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native"; // Impor useNavigation
import { NativeBaseProvider } from "native-base";
// cheklist berisi semua data datanya ditaroh disini. atau kalo mau misahin silakan
const checklist = [
    {
        "bab": "1",
        "judul": "PRE FLIGHT",
        "isi": [
            {"command": "PARKING BRAKE","status": "SET"},
            {"command": "BATTERY","status": "GUARD CLOSED"},
            {"command": "STANDBY POWER","status": "GUARD CLOSED"},
            {"command": "L CENTER FUEL PUMP","status": "AS REQUIRED"},
            {"command": "L AFT FUEL PUMP","status": "AS REQUIRED"},
            {"command": "APU","status": "START"},
            {"command": "APU GEN","status": "ON"},
            {"command": "POS LIGHTS","status": "STEADY"},
            {"command": "LOGO LIGHT","status": "AS REQUIRED"},
            {"command": "CABIN LIGHTS","status": "AS REQUIRED"},
            {"command": "EMER EXIT LIGHTS","status": "GUARD CLOSED"},
            {"command": "PASSENGER SIGNS","status": "ON"},
            {"command": "PACKS","status": "AUTO / HIGH"},
            {"command": "IRS MODE SELECTORS","status": "OFF > NAV"},
            {"command": "FMC","status": "SET"},

            //Request Flight-plan Clearance

            {"command": "TRANSPONDER","status": "SET"},
            {"command": "IAS / MACH SPEED","status": "SET"},
            {"command": "HDG / TAKEOFF RWY","status": "SET"},
            {"command": "INITIAL ALT","status": "SET"},
            {"command": "YAW DAMPER","status": "ON"},
            {"command": "WINDOW HEAT","status": "ON"},
            {"command": "FLIGHT ALTITUDE","status": "SET"},
            {"command": "LANDING ALTITUDE","status": "SET"},
            {"command": "FLIGHT DIRECTORS","status": "ON"},
            {"command": "LNAV","status": "AS REQUIRED"},
            {"command": "VNAV","status": "AS REQUIRED"},
            {"command": "MINIMUMS REF","status": "BARO or RADIO"},
            {"command": "MINIMUMS","status": "SET"},
            {"command": "ALTIMETER REF","status": "IN or HPA"},
            {"command": "AUTO BRAKE","status": "RTO"},
            {"command": "COM RADIOS","status": "SET"},
            {"command": "DOORS","status": "CLOSED"}
        ]
    },
    {
        "bab": "2",
        "judul": "BEFORE START",
        "isi": [
            {"command": "AUTOTHROTTLE","status": "ARM"},
            {"command": "L & R C FUEL PUMPS","status": "AS REQUIRED"},
            {"command": "A & F FUEL PUMPS","status": "ON"},
            {"command": "ELEC HYD PUMPS","status": "ON"},
            {"command": "ANTI COLL LIGHT","status": "ON"},
            {"command": "PARKING BRAKE","status": "SET"},
            {"command": "GROUND EQUIPMENT","status": "REMOVED"},
            {"command": "ENGINE AREA","status": "CLEAR"},
        ]
    },
    {
        "bab": "3",
        "judul": "ENGINE START",
        "isi": [
            {"command": "SEC DISPLAY UNIT","status": "ENGINE"},
            {"command": "PACKS","status": "OFF"},
            {"command": "ENGINE 1 START SWITCH","status": "GND"},
            {"command": "ENGINE 1 FUEL CONTROL LEVER","status": "RUN"},
            {"command": "ENGINE 2 START SWITCH","status": "GND"},
            {"command": "ENGINE 2 FUEL CONTROL LEVER","status": "RUN"}
        ]
    },
    {
        "bab": "4",
        "judul": "BEFORE TAXI",
        "isi": [
            {"command": "GENERATORS 1 & 2","status": "ON"},
            {"command": "PROBE HEAT","status": "ON"},
            {"command": "WING ANTI ICE","status": "AS REQUIRED"},
            {"command": "ENGINE ANTI ICE","status": "AS REQUIRED"},
            {"command": "PACKS","status": "AUTO"},
            {"command": "ISOLATION VALVE","status": "AUTO"},
            {"command": "APU BLEED","status": "OFF"},
            {"command": "APU","status": "OFF"},
            {"command": "ENG START SWITCHES","status": "CONT"},
            {"command": "FLAPS","status": "AS REQUIRED"},
            {"command": "ELEVATOR TRIM","status": "SET FOR TAKE-OFF"},
            {"command": "FLIGHT CONTROLS","status": "FREE AND CORRECT"},
            {"command": "RECALL (737-800 only)","status": "CHECK"},
            {"command": "LOWER DISPLAY UNIT (DU)","status": "OFF"},

            //Request Taxi Clearance

            {"command": "TAXI LIGHTS","status": "ON"},
            {"command": "RWY TURN-OFF LIGHTS","status": "AS REQUIRED"}
        ]
    },
    {
        "bab": "5",
        "judul": "TAXI",
        "isi": [
            {"command": "TAXI to assigned runway","status": "SPEED Max. 20 knots"},
            {"command": "BRKS/GYRO/TURN COORDINATOR","status": "CHECK during taxi"}
        ]
    },
    {
        "bab": "6",
        "judul": "BEFORE TAKE-OFF",
        "isi": [
            {"command": "PARKING BRAKE","status": "SET"},
            {"command": "FUEL FLOW","status": "RESET, then RATE"},
            {"command": "C FUEL PUMPS","status": "AS REQUIRED"},
            {"command": "DE-ICE","status": "AS REQUIRED"},
            {"command": "CABIN LIGHTS","status": "AS REQUIRED"},
            {"command": "FLIGHT INSTRUMENTS","status": "CHECK"},
            {"command": "ENGINE INSTRUMENTS","status": "CHECK"},
            {"command": "TAKE-OFF DATA","status": "(V1, VR, V2) CHECK"},
            {"command": "NAV EQUIPMENT","status": "CHECK"},

            //Request Takeoff Clearance

            {"command": "LANDING LIGHTS","status": "ON"},
            {"command": "STROBE LIGHT","status": "ON"},
            {"command": "TAXI LIGHTS","status": "OFF"},
            {"command": "TRANSPONDER","status": "TA/RA"},
            {"command": "TFC","status": "PUSH ON"},
            {"command": "CLOCK","status": "START"}
        ]
    },
    {
        "bab": "7",
        "judul": "AFTER TAKE-OFF",
        "isi": [
            {"command": "POSITIVE RATE OF CLIMB","status": "GEAR UP"},
            {"command": "AUTO-BRAKE","status": "OFF"},
            {"command": "ENGINE START SWITCHES","status": "OFF"},
            {"command": "GEAR LEVER","status": "OFF POSITION"},
            {"command": "RWY TURN-OFF LIGHTS","status": "OFF"},
            {"command": "CABIN LIGHTS","status": "AS REQUIRED"}
        ]
    },
    {
        "bab": "8",
        "judul": "CLIMB-OUT",
        "isi": [
            {"command": "CMD A or B", "status": "ENGANGE (when suitable)"},
            
            //Passing TA (Transition-Altitude)

            {"commnad": "ALTIMETER", "status": "PUSH TO SET STD (29,92 / 1013)"},
            {"command": "BELOW 10'000FT", "status": "MAX. 250 KIAS"},
            {"command": "ATC", "status": "AS REQUIRED"},

            //Passing 10'000 ft

            {"command": "LANDING LIGHT", "status": "OFF"},
            {"command": "FASTEN SEAT BELTS", "status": "OFF"},
            {"command": "C FUEL PUMPS", "status": "OFF"}
        ]
    },
    {
        "bab": "9",
        "judul": "CRUISE & DESCENT",
        "isi": [
            {"command": "ENGINE & INSTRUMENTS", "status": "MONITOR"},
            {"command": "FUEL QUANTITY", "status": "CHECK"},
            {"command": "LIGHTS", "status": "AS REQUIRED"},

            //Before TOD
            {"command": "ATIS / AIRPORT INFORMATION", "status": "CHECK"},
            {"command": "ALTIMETER", "status": "CHECK"},
            {"command": "RADIOS", "status": "SET"},
            {"command": "RESET MCP ALTITUDE", "status": "CHECK"},
            {"command": "FMC APPR SPEED REF", "status": "SET"},
            {"command": "LOCALIZER FREQ", "status": "SET"},
            {"command": "ILS LOC COURSE", "status": "SET"},

            //Descent
            {"command": "DE-ICE", "status": "AS REQUIRED"},
            {"command": "LANDING ALT", "status": "CHECK"},
            {"command": "RECALL (737-800 only)", "status": "CHECK"},
            {"command": "RADIO ALT / BARO MIN", "status": "SET, CHECK"},
            {"command": "AUTO BRAKE", "status": "AS REQUIRED"},

            //Passing TA (Transition-Altitude)
            {"command": "ALTIMETER", "status": "RESET TO LOCAL"},

            //Below 10'000 ft
            {"command": "SPEED", "status": "250 KIAS"},
            {"command": "LANDING LIGHTS", "status": "ON"},
            {"command": "PASSENGER SIGNS", "status": "ON"},

            //Check Weather (ATIS, Flight Services)
        ]
    },
    {
        "bab": "10",
        "judul": "APPROACH",
        "isi": [
            {"command": "ALTIMETER", "status": "CHECK"},
            {"command": "LOCALIZER FREQ", "status": "CHECK"},
            {"command": "LOCALIZER COURSE", "status": "CHECK"},
            {"command": "APP", "status": "ARM"},
            {"command": "GLIDESLOPE ALIVE", "status": "GEAR DOWN"},
            {"command": "FLAPS", "status": "15"},
            {"command": "SPEED BRAKE", "status": "ARM"},
            {"command": "2ND AUTOPILOT", "status": "ARM (when ILS established)"},
            {"command": "ENGINE START SWITCHES", "status": "CONT"},
            {"command": "LANDING FLAPS", "status": "SET"},
        ]
    },
    {
        "bab": "11",
        "judul": "LANDING",
        "isi": [
            {"command": "GO AROUND ALTITUDE", "status": "SET"},
            {"command": "RWY TURN-OFF LIGHTS", "status": "ON"},
            {"command": "LANDING GEAR", "status": "CHECK DOWN"},
            {"command": "AUTOPILOT", "status": "AS REQUIRED"},
            {"command": "AUTO-THRUST", "status": "AS REQUIRED"},

            //After Touch-Down
            {"command": "THRUST REVERSE", "status": "ENGAGE"},
            {"command": "AUTOPILOT", "status": "OFF"},
            {"command": "AUTOTHRUST", "status": "OFF"},
            {"command": "AT 60 KTS", "status": "REV THRUST TO IDLE"},
            {"command": "AT 60 KTS", "status": "AUTO-BRAKE DISENGAGE"},
        ]
    },
    {
        "bab": "12",
        "judul": "AFTER LANDING",
        "isi": [
            {"command": "TRANSPONDER", "status": "OFF"},
            {"command": "FLAPS", "status": "RETRACT"},
            {"command": "SPEED BRAKE", "status": "DOWN"},
            {"command": "LANDING LIGHTS", "status": "OFF"},
            {"command": "STROBE LIGHTS", "status": "OFF"},
            {"command": "TAXI LIGHTS", "status": "ON"},
            {"command": "CABIN LIGHTS", "status": "AS REQUIRED"},
            {"command": "ANTI ICE", "status": "AS REQUIRED"},
            {"command": "APU", "status": "START / CHECK RUN"},
            {"command": "PROBE HEAT", "status": "OFF"},
            {"command": "ENG START SWITCHES", "status": "OFF"},
            {"command": "AUTO-BRAKE", "status": "OFF"},

            //Taxi to Assigned Gate/Parking (Speed Max 20 knots)

            {"command": "RWY TURNOFF LIGHTS", "status": "OFF"},
            {"command": "APU GEN", "status": "ON / CHECK VOLTS"},

            //Turning Into The Gate:

            {"command": "TAXI LIGHTS", "status": "OFF"},
        ]
    },
    {
        "bab": "13",
        "judul": "PARKING / SHUTDOWN",
        "isi": [
            {"command": "PARKING BRAKES", "status": "SET"},
            {"command": "ENGINE FUEL CONTROL LEVERS", "status": "OFF"},
            {"command": "GROUND CONTACT", "status": "ESTABLISH"},
            {"command": "GROUND OPERATIONS", "status": "AS REQUIRED (FMC)"},
            {"command": "PASSENGER SIGNS", "status": "OFF"},
            {"command": "APU BLEED AIR", "status": "ON"},
            {"command": "ANIT COLL LIGHTS", "status": "OFF"},
            {"command": "FUELPUMPS", "status": "OFF"},
            {"command": "L AFT FUEL PUMP", "status": "ON"},
            {"command": "ANTI-ICE", "status": "OFF"},
            {"command": "ELED HYD PUMPS", "status": "OFF"},
            {"command": "ISOLATION VALVE", "status": "OPEN"},
            {"command": "FLIGHT DIRECTOR", "status": "OFF"},
            {"command": "ELECTRICAL POWER", "status": "ESTABLISH"},
            {"command": "EXTERIOR LIGHTS", "status": "AS REQUIRED"},
            {"command": "DOORS", "status": "OPEN"},
        ]
    },
]

const mainMenu = () => {
    const navigation = useNavigation();
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckBox = (item) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [item.command]: !prevCheckedItems[item.command],
        }));
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Detail', { selectedItem: item })}>
                <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                    <View style={styles.CheckBox}>
                        <TouchableOpacity onPress={() => handleCheckBox(item)}>
                            <CheckBox
                                isChecked={checkedItems[item.command]}
                                onPress={() => handleCheckBox(item)}
                                colorScheme="primary"
                            />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "column", alignItems: "flex-start", paddingVertical: 10 }}>
                            <Text style={styles.itemText}>{item.command}: {item.judul}</Text>
                        </View>
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
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 16,
        backgroundColor: "white",
        borderColor: "#34495E",
        borderWidth: 2,
        borderRadius: 10,
        borderBottomWidth: 1,
        backgroundColor: "#193F8A",
        borderCurve: "10%",
        borderBottomColor: "#ddd",
    },
    itemText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    separator: {
        height: 18,
    },
    CheckBox: {
        // Add any additional styles for CheckBox container if needed
    },
});

export default mainMenu;