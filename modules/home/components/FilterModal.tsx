import ModalContainer from '@/modules/general/ModalContainer';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '@/constants/colors';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { setItem } from '@/utils/AsyncStorage';
import ModalTopContentContainer from './ModalTopContentContainer';

type Props = {
  showModal: boolean;
  setShowModal: any;
  initFilterOptions: FilterValueOptions;
  setFilterOptions: (filterOptions: FilterValueOptions) => void;
};

export type FilterValueOptions = {
  enrolled: boolean;
  graduated: boolean;
  alumni: boolean;
};

const FilterModal = ({
  setShowModal,
  showModal,
  initFilterOptions,
  setFilterOptions,
}: Props) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <ModalContainer setshowModal={setShowModal} showModal={showModal}>
      <ModalTopContentContainer setShowModal={setShowModal} title='Filter' />

      {Object.entries(initFilterOptions).map(([key, value]) => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}
          key={key}
        >
          <BouncyCheckbox
            key={key}
            size={24}
            fillColor={colors.brand}
            unFillColor='#FFFFFF'
            text={capitalizeFirstLetter(key)}
            iconStyle={{ borderColor: colors.brand }}
            innerIconStyle={{ borderWidth: 2 }}
            isChecked={value}
            textStyle={{ textDecorationLine: 'none' }}
            onPress={(isChecked: boolean) => {
              const updatedOptions = {
                ...initFilterOptions,
                [key]: isChecked,
              };

              setFilterOptions(updatedOptions);
              setItem('filterOption', updatedOptions);
            }}
          />
        </View>
      ))}
    </ModalContainer>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
