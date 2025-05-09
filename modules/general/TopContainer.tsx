import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { globalStyles } from '@/styles/global';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {};

const TopContainer = (props: Props) => {
  const router = useRouter();

  return (
    <View style={styles.topHomeContainer}>
      <View
        style={[
          globalStyles.contentContainer,
          { flex: 1, justifyContent: 'center', position: 'relative' },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            left: 0,

            alignItems: 'center',
            justifyContent: 'center',

            zIndex: 1,

            width: 30,
            height: 30,
          }}
        >
          <Ionicons name='chevron-back' size={24} color='white' />
        </Pressable>
        <Text
          style={[
            globalStyles.extraBoldWhiteText,
            {
              textAlign: 'center',
            },
          ]}
        >
          Edit Detail
        </Text>
      </View>
    </View>
  );
};

export default TopContainer;

const styles = StyleSheet.create({
  topHomeContainer: {
    backgroundColor: '#b029b3',

    height: 40,
    marginBottom: 10,
    alignItems: 'center',
    zIndex: 1,
  },
});
