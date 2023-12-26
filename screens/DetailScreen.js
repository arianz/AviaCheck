import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
  const { selectedItem } = route.params;
  const navigation = useNavigation(); // Add this line to get the navigation object

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ paddingVertical: 10 }}
      onPress={() => {
        // Navigate to another screen when an item is pressed
        // You can replace 'TargetScreen' with the name of your target screen
        navigation.navigate('TargetScreen', { item });
      }}
    >
      <Text>{item.command}: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{selectedItem.judul}</Text>
      <FlatList
        data={selectedItem.isi}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DetailScreen;
