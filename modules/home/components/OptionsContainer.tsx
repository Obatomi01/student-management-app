import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import OptionButton from './OptionButton';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import FilterModal from './FilterModal';
import SortModal from './SortModal';

import { FilterValueOptions } from './FilterModal';
import { SortValueOptions } from './SortModal';

type Props = {
  setSortOption: (sortOption: {
    sortBy: SortValueOptions;
    sortInAscendingOrder: boolean;
  }) => void;
  sortOption: {
    sortBy: SortValueOptions;
    sortInAscendingOrder: boolean;
  };
  filterOption: FilterValueOptions;
  setFilterOption: (filterOption: FilterValueOptions) => void;
};

export type OptionButtonProps = {
  title: string;
  icon: React.ReactElement;
  onPress: () => void;
};

type ModalType = 'filter' | 'sort' | '';

const { width } = Dimensions.get('window');

const OptionsContainer = ({
  setSortOption,
  sortOption,
  filterOption,
  setFilterOption,
}: Props) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState<ModalType>('');

  const options: OptionButtonProps[] = [
    {
      title: 'Filter',
      icon: <MaterialIcons name='filter-list' size={18} color='black' />,
      onPress: () => setShowModal('filter'),
    },
    {
      title: 'Sort',
      icon: <FontAwesome name='sort' size={18} color='black' />,
      onPress: () => setShowModal('sort'),
    },
    {
      title: 'Add',
      icon: <Ionicons name='person-add' size={18} color='black' />,
      onPress: () => {
        router.push('/addStudent');
      },
    },
  ];

  return (
    <View style={styles.optionsContainer}>
      <View
        style={{
          width: width * 0.95,
          alignSelf: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        {options.map((option, index) => (
          <OptionButton key={index} {...option} />
        ))}
      </View>

      <SortModal
        showModal={showModal === 'sort'}
        setShowModal={() => setShowModal('')}
        initObject={sortOption}
        setSortOption={setSortOption}
      />

      <FilterModal
        showModal={showModal === 'filter'}
        setShowModal={() => setShowModal('')}
        initFilterOptions={filterOption}
        setFilterOptions={setFilterOption}
      />
    </View>
  );
};

export default OptionsContainer;

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 10,
  },
});
