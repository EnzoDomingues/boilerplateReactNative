/* eslint-disable import/prefer-default-export */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';
import { fontScale } from 'memenet/src/commons/scaling';

const StyleguideItem = {
  HEADINGXL: 'HEADINGXL',
  HEADINGL: 'HEADINGL',
  TEXTSTYLE: 'TEXTSTYLE',
  HEADING: 'HEADING',
  BODY: 'BODY',
  BUTTON: 'BUTTON',
  LINK: 'LINK',
  DEFAULT: 'DEFAULT',
  TINY: 'TINY'
};

export const GenericTextComponent = ({
  styleguideItem,
  text,
  color,
  opacity,
  textAlign,
  marginTop,
  marginBottom,
  numberOfLines,
  strike
}) => {
  let currentStyle;

  switch (styleguideItem) {
    case StyleguideItem.HEADINGXL:
      currentStyle = styles.headingXL;
      break;
    case StyleguideItem.HEADINGL:
    case StyleguideItem.TEXTSTYLE:
      currentStyle = styles.headingLtextStyle;
      break;
    case StyleguideItem.HEADING:
      currentStyle = styles.heading;
      break;
    case StyleguideItem.BODY:
      currentStyle = styles.body;
      break;
    case StyleguideItem.BUTTON:
      currentStyle = styles.button;
      break;
    case StyleguideItem.LINK:
      currentStyle = styles.link;
      break;
    case StyleguideItem.TINY:
      currentStyle = styles.tiny;
      break;
    default:
      currentStyle = styles.default;
      break;
  }

  return (
    <Text
      style={[
        currentStyle,
        {
          opacity: opacity,
          color: color,
          textAlign: textAlign,
          marginTop: marginTop,
          marginBottom: marginBottom
        },
        !!strike && styles.strike
      ]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};

GenericTextComponent.defaultProps = {
  styleguideItem: StyleguideItem.DEFAULT,
  text: '',
  color: colors.black,
  opacity: 1,
  textAlign: 'left',
  marginTop: 0,
  marginBottom: 0,
  numberOfLines: 999,
  strike: false
};

GenericTextComponent.propTypes = {
  styleguideItem: PropTypes.oneOf(Object.keys(StyleguideItem)),
  text: PropTypes.string.isRequired,
  opacity: PropTypes.number,
  textAlign: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  numberOfLines: PropTypes.number,
  strike: PropTypes.bool
};

GenericTextComponent.StyleguideItem = StyleguideItem;

const styles = StyleSheet.create({
  headingXL: {
    fontSize: fontScale(40),
    fontFamily: 'Lato-Black'
  },
  headingLtextStyle: {
    fontSize: fontScale(30),
    fontFamily: 'Lato-Black'
  },
  heading: {
    fontSize: fontScale(18),
    fontFamily: 'Lato-Bold'
  },
  body: {
    fontSize: fontScale(24),
    fontFamily: 'Lato-Regular'
  },
  default: {
    fontSize: fontScale(14),
    fontFamily: 'Lato-Regular'
  },
  button: {
    fontSize: fontScale(14),
    fontFamily: 'Lato-Black'
  },
  link: {
    fontSize: fontScale(14),
    fontFamily: 'Lato-Bold'
  },
  tiny: {
    fontSize: fontScale(12),
    fontFamily: 'Lato-Regular'
  },
  strike: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
});
