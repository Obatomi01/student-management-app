import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { StudentType } from './StudentList';
import StudentModal from './StudentModal';

type Props = StudentType & {
  onDeleteStudent: () => void;
};

const { width } = Dimensions.get('window');

const Student = ({
  email,
  enrollmentStatus,
  name,
  imgSrc,
  id,
  address,
  phoneNumber,
  onDeleteStudent,
}: Props) => {
  const [showModal, setshowModal] = useState(false);

  return (
    <>
      <Pressable onPress={() => setshowModal(true)}>
        <View style={styles.studentContainer}>
          <View
            style={{
              gap: 10,
              flexDirection: 'row',
            }}
          >
            <View>
              <Image
                source={{ uri: imgSrc }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  resizeMode: 'cover',
                }}
              />
            </View>

            <View style={{ width: width * 0.45 }}>
              <Text
                style={{ fontSize: 18, fontFamily: 'ManropeExtraBold' }}
                numberOfLines={2}
              >
                {name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#888',
                  fontFamily: 'Manrope',
                }}
                numberOfLines={2}
              >
                {email}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 12,
              color:
                enrollmentStatus === 'enrolled'
                  ? '#b029b3'
                  : enrollmentStatus === 'graduated'
                  ? '#2f80ed'
                  : '#27ae60',
              fontFamily: 'ManropeBold',
            }}
          >
            {enrollmentStatus.charAt(0).toUpperCase() +
              enrollmentStatus.slice(1)}
          </Text>
        </View>
      </Pressable>

      <StudentModal
        showModal={showModal}
        setshowModal={() => setshowModal(!showModal)}
        id={id}
        onDeleteStudent={() => onDeleteStudent()}
      />
    </>
  );
};

export default Student;

const styles = StyleSheet.create({
  studentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 14,
  },
});
