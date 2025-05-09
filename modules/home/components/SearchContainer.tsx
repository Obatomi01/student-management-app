import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';

import { globalStyles } from '@/styles/global';
type Props = {
  onSearchValueChange: (value: string) => void;
  onClose: () => void;
};

const SearchContainer = ({ onSearchValueChange, onClose }: Props) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (text: string) => {
    setSearchText(text);
    onSearchValueChange(text); // Send value to parent
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingTop: 20,
      }}
    >
      <View
        style={[
          globalStyles.contentContainer,
          { position: 'relative', alignItems: 'center', flexDirection: 'row' },
        ]}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 12,
            fontSize: 14,
            fontFamily: 'ManropeMedium',
            width: '100%',
          }}
          onChangeText={handleChange}
          placeholder='Search by name or email'
          value={searchText}
        />

        <Pressable
          style={{
            position: 'absolute',
            right: 10,
            zIndex: 1,
          }}
          onPress={onClose}
        >
          <Entypo name='cross' size={28} color='black' />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({});
