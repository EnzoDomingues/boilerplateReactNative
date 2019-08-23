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

export const GenericModalComponent = (props) => {
  const {
    isVisible,
    onClose,
    distanceFromTop,
    children,
    colorModal
  } = props;

  const topSpace = MT + distanceFromTop;

  return (
    <View style={styles.container}>
      <Modal
        animationType={'slide'}
        transparent
        visible={isVisible}
        onRequestClose={() => onClose()}
        style={{
          height: height - topSpace,
          marginTop: topSpace,
          backgroundColor: colors.pumpkinRed,
          borderWidth: 6,
        }}
      >
        <View style={styles.styleOpacity}>
          <View style={[styles.iconClose, { top: topSpace + 12 }]}>
            {onClose && (
              <TouchableOpacity onPress={() => onClose()}>
                <Icon name="Fechar" color={colors.brownGrey} size={40} />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView style={[styles.scrollContainer, { marginTop: topSpace, backgroundColor: colorModal }]}>
            {children}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

GenericModalComponent.defaultProps = {
  isVisible: false,
  colorModal: colors.white
};

GenericModalComponent.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  distanceFromTop: PropTypes.number,
  children: PropTypes.func,
  colorModal: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  scrollContainer: {
    position: 'relative',
    flex: 1,
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
  },
  styleOpacity: {
    flex: 1,
    backgroundColor: colors.midnightBlack50
  }
});

export default GenericModalComponent;
