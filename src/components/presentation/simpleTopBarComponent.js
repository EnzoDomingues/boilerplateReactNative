/* eslint-disable import/prefer-default-export */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'memenet/src/commons/icon';
import {
  horizontalScale,
  fontScale,
  verticalScale
} from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';

export const SimpleTopBarComponent = ({
  onBackButtonPress,
  onCloseButtonPress,
  titleText,

  isTransparent
}) => (
  <View
    style={[
      styles.topBarItensContainer,
      { backgroundColor: !isTransparent ? colors.pumpkinOrange : 'transparent' }
    ]}
  >
    <View style={styles.topBarItemLeftContainer}>
      {!!onBackButtonPress && (
        <TouchableOpacity style={styles.buttonBack} onPress={onBackButtonPress}>
          <Icon name="Voltar" size={fontScale(40)} color={colors.white} />
        </TouchableOpacity>
      )}
      {!!titleText && (
        <GenericTextComponent
          styleguideItem={GenericTextComponent.StyleguideItem.BODY}
          color={colors.white}
          marginTop={
            Platform.OS === 'android' ? verticalScale(5) : verticalScale(8)
          }
          text={titleText}
        />
      )}
    </View>
    <View style={styles.topBarItemRightContainer}>
      {!!onCloseButtonPress && (
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={onCloseButtonPress}
        >
          <Icon name="Fechar" size={fontScale(40)} color={colors.white} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  topBarItensContainer: {
    flex: 0,
    paddingBottom: horizontalScale(16),
    paddingLeft: horizontalScale(32),
    paddingRight: horizontalScale(32),
    flexDirection: 'row'
  },
  topBarItemLeftContainer: {
    flex: 0.66,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  topBarItemRightContainer: {
    flex: 0.33,
    alignItems: 'flex-end'
  },
  buttonBack: {
    height: 40,
    width: 40,
    marginLeft: horizontalScale(-13),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonClose: {
    height: 40,
    width: 40,
    marginRight: horizontalScale(-13),
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    marginTop: verticalScale(5),
    width: 64,
    height: 22
  }
});
