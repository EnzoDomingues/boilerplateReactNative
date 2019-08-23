/* eslint-disable import/prefer-default-export */
import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';

export const GenericButtonComponent = ({
  buttonColor,
  textColor,
  text,
  onPress,
  loading,
  loadingOrange,
  disabled,
  boderColor
}) => (
  <TouchableOpacity
    onPress={disabled !== undefined ? (!!disabled ? null : onPress) : onPress}
    style={[
      styles.button,
      {
        backgroundColor:
          disabled !== undefined
            ? !!disabled
              ? colors.veryLightPink
              : buttonColor
            : buttonColor,
        borderWidth: boderColor && 1,
        borderColor: boderColor
      }
    ]}
    disabled={
      loading === undefined
        ? disabled !== undefined
          ? disabled
          : false
        : loading
    }
  >
    {!loading && (
      <GenericTextComponent
        styleguideItem={GenericTextComponent.StyleguideItem.BUTTON}
        color={
          disabled !== undefined
            ? !!disabled
              ? colors.white
              : textColor
            : textColor
        }
        text={text}
        textAlign="center"
      />
    )}
    {!!loading && (
      <ActivityIndicator size="small" color={colors.blackAlpha50} />
    )}
  </TouchableOpacity>
);

GenericButtonComponent.defaultProps = {
  buttonColor: colors.pumpkinOrange,
  textColor: colors.white,
  text: '',
  loading: false
};

GenericButtonComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingOrange: PropTypes.bool,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width / 2.4,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  loadingIcon: {
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
