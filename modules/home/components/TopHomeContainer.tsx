import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { globalStyles } from '@/styles/global';

import EvilIcons from '@expo/vector-icons/EvilIcons';

type Props = {
  onShowSearchContainer: () => void;
};

const TopHomeContainer = ({ onShowSearchContainer }: Props) => {
  return (
    <View style={styles.topHomeContainer}>
      <View
        style={[
          globalStyles.contentContainer,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={globalStyles.extraBoldWhiteText}>Student Profiles</Text>

        <Pressable
          style={styles.searchContainer}
          onPress={onShowSearchContainer}
          testID='search-button'
        >
          <EvilIcons
            name='search'
            size={30}
            color='white'
            style={{ textAlignVertical: 'center' }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TopHomeContainer;

const styles = StyleSheet.create({
  topHomeContainer: {
    backgroundColor: '#b029b3',
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#8f0991',

    height: 40,
    width: 40,

    borderRadius: 100,
  },
});
