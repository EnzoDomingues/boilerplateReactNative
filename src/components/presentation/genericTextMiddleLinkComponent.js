/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';
import { fontScale } from 'memenet/src/commons/scaling';

export const GenericTextMiddleLinkComponent = props => {
  const { text, linkText, linkPress, style } = props;
  const beforeText = text.substring(0, text.indexOf(linkText));
  const afterText = text.substring(text.indexOf(linkText) + linkText.length);
  return (
    <Text style={[style, styles(props).text]}>
      {beforeText}
      <Text
        style={[styles(props).link, styles(props).text]}
        onPress={linkPress}
      >
        {linkText}{' '}
      </Text>
      {afterText}
    </Text>
  );
};

GenericTextMiddleLinkComponent.defaultProps = {
  linkColor: colors.orangeYellow,
  hasUnderline: true,
  style: {}
};

GenericTextMiddleLinkComponent.propTypes = {
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkPress: PropTypes.func.isRequired,
  linkColor: PropTypes.string,
  hasUnderline: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any)
};

const styles = props =>
  StyleSheet.create({
    link: {
      color: props.linkColor,
      textDecorationLine: props.hasUnderline ? 'underline' : 'none',
      textDecorationColor: props.linkColor
    },
    text: {
      fontSize: fontScale(14),
      fontFamily: 'Inter-Regular'
    }
  });
