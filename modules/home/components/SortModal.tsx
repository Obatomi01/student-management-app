import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import ModalContainer from '@/modules/general/ModalContainer';
import ModalTopContentContainer from './ModalTopContentContainer';

import colors from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';

import { setItem } from '@/utils/AsyncStorage';

type Props = {
  showModal: boolean;
  setShowModal: any;
  initObject: {
    sortBy: SortValueOptions;
    sortInAscendingOrder: boolean;
  };
  setSortOption: (sortOption: {
    sortBy: SortValueOptions;
    sortInAscendingOrder: boolean;
  }) => void;
};

export type SortValueOptions = 'name' | 'email' | 'dateAdded';

type SortOptions = {
  title: string;
  value: SortValueOptions;
};

const sortOptions: SortOptions[] = [
  { title: 'Name', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Date Added', value: 'dateAdded' },
];

const SortModal = ({
  showModal,
  setShowModal,
  initObject,
  setSortOption,
}: Props) => {
  const { sortInAscendingOrder, sortBy } = initObject;

  return (
    <ModalContainer setshowModal={setShowModal} showModal={showModal}>
      <ModalTopContentContainer title='Sort By' setShowModal={setShowModal} />

      {sortOptions.map((option, index) => {
        const isActive = sortBy === option.value;

        return (
          <Pressable
            key={index}
            onPress={() => {
              if (isActive) {
                setItem('sortOption', {
                  sortBy: option.value,
                  sortInAscendingOrder: !sortInAscendingOrder,
                });
                setSortOption({
                  sortBy: option.value,
                  sortInAscendingOrder: !sortInAscendingOrder,
                });

                setTimeout(() => {
                  setShowModal(false);
                }, 500);

                return;
              }

              setItem('sortOption', {
                sortBy: option.value,
                sortInAscendingOrder: true,
              });
              setSortOption({
                sortBy: option.value,
                sortInAscendingOrder: true,
              });

              setTimeout(() => {
                setShowModal(false);
              }, 500);
            }}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,

              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: isActive ? colors.brand : 'black',
                fontWeight: '500',
              }}
            >
              {option.title}
            </Text>

            {isActive && (
              <AntDesign
                name={sortInAscendingOrder ? 'arrowup' : 'arrowdown'}
                size={24}
                color={colors.brand}
              />
            )}
          </Pressable>
        );
      })}
    </ModalContainer>
  );
};

export default SortModal;

const styles = StyleSheet.create({});
