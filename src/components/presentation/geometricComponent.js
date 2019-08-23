/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';
import { GenericTextComponent } from '.'
import { verticalScale, horizontalScale } from 'memenet/src/commons/scaling';


const StyleguideItem = {
    HOME: 'HOME',
    DEFAULT: 'DEFAULT',
    MOBILEDEALER: 'HOMOBILEDEALERME'
}

export const GeometricComponent = ({
    // Reference to: https://app.zeplin.io/project/5c9a46bf85fb707808eaedc7/styleguide
    styleguideItem,
    title,
    titleColor,
    innerSubtitle,
    subtitle,
    borderColor,
    width,
    onPress,
    disabled,
    isRounded,
    img
}) => {

    return <TouchableOpacity style={[{
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    }, !!disabled && { opacity: 0.3 }
    ]}
        onPress={onPress}
        disabled={disabled}
    >

        <View style={[{
            width: width,
            aspectRatio: 1,
            borderWidth: 1,
            borderRadius: isRounded ? width / 2 : 16,
            borderColor: borderColor,
            alignItems: styleguideItem == StyleguideItem.HOME ? 'flex-start' : 'center',
            justifyContent: styleguideItem == StyleguideItem.HOME ? 'flex-end' : 'center',
        }, !!(styleguideItem == StyleguideItem.HOME) && {
            paddingBottom: verticalScale(14),
            paddingLeft: horizontalScale(5),
            paddingRight: horizontalScale(5)
        }
        ]}
        >
            {styleguideItem == StyleguideItem.MOBILEDEALER ?
                <Image source={{ uri: img }} style={styles.img} /> :
                <GenericTextComponent
                    text={title}
                    color={titleColor}
                    styleguideItem={styleguideItem == StyleguideItem.HOME ? GenericTextComponent.StyleguideItem.DEFAULT : GenericTextComponent.StyleguideItem.HEADING}
                />
            }
            {!!innerSubtitle &&
                <GenericTextComponent
                    text={innerSubtitle}
                    color={colors.blackAlpha50}
                    styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                />
            }
        </View>

        {!!subtitle &&
            <View style={{ marginTop: 10 }} >
                <GenericTextComponent
                    styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                    text={subtitle}
                />
            </View>
        }
    </TouchableOpacity>
};

GeometricComponent.StyleguideItem = StyleguideItem;


GeometricComponent.defaultProps = {
    styleguideItem: StyleguideItem.DEFAULT,
    title: '',
    subtitle: '',
    innerSubtitle: '',
    titleColor: colors.pumpkinOrange,
    borderColor: colors.pumpkinOrange,
    width: 145,
    //   width: horizontalScale(131),
    disabled: false,
    isRounded: false
};

GeometricComponent.propTypes = {
    styleguideItem: PropTypes.oneOf(Object.keys(StyleguideItem)),
    title: PropTypes.string.isRequired,
    titleColor: PropTypes.string,
    innerSubtitle: PropTypes.string,
    subtitle: PropTypes.string,
    borderColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
    isRounded: PropTypes.bool
};

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 64,
        marginVertical: verticalScale(35)
    }
})