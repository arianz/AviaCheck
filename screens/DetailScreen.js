import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming FontAwesome is available
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ route }) => {
  const { details } = route.params;
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedCount, setCheckedCount] = useState(0);
  const babKey = route.params.babKey; // Menambahkan parameter babKey

  const handleToggleCheckbox = (index) => {
    const updatedCheckedItems = [...checkedItems];
    const isChecked = updatedCheckedItems.includes(index);

    if (isChecked) {
      // Item already checked, remove it
      updatedCheckedItems.splice(updatedCheckedItems.indexOf(index), 1);
      setCheckedCount((prevCount) => prevCount - 1);
    } else {
      // Item not checked, add it
      updatedCheckedItems.push(index);
      setCheckedCount((prevCount) => prevCount + 1);
    }

    setCheckedItems(updatedCheckedItems);
  };

  const handleUndoChecklist = () => {
    // Implement logic to undo checklist
    setCheckedItems([]);
    setCheckedCount(0);
  };

  // Load checked items from AsyncStorage on component mount
  useEffect(() => {
    const loadCheckedItems = async () => {
      try {
        const storedCheckedItems = await AsyncStorage.getItem(`checkedItems_${babKey}`);
        if (storedCheckedItems) {
          setCheckedItems(JSON.parse(storedCheckedItems));
        }
      } catch (error) {
        console.error("Error loading checked items from AsyncStorage:", error);
      }
    };

    loadCheckedItems();
  }, [babKey]);

  useEffect(() => {
    // Save checked items to AsyncStorage whenever it changes
    const saveCheckedItems = async () => {
      try {
        await AsyncStorage.setItem(`checkedItems_${babKey}`, JSON.stringify(checkedItems));
      } catch (error) {
        console.error("Error saving checked items to AsyncStorage:", error);
      }
    };

    saveCheckedItems();
    // Also update checked count whenever checked items change
    setCheckedCount(checkedItems.length);
  }, [checkedItems, babKey]);

  useFocusEffect(
    React.useCallback(() => {
      // Setel kembali status centang dan hitung tercentang
      // dengan menggunakan nilai yang disimpan sebelumnya
      setCheckedItems((prevCheckedItems) => {
        setCheckedCount(prevCheckedItems.length);
        return [...prevCheckedItems]; // Perbarui agar referensi array berbeda
      });
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.checkedCountText}>{`${checkedCount} item(s) checked`}</Text>
      {details.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleToggleCheckbox(index)}>
          <View style={styles.detailItem}>
            <Text style={styles.commandText} numberOfLines={1} ellipsizeMode="tail">
              {item.command.length > 15 ? item.command.substring(0, 15) + "..." : item.command}
            </Text>
            <Text style={styles.statusText}>{item.status}</Text>
            <FontAwesome
              name={checkedItems.includes(index) ? "check-square-o" : "square-o"}
              size={20}
              color={checkedItems.includes(index) ? "#4CAF50" : "#555"}
            />
          </View>
        </TouchableOpacity>
      ))}
      {checkedCount > 0 && (
        <TouchableOpacity onPress={handleUndoChecklist}>
          <Text style={styles.undoText}>Reset Checklist</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F7F7",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  commandText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    fontSize: 16,
    color: "#555",
    marginRight: 10,
  },
  checkedCountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  undoText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
});

export default DetailScreen;
