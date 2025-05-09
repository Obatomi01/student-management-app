import AddStudentForm from '@/modules/add-student/AddStudentForm';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '@/constants/colors';
import { globalStyles } from '@/styles/global';

type Props = {};

const { width } = Dimensions.get('window');

const addStudent = (props: Props) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      const fileInfo = await FileSystem.getInfoAsync(imageUri);

      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (!fileInfo.exists) {
        Alert.alert('Error', 'File does not exist');
        return;
      }

      if (fileInfo.size && fileInfo.size > maxSizeInBytes) {
        Alert.alert(
          'File too large',
          `Please select an image smaller than ${maxSizeInMB}MB.`
        );
        return;
      }

      setImage(imageUri);
    }
  };

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
          Add Student
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ flex: 1, backgroundColor: '#fff' }}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: '#fff',
            paddingVertical: 20,
          }}
        >
          <View style={globalStyles.bodyContainer}>
            <View style={[globalStyles.contentContainer]}>
              <View
                style={{
                  position: 'relative',
                  width: width * 0.4,
                  height: width * 0.4,
                  alignSelf: 'center',
                }}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.imageElement} />
                ) : (
                  <Image
                    source={require('../../assets/images/user.png')}
                    style={styles.imageElement}
                  />
                )}

                <Pressable
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    padding: 10,
                    backgroundColor: colors.brandLight,
                    borderRadius: 1000,
                    zIndex: 1,
                  }}
                  onPress={pickImage}
                >
                  <MaterialIcons name='mode-edit' size={24} color='white' />
                </Pressable>
              </View>

              <AddStudentForm
                image={image}
                onClearImage={() => setImage(null)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default addStudent;

const styles = StyleSheet.create({
  imageElement: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    resizeMode: 'cover',
  },
});
