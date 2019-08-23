import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  verticalScale,
  fontScale,
  horizontalScale
} from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import PropTypes from 'prop-types';
import {
  GenericTextComponent,
  TextLinkButtonComponent
} from 'memenet/src/components/presentation';
import Icon from 'memenet/src/commons/icon';


export const GenericListItemComponent = ({
  title,
  subtitle,
  subtitleColor,
  icon,
  padded,
  linkText,
  linkPress,
  onPress,
  addSeparator,
  isTitleBold,
  paddedSeparator,
  hasUnderline,
  showRightIcon,
  isDisable,
  card,
  colorIcon,
  colorArrow
}) => (
    <View>
      <TouchableOpacity
        style={
          isDisable
            ? [
              styles.container,
              styles.disable,
              {
                paddingRight: !padded
                  ? 0
                  : !!linkText && !!linkPress
                    ? horizontalScale(32)
                    : horizontalScale(16),
                paddingLeft: !padded ? 0 : horizontalScale(32)
              }
            ]
            : [
              styles.container,
              {
                paddingRight: !padded
                  ? 0
                  : !!linkText && !!linkPress
                    ? horizontalScale(32)
                    : horizontalScale(16),
                paddingLeft: !padded ? 0 : horizontalScale(32)
              }
            ]
        }
        disabled={isDisable}
        onPress={onPress}
      >
        {!!icon && (
          <View style={styles.firstChildContainer}>
            <Icon name={icon} size={fontScale(40)} color={colorIcon ? colorIcon : colors.pumpkinOrange} />
          </View>
        )}
        <View
          style={[
            styles.secondChildContainer,
            {
              flex: !!linkText && !!linkPress ? 0.5 : !!icon ? 0.6 : 0.8
            }
          ]}
        >
          <View>
            <GenericTextComponent
              styleguideItem={
                isTitleBold
                  ? GenericTextComponent.StyleguideItem.HEADING
                  : GenericTextComponent.StyleguideItem.DEFAULT
              }
              color={card ? colors.pumpkinOrange : colors.midnightBlack}
              numberOfLines={1}
              text={title}
            />
            {card && <View style={styles.underline} />}
          </View>
          {!!subtitle && (
            <GenericTextComponent
              color={subtitleColor ? subtitleColor : colors.midnightBlack50}
              marginTop={verticalScale(5)}
              text={subtitle}
              numberOfLines={1}
            />
          )}
        </View>
        <View
          style={[
            styles.thirdChildContainer,
            { flex: !!linkText && !!linkPress ? 0.5 : 0.2 }
          ]}
        >
          {!!linkText && !!linkPress ? (
            <View>
              <TextLinkButtonComponent
                styleguideItem={
                  card
                    ? GenericTextComponent.StyleguideItem.BODY
                    : GenericTextComponent.StyleguideItem.DEFAULT
                }
                text={linkText}
                color={card ? colors.midnightBlack : colors.pumpkinOrange}
                onPress={linkPress}
              />
              {!!hasUnderline && <View style={styles.underline} />}
            </View>
          ) : (
              <Icon
                name="Arrow-Right"
                size={fontScale(40)}
                color={colorArrow ? colorArrow : colors.pumpkinOrange}
                style={{ opacity: !!showRightIcon ? 1 : 0 }}
              />
            )}
        </View>
      </TouchableOpacity>
      {!!addSeparator && (
        <View
          style={[
            styles.separator,
            {
              marginLeft: !paddedSeparator ? 0 : horizontalScale(32),
              marginRight: !paddedSeparator ? 0 : horizontalScale(32)
            }
          ]}
        />
      )}
    </View>
  );

GenericListItemComponent.defaultProps = {
  padded: true,
  paddedSeparator: false,
  isTitleBold: true,
  hasUnderline: false,
  showRightIcon: true
};

GenericListItemComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleColor: PropTypes.string,
  icon: PropTypes.string,
  padded: PropTypes.bool,
  linkText: PropTypes.string,
  linkPress: PropTypes.func,
  onPress: PropTypes.func,
  isTitleBold: PropTypes.bool,
  isDisable: PropTypes.bool,
  card: PropTypes.bool,
  colorArrow: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: verticalScale(16),
    paddingTop: verticalScale(16),
    paddingLeft: horizontalScale(32)
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blackAlpha12
  },
  firstChildContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 0.2
  },
  secondChildContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  thirdChildContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  underline: {
    height: 1,
    marginTop: verticalScale(5),
    backgroundColor: colors.pumpkinOrangeAlpha30
  },
  disable: {
    opacity: 0.3
  }
});
