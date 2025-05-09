import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';

import { globalStyles } from '@/styles/global';

type Props = {
  title: string;
  setShowModal: () => void;
};

const ModalTopContentContainer = ({ title, setShowModal }: Props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        marginBottom: 15,
      }}
    >
      <Text style={globalStyles.blackBoldText}>{title}</Text>

      <Pressable onPress={() => setShowModal()}>
        <Entypo name='cross' size={32} color='black' />
      </Pressable>
    </View>
  );
};

export default ModalTopContentContainer;

const styles = StyleSheet.create({});
