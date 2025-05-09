import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { globalStyles } from '@/styles/global';
import Student from './Student';

import axios from 'axios';

import { FilterValueOptions } from './FilterModal';
import { SortValueOptions } from './SortModal';

import { API_URL } from '@/constants/api';
import colors from '@/constants/colors';
import { Snackbar } from 'react-native-paper';
import NoStudentFound from './NoStudentFound';

type Props = {
  sortOption: {
    sortBy: SortValueOptions;
    sortInAscendingOrder: boolean;
  };
  filterOption: FilterValueOptions;
  onGetNumberOfStudents: (numberOfStudents: number) => void;
  searchValue: string;
};

export type StudentType = {
  name: string;
  email: string;
  enrollmentStatus: 'enrolled' | 'graduated' | 'alumni';
  imgSrc?: any;
  id: number;
  phoneNumber: string;
  address: string;
  dateAdded: string;
};

const StudentList = ({
  sortOption,
  filterOption,
  onGetNumberOfStudents,
  searchValue,
}: Props) => {
  const { refresh } = useLocalSearchParams();
  const router = useRouter();
  const [studentsFromDB, setStudentsFromDB] = useState<StudentType[] | null>(
    null
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const fetchStudents = async () => {
    const response = await axios.get(`${API_URL}/students`);
    const data = response.data;

    setStudentsFromDB(data);
    onGetNumberOfStudents(sortedStudentsLength);
  };

  useEffect(() => {
    fetchStudents();
  }, [sortOption, filterOption]);

  useEffect(() => {
    if (refresh === 'true') {
      fetchStudents();

      router.setParams({ refresh: undefined });
    }
  }, [refresh]);

  if (studentsFromDB === null) {
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

  const activeStatus = Object.entries(filterOption)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);

  const filteredStudents = studentsFromDB.filter((student) =>
    activeStatus.length > 0
      ? activeStatus.includes(student.enrollmentStatus)
      : true
  );
  const results =
    searchValue === ''
      ? filteredStudents
      : filteredStudents.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(searchValue.toLowerCase())
        );

  const sortStudents = (a: StudentType, b: StudentType) => {
    const { sortBy, sortInAscendingOrder } = sortOption;

    if (sortBy === 'name') {
      return sortInAscendingOrder
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'email') {
      return sortInAscendingOrder
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (sortBy === 'dateAdded') {
      return sortInAscendingOrder
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    return 0;
  };

  const sortedStudents = [...results].sort(sortStudents);
  const sortedStudentsLength = sortedStudents.length;

  return (
    <>
      {sortedStudentsLength < 1 ? (
        <NoStudentFound />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={[globalStyles.contentContainer]}>
            <FlatList
              data={sortedStudents}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Student
                  {...item}
                  onDeleteStudent={() => setShowSnackbar(true)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <Snackbar
            visible={showSnackbar}
            onDismiss={() => setShowSnackbar(false)}
            duration={2000}
            style={{
              position: 'absolute',
              width: '90%',
              bottom: 0,
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontFamily: 'ManropeSemiBold',
                fontSize: 14,
              }}
            >
              Student Deleted Successfully
            </Text>
          </Snackbar>
        </View>
      )}
    </>
  );
};

export default StudentList;

const styles = StyleSheet.create({});
