import React from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';

type Props = {
  showModal: boolean;
  setshowModal: any;
  children: React.ReactNode;
};

const ModalContainer = ({ setshowModal, showModal, children }: Props) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setshowModal();
      }}
    >
      <SafeAreaView style={styles.centeredView}>
        <Pressable onPress={() => setshowModal()} style={styles.backdrop}>
          <View style={styles.backdrop} />
        </Pressable>

        <View style={styles.modalView}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 30,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
