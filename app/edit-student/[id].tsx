import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { Alert, Pressable } from 'react-native';

import { API_URL } from '@/constants/api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopContainer from '@/modules/general/TopContainer';
import { globalStyles } from '@/styles/global';

import EditStudentForm from '@/modules/edit-student/EditStudentForm';
import { StudentType } from '@/modules/home/components/StudentList';

import colors from '@/constants/colors';
import axios from 'axios';

type Props = {};

const { width } = Dimensions.get('window');

const studentId = (props: Props) => {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState<StudentType | null>(null);

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

  const fetchStudents = async () => {
    const response = await axios.get(`${API_URL}/students`);
    const data = response.data;

    const student = data.find((student: StudentType) => student.id == +id);

    setStudent(student);
    setImage(student.imgSrc);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (student === null) {
    return (
      <View
        style={[
          globalStyles.bodyContainer,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size={'large'} color={colors.brand} />
      </View>
    );
  }

  // const student = students.find((student) => student.id == +id);
  console.log('image being set', image);

  return (
    <SafeAreaView
      style={globalStyles.container}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style='light' />
      <TopContainer />

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
                  bottom: 2,
                  right: 2,
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

            {student && <EditStudentForm {...student} newImgSrc={image} />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default studentId;

const styles = StyleSheet.create({
  imageElement: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    resizeMode: 'cover',
  },
});
