import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import FormInput from '../general/FormInput';
import SubmitBtn from '../general/SubmitBtn';

import { API_URL } from '@/constants/api';
import { useRouter } from 'expo-router';
import StatusDropdown from '../general/StatusDropdown';

import { EnrollmentStatus } from '../general/StatusDropdown';

type Props = {
  image: string | null;
  onClearImage: () => void;
};

export type FormData = {
  name: string;
  email: string;
  enrollmentStatus: EnrollmentStatus;
  imgSrc?: any;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
};

const AddStudentForm = ({ image, onClearImage }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formHasBeenSubmitted, setFormHasBeenSubmitted] = useState(false);

  const [enrollmentStatus, setEnrollmentStatus] =
    useState<EnrollmentStatus>('enrolled');
  const [formFeedback, setFormFeedback] = useState({
    message: '',
    showFormFeedback: false,
    isError: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      enrollmentStatus: 'enrolled',
      imgSrc: undefined,
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
    },
  });

  const uploadImage = async () => {
    if (!image) {
      return;
    }

    const formData = new FormData();

    const imageName = image.split('/').pop() ?? '';

    const imageType =
      imageName.endsWith('.jpg') || imageName.endsWith('.jpeg')
        ? 'image/jpeg'
        : imageName.endsWith('.png')
        ? 'image/png'
        : 'image/jpg';

    const file = {
      uri: image,
      type: imageType,
      name: imageName,
    } as any;

    formData.append('file', file);
    formData.append('upload_preset', 'learntomia_app');
    formData.append('cloud_name', 'dh4uqrwhc');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dh4uqrwhc/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = res.data.secure_url;
      console.log('Uploaded Image URL:', imageUrl);

      return imageUrl;
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const imageUrl = await uploadImage();
      const numberResponse = await axios.get(`${API_URL}/metadata/1`);
      const { lastStudentNumber } = numberResponse.data;
      const requestTime = new Date().toISOString();

      const postStudentData = await axios.post(`${API_URL}/students`, {
        name: data.name,
        email: data.email,
        enrollmentStatus: enrollmentStatus,
        phoneNumber: data.phoneNumber,
        address: data.address,
        id: (lastStudentNumber + 1).toString(),
        dateAdded: requestTime,
        imgSrc:
          imageUrl || 'https://cdn-icons-png.flaticon.com/128/847/847969.png',
      });
      await axios.patch(`${API_URL}/metadata/1`, {
        lastStudentNumber: lastStudentNumber + 1,
      });

      if (postStudentData.status === 201) {
        setFormFeedback({
          message: 'Student Added Successfully',
          showFormFeedback: true,
          isError: false,
        });
        setFormHasBeenSubmitted(true);

        setTimeout(() => {
          router.push({ pathname: '/', params: { refresh: 'true' } });
          reset();
          setIsLoading(false);
          onClearImage();
          setFormFeedback({
            message: '',
            showFormFeedback: false,
            isError: false,
          });
        }, 2000);
      }
    } catch (error) {
      setFormFeedback({
        message: 'Error adding student. Please try again.',
        showFormFeedback: true,
        isError: true,
      });
      console.error('Error adding student:', error);
    }
  };

  return (
    <View style={{ marginVertical: 40 }}>
      {formFeedback.showFormFeedback && (
        <Text
          style={{
            color: formFeedback.isError ? '#f54260' : '#00FF00',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 10,
            fontFamily: 'ManropeBold',
          }}
        >
          {formFeedback.message}
        </Text>
      )}
      <FormInput
        control={control}
        errors={errors}
        label='Name'
        name='name'
        placeholder='Student Name'
        rules={{
          required: true,
        }}
      />

      <FormInput
        control={control}
        errors={errors}
        label='Email'
        name='email'
        placeholder='Student Email'
        rules={{
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          },
        }}
        isEmail
      />

      {/* <FormInput
        control={control}
        errors={errors}
        label='Date of Birth'
        name='dateOfBirth'
        placeholder='Date of Birth'
        rules={{
          required: true,
          pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message: 'Invalid date format. Use YYYY-MM-DD',
          },
        }}
      /> */}

      <FormInput
        control={control}
        errors={errors}
        label='Phone Number'
        name='phoneNumber'
        placeholder='Phone Number'
        isNumber
        rules={{
          required: true,
          pattern: {
            value: /^0[789][01]\d{8}$/,
            message: 'Invalid Nigerian phone number',
          },
        }}
      />

      <FormInput
        control={control}
        errors={errors}
        label='Address'
        name='address'
        placeholder='Address'
        rules={{
          required: true,
        }}
      />

      <StatusDropdown
        onChange={(newStatus) => {
          setEnrollmentStatus(newStatus);
        }}
        formHasBeenSubmitted={formHasBeenSubmitted}
      />

      {/* <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{
          backgroundColor: '#000',
        }}
      >
        <Text
          style={{
            color: '#fff',
          }}
        >
          Student Added Successfully
        </Text>
      </Snackbar> */}

      <SubmitBtn
        onPress={handleSubmit(onSubmit)}
        text='Submit'
        isLoading={isLoading}
      />
    </View>
  );
};

export default AddStudentForm;

const styles = StyleSheet.create({});
