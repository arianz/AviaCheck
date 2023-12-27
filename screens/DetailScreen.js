import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming FontAwesome is available

const DetailScreen = ({ route }) => {
  const { details } = route.params;
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedCount, setCheckedCount] = useState(0);

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
          <Text style={styles.undoText}>Undo Checklist</Text>
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
  },
});

export default DetailScreen;
