import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '@/constants/colors';
import OptionsContainer from '@/modules/home/components/OptionsContainer';
import TopHomeContainer from '@/modules/home/components/TopHomeContainer';
import { globalStyles } from '@/styles/global';

import { FilterValueOptions } from '@/modules/home/components/FilterModal';
import { SortValueOptions } from '@/modules/home/components/SortModal';
import { getItem } from '@/utils/AsyncStorage';

import NumberContainer from '@/modules/home/components/NumberContainer';
import SearchContainer from '@/modules/home/components/SearchContainer';
import StudentList from '@/modules/home/components/StudentList';
import { useFocusEffect } from '@react-navigation/native';

type Props = {};

const { width } = Dimensions.get('window');

const index = (props: Props) => {
  const [sortOption, setSortOption] = useState<{
    sortBy: SortValueOptions;
    sortInAscendingOrder: boolean;
  } | null>(null);
  const [filterOption, setFilterOption] = useState<FilterValueOptions | null>(
    null
  );
  const [numberOfStudents, setNumberOfStudents] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showSearchContainer, setShowSearchContainer] = useState(false);

  const fetchSortOption = async () => {
    const [sortOption, filterOption] = await Promise.all([
      getItem('sortOption'),
      getItem('filterOption'),
    ]);

    if (sortOption) {
      setSortOption(sortOption);
    } else {
      setSortOption({
        sortBy: 'name',
        sortInAscendingOrder: true,
      });
    }

    if (filterOption) {
      setFilterOption(filterOption);
    } else {
      setFilterOption({
        enrolled: false,
        graduated: false,
        alumni: false,
      });
    }
  };

  useEffect(() => {
    fetchSortOption();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSortOption();
    }, [])
  );

  return (
    <SafeAreaView
      style={globalStyles.container}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style='light' />
      <TopHomeContainer
        onShowSearchContainer={() => setShowSearchContainer(true)}
      />
      {numberOfStudents && numberOfStudents > 0 ? (
        <NumberContainer numberOfStudents={numberOfStudents} />
      ) : null}

      {showSearchContainer && (
        <SearchContainer
          onSearchValueChange={(text) => {
            setSearchValue(text);
          }}
          onClose={() => {
            setShowSearchContainer(false);
            setSearchValue('');
          }}
        />
      )}

      {sortOption === null || filterOption === null ? (
        <View
          style={[
            globalStyles.bodyContainer,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ActivityIndicator size={'large'} color={colors.brand} />
        </View>
      ) : (
        <>
          <OptionsContainer
            setSortOption={(sortOption) => {
              setSortOption(sortOption);
            }}
            sortOption={sortOption}
            filterOption={filterOption}
            setFilterOption={(filterOption) => {
              setFilterOption(filterOption);
            }}
          />

          <View style={globalStyles.bodyContainer}>
            <StudentList
              sortOption={sortOption}
              filterOption={filterOption}
              onGetNumberOfStudents={(number) => {
                setNumberOfStudents(number);
              }}
              searchValue={searchValue}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
