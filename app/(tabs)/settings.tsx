import { globalStyles } from '@/styles/global';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Snackbar } from 'react-native-paper';

import { API_URL } from '@/constants/api';
import colors from '@/constants/colors';
import { clear } from '@/utils/AsyncStorage';

type Props = {};

type SettingsOption = {
  title: string;
  icon: React.ReactElement;
  onPress: () => void;
};

const settings = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const exportData = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);

      const jsonData = JSON.stringify(response.data, null, 2);

      const fileUri = FileSystem.documentDirectory + 'db-export.json';

      await FileSystem.writeAsStringAsync(fileUri, jsonData, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);

        setSnackMessage('Exported Student data successfully!');
        setVisible(true);
      } else {
        alert('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Export failed:', error);
      Alert.alert('Error', 'Failed to export db.json');
    }
  };

  const settingsOptions: SettingsOption[] = [
    {
      title: 'Clear Cache',
      icon: <AntDesign name='delete' size={24} color={colors.brandDarker} />,
      onPress: async () => {
        await clear();

        setSnackMessage('Cache Cleared');
        setVisible(true);
      },
    },
    {
      title: 'Export Student Data',
      icon: <Fontisto name='export' size={24} color={colors.brandDarker} />,
      onPress: async () => {
        await exportData();
      },
    },
    // {
    //   title: 'Set Max Enrollment',
    //   icon: (
    //     <FontAwesome6
    //       name='people-group'
    //       size={24}
    //       color={colors.brandDarker}
    //     />
    //   ),
    //   onPress: () => {
    //     console.log('Set Max Enrollment Pressed');
    //   },
    // },
  ];

  return (
    <SafeAreaView
      style={globalStyles.container}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style='light' />
      <View>
        <Text
          style={[
            globalStyles.extraBoldWhiteText,
            {
              textAlign: 'center',
              marginVertical: 20,
            },
          ]}
        >
          Settings
        </Text>
      </View>

      <View style={globalStyles.bodyContainer}>
        <View style={[globalStyles.contentContainer]}>
          {settingsOptions.map((option, index) => (
            <Pressable
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15,
              }}
              onPress={option.onPress}
            >
              <View
                style={{
                  width: '10%',
                }}
              >
                {option.icon}
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  color: '#000',
                  fontFamily: 'ManropeSemiBold',
                }}
              >
                {option.title}
              </Text>
            </Pressable>
          ))}
        </View>

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: 'ManropeSemiBold',
              fontSize: 14,
            }}
          >
            {snackMessage}
          </Text>
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({});
