import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import FormInput from '../general/FormInput';
import SubmitBtn from '../general/SubmitBtn';
import { StudentType } from '../home/components/StudentList';

import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useRouter } from 'expo-router';
import StatusDropdown from '../general/StatusDropdown';

import { EnrollmentStatus } from '../general/StatusDropdown';
type Props = StudentType & {
  newImgSrc: string | null;
};

export type FormData = {
  name: string;
  email: string;
  enrollmentStatus: 'enrolled' | 'graduated' | 'alumni';
  imgSrc?: any;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
};

const EditStudentForm = ({
  id,
  address,
  email,
  enrollmentStatus,
  name,
  phoneNumber,
  imgSrc,
  newImgSrc,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formFeedback, setFormFeedback] = useState({
    message: '',
    showFormFeedback: false,
    isError: false,
  });
  const [newEnrollmentStatus, setNewEnrollmentStatus] =
    useState<EnrollmentStatus>(enrollmentStatus || 'enrolled');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: name,
      email: email,
      enrollmentStatus: enrollmentStatus,
      imgSrc: imgSrc,
      dateOfBirth: '',
      phoneNumber: phoneNumber,
      address: address,
    },
  });

  const uploadImage = async () => {
    if (!newImgSrc) {
      return;
    }

    const formData = new FormData();

    const imageName = newImgSrc.split('/').pop() ?? '';

    const imageType =
      imageName.endsWith('.jpg') || imageName.endsWith('.jpeg')
        ? 'image/jpeg'
        : imageName.endsWith('.png')
        ? 'image/png'
        : 'image/jpg';

    const file = {
      uri: newImgSrc,
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

      const postStudentData = await axios.patch(`${API_URL}/students/${id}`, {
        name: data.name,
        email: data.email,
        enrollmentStatus: newEnrollmentStatus,
        phoneNumber: data.phoneNumber,
        address: data.address,

        imgSrc: imageUrl || imgSrc,
      });

      if (postStudentData.status === 200) {
        setFormFeedback({
          message: 'Student updated successfully',
          showFormFeedback: true,
          isError: false,
        });

        setTimeout(() => {
          router.push({ pathname: '/', params: { refresh: 'true' } });
          reset();
          setIsLoading(false);
          // onClearImage();

          setFormFeedback({
            message: 'Student updated successfully',
            showFormFeedback: true,
            isError: false,
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
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
        onChange={(status) => {
          setNewEnrollmentStatus(status);
        }}
        initStatus={enrollmentStatus}
      />

      <SubmitBtn
        onPress={handleSubmit(onSubmit)}
        text='Submit'
        isLoading={isLoading}
      />
    </View>
  );
};

export default EditStudentForm;

const styles = StyleSheet.create({});
