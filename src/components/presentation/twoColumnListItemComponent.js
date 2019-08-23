import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  horizontalScale,
  verticalScale,
  fontScale
} from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import PropTypes from 'prop-types';
import {
  GenericTextComponent,
  TextLinkButtonComponent
} from 'memenet/src/components/presentation';
import Icon from 'memenet/src/commons/icon';


export const TwoColumnListItemComponent = ({
  titleText,
  valueText,
  alignValueTextToLeft,
  valueTextMoreSpace,
  showArrow,
  onPress,
  linkText,
  linkIcon,
  sizeIcon,
  linkPress,
  addSeparator
}) => (
    <View>
      <TouchableOpacity
        style={styles.container}
        disabled={!onPress}
        onPress={onPress}
      >
        <View
          style={[
            styles.firstChildContainer,
            {
              flex:
                !!linkText && !!linkPress
                  ? 0.2
                  : !!alignValueTextToLeft
                    ? 0.15
                    : !!valueTextMoreSpace
                      ? 0.6
                      : 0.4
            }
          ]}
        >
          <GenericTextComponent color={colors.blackAlpha50} text={titleText} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex:
              !!valueTextMoreSpace ?
                (!linkText && !linkPress && !linkIcon ? 0.4 : 0.2)
                : !!linkText && !!linkPress
                  ? 0.6
                  : !!alignValueTextToLeft
                    ? 0.6
                    : 0.8,
            alignItems: !!alignValueTextToLeft ? 'flex-start' : 'flex-end'
          }}
        >
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
            color={colors.black}
            text={valueText}
            numberOfLines={1}
          />
        </View>
        {(!!showArrow || (!!linkIcon || (linkText && !!linkPress))) && (
          <View style={styles.thirdChildContainer}>
            {!!linkText && !!linkPress && (
              <TextLinkButtonComponent
                styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                text={linkText}
                color={colors.pumpkinOrange}
                onPress={linkPress}
              />
            )}
            {!!linkIcon && !!linkPress && (
              <Icon
                size={sizeIcon ? fontScale(sizeIcon) : fontScale(25)}
                name={linkIcon}
                color={colors.pumpkinOrange}
                onPress={linkPress}
              />
            )}
            {!!showArrow && (
              <View
                style={{
                  alignItems: 'flex-end',
                  paddingLeft: !!alignValueTextToLeft
                    ? horizontalScale(25)
                    : horizontalScale(20)
                }}
              >
                <Icon
                  name="Arrow-Right"
                  size={fontScale(40)}
                  color={colors.pumpkinOrange}
                />
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
      {!!addSeparator && <View style={styles.separator} />}
    </View>
  );

TwoColumnListItemComponent.propTypes = {
  titleText: PropTypes.string,
  valueText: PropTypes.string,
  alignValueTextToLeft: PropTypes.bool,
  showArrow: PropTypes.bool,
  onPress: PropTypes.func,
  linkIcon: PropTypes.string,
  linkText: PropTypes.string,
  linkPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: verticalScale(24),
    paddingTop: verticalScale(24)
  },
  firstChildContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  thirdChildContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 0.2
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blackAlpha12
  }
});
