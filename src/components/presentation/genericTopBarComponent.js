/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text
} from 'react-native';
import Icon from 'memenet/src/commons/icon';
import {
  horizontalScale,
  verticalScale,
  fontScale
} from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import {
  GenericTextComponent,
  TextLinkButtonComponent
} from 'memenet/src/components/presentation';
import Store from 'memenet/src/store';
import { formatMoney, formatThousands } from 'memenet/src/commons/utils';

export const GenericTopBarComponent = ({
  onBackButtonPress,
  onCloseButtonPress,
  onSearchButtonPress,
  onFilterButtonPress,
  buttonColor,
  removeMarginTop,
  titleText,
  animatedValue,
  active,
  onLinkButtonPress,
  linkButtonText
}) => (
  <View
    style={[
      styles.topBarItensContainer,
      {
        marginTop: removeMarginTop ? verticalScale(20) : verticalScale(50)
      }
    ]}
  >
    <View style={styles.topBarItemLeftContainer}>
      {!!onBackButtonPress && (
        <TouchableOpacity style={styles.buttonBack} onPress={onBackButtonPress}>
          <Icon
            name="voltar"
            size={fontScale(40)}
            color={buttonColor ? buttonColor : colors.white}
          />
        </TouchableOpacity>
      )}
    </View>
    <Animated.View
      style={[
        styles.topBarItemCenterContainer,
        { opacity: animatedValue ? animatedValue : 1 }
      ]}
    >
      {!!titleText && (
        <GenericTextComponent
          styleguideItem={GenericTextComponent.StyleguideItem.BODY}
          color={colors.white}
          text={titleText}
        />
      )}
    </Animated.View>
    <View
      style={[
        styles.topBarItemRightContainer,
        {
          flex: !onLinkButtonPress ? 0.2 : 0.5
        }
      ]}
    >
      {!!onCloseButtonPress && (
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={onCloseButtonPress}
        >
          <Icon name="Fechar" size={fontScale(40)} color={buttonColor} />
        </TouchableOpacity>
      )}
      {!!onSearchButtonPress && (
        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={onSearchButtonPress}
        >
          <Icon name="Busca" size={fontScale(40)} color={buttonColor} />
        </TouchableOpacity>
      )}
      {!!onFilterButtonPress && (
        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={onFilterButtonPress}
        >
          <Icon name="Filtro" size={fontScale(40)} color={buttonColor} />
          {!!active && <View style={styles.buttonModalFiltered} />}
          {/*<View style={styles.buttonModal} />*/}
        </TouchableOpacity>
      )}
      {!!onLinkButtonPress && (
        <TextLinkButtonComponent
          styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
          text={linkButtonText}
          color={colors.pumpkinOrange}
          onPress={onLinkButtonPress}
        />
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  topBarItensContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 98
  },
  topBarItemCenterContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topBarItemLeftContainer: {
    flex: 0.2,
    alignItems: 'flex-start'
  },
  topBarItemRightContainer: {
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSearch: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonFilter: {
    position: 'relative',
    height: 40,
    width: 40,
    marginRight: horizontalScale(-13),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonModal: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    height: 70,
    paddingLeft: horizontalScale(10),
    paddingRight: horizontalScale(10),
    width: 70,
    borderRadius: 50,
    opacity: 0.3
  },

  buttonModalFiltered: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 14,
    top: verticalScale(6),
    right: horizontalScale(4),
    backgroundColor: colors.white,
    zIndex: 10
  },

  loading: {
    width: 64,
    height: 22
  }
});
