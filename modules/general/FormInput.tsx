import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Controller } from 'react-hook-form';

import { FormData } from '../edit-student/EditStudentForm';

type Props = {
  name: keyof FormData;
  control: any;
  errors: any;
  label: string;
  placeholder?: string;
  rules?: object;
  isNumber?: boolean;
  isEmail?: boolean;
};

const FormInput = ({
  control,
  errors,
  label,
  name,
  placeholder,
  rules,
  isNumber,
  isEmail,
}: Props) => {
  return (
    <View style={{ marginBottom: 10, gap: 3 }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'ManropeBold',
        }}
      >
        {label}
      </Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType={isNumber ? 'numeric' : 'default'}
            placeholder={placeholder}
            maxLength={isNumber ? 11 : undefined}
            onBlur={onBlur}
            onChangeText={
              isNumber
                ? (text) => {
                    const digitsOnly = text.replace(/[^0-9]/g, '');
                    onChange(digitsOnly); // only allow digits
                  }
                : onChange
            }
            value={value}
            autoCapitalize={isEmail ? 'none' : 'sentences'}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 12,
              fontSize: 14,
              fontFamily: 'ManropeMedium',
            }}
          />
        )}
        name={name}
      />
      {errors[name] && (
        <Text
          style={{
            color: '#f54260',
            fontSize: 14,
            fontFamily: 'Manrope',
          }}
        >
          {errors[name].message || 'This field is required'}
        </Text>
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
