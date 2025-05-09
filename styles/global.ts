import colors from '@/constants/colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
  },
  contentContainer: {
    width: width * 0.95,
    marginHorizontal: 'auto',
  },
  bodyContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  blackBoldText: {
    fontSize: 20,
    fontFamily: 'ManropeBold',
    color: '#000',
  },
  extraBoldWhiteText: {
    fontSize: 20,
    color: '#fff',

    fontFamily: 'ManropeExtraBold',
  },
});
