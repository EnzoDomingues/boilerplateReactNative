/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native';
import { GenericTextComponent } from './genericTextComponent';
import Icon from 'memenet/src/commons/icon';
import { fontScale } from 'memenet/src/commons/scaling';

export const TextLinkButtonComponent = ({
  styleguideItem,
  text,
  color,
  opacity,
  textAlign,
  onPress,
  style,
  numberOfLines,
  arrowRight,
  loading,
  loadingWhite,
  icon
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View
        style={
          !!icon && {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }
      >
        {!!icon && <Icon name={icon} size={fontScale(40)} color={color} />}
        {!loading && (
          <GenericTextComponent
            styleguideItem={styleguideItem}
            text={text}
            color={color}
            numberOfLines={numberOfLines}
            opacity={opacity}
            textAlign={textAlign}
          />
        )}
      </View>
      {!!arrowRight && (
        <Icon name="Arrow-Right" size={fontScale(40)} color={color} />
      )}
      {!!loading && (
        <ActivityIndicator size="small" color={colors.blackAlpha50} />
      )}
    </TouchableOpacity>
  );
};

TextLinkButtonComponent.defaultProps = {
  styleguideItem: GenericTextComponent.StyleguideItem.BODY,
  text: '',
  color: colors.black,
  opacity: 1,
  textAlign: 'left',
  style: {},
  arrowRight: false,
  loading: false
};

TextLinkButtonComponent.propTypes = {
  styleguideItem: PropTypes.oneOf(
    Object.keys(GenericTextComponent.StyleguideItem)
  ),
  text: PropTypes.string.isRequired,
  opacity: PropTypes.number,
  style: PropTypes.object,
  onPress: PropTypes.func,
  arrowRight: PropTypes.bool,
  icon: PropTypes.string
};

const styles = StyleSheet.create({
  loadingIcon: {
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
