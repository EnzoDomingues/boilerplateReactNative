import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  ScrollView
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'memenet/src/commons/icon';
import colors from 'memenet/src/commons/colors';

const { width, height } = Dimensions.get('window');

const MT = Platform.OS === 'android' ? StatusBar.currentHeight : 20;

export const ModalGenericComponent = (props) => {
  const {
    typeAnimation,
    isTransparent,
    isOpacity,
    isVisible,
    onClose,
    mTop,
    children,
    paddingScroll,
  } = props;

  const topSpace = MT + mTop;
  const styleOpacity = isOpacity ? { flex: 1, backgroundColor: '#00000080' } : { flex: 1 };

  return (
    <View style={styles.container}>
      <Modal
        animationType={typeAnimation}
        transparent={isTransparent}
        visible={isVisible}
        onRequestClose={() => onClose()}
        style={{
          height: height - topSpace,
          marginTop: topSpace,
          backgroundColor: colors.pumpkinRed,
          borderWidth: 6,
        }}
      >
        <View style={styleOpacity}>
          <View style={[styles.iconClose, { top: topSpace + 12 }]}>
            <TouchableOpacity onPress={() => onClose()}>
              <Icon name="Fechar" color={colors.brownGrey} size={40} />
            </TouchableOpacity>
          </View>
          <ScrollView style={[styles.scrollContainer, { padding: paddingScroll, marginTop: topSpace }]}>
            {children}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

ModalGenericComponent.defaultProps = {
  typeAnimation: 'slide',
  isTransparent: false,
  isVisible: false,
};

ModalGenericComponent.propTypes = {
  styleProp: PropTypes.object,
  typeAnimation: PropTypes.string,
  isTransparent: PropTypes.bool,
  isVisible: PropTypes.bool,
  isOpacity: PropTypes.bool,
  buttonsModal: PropTypes.bool,
  onClose: PropTypes.func,
  titleFirstButton: PropTypes.string,
  titleSecondButton: PropTypes.string,
  onPressFirstButton: PropTypes.func,
  onPressSecondButton: PropTypes.func,
  mTop: PropTypes.number,
  paddingScroll: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  scrollContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.white,
    height: 'auto',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  iconClose: {
    zIndex: 2,
    position: 'absolute',
    right: 12,
  },
  touchableAction: {
    height: 64,
    width: width - 64,
    borderRadius: 8,
    justifyContent: 'center',
  }
});

export default ModalGenericComponent;
