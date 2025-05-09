import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import Entypo from '@expo/vector-icons/Entypo';

import colors from '@/constants/colors';
import ModalContainer from '@/modules/general/ModalContainer';
import ModalTopContentContainer from './ModalTopContentContainer';

import { API_URL } from '@/constants/api';
import axios from 'axios';

type Props = {
  showModal: boolean;
  setshowModal: () => void;
  id: number;
  onDeleteStudent: () => void;
};

type OptionType = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const StudentModal = ({
  showModal,
  setshowModal,
  id,
  onDeleteStudent,
}: Props) => {
  const router = useRouter();

  const options: OptionType[] = [
    {
      title: 'Edit',
      description: 'Edit student details',
      icon: <Entypo name='edit' size={24} color={colors.brand} />,
      onPress: () => {
        setshowModal();

        router.push({
          pathname: '/edit-student/[id]',
          params: { id: id },
        });
      },
    },
    {
      title: 'Delete',
      description: 'Delete student',
      icon: <Entypo name='trash' size={24} color={colors.brand} />,
      onPress: async () => {
        try {
          await axios.delete(`${API_URL}/students/${id}`);
          onDeleteStudent();
          router.push({ pathname: '/', params: { refresh: 'true' } });
          setshowModal();
        } catch (error) {
          console.error('Error deleting student:', error);
        }
      },
    },
  ];

  return (
    <ModalContainer setshowModal={setshowModal} showModal={showModal}>
      <ModalTopContentContainer
        setShowModal={setshowModal}
        title='Manage Student'
      />

      <View>
        {options.map((option, index) => (
          <Pressable
            key={index}
            onPress={option.onPress}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            {option.icon}
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.brand,
                  fontFamily: 'ManropeBold',
                }}
              >
                {option.title}
              </Text>
              <Text
                style={{ fontSize: 12, color: '#888', fontFamily: 'Manrope' }}
              >
                {option.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ModalContainer>
  );
};

export default StudentModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 30,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
