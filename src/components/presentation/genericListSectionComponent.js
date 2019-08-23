/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';
import { horizontalScale, verticalScale } from 'memenet/src/commons/scaling';
import { GenericTextComponent } from './'

export const GenericListSectionComponent = ({
    // Reference to: https://app.zeplin.io/project/5c9a46bf85fb707808eaedc7/styleguide
    subtitle,
    color,
    opacity,
    textAlign,
    styleguideItem,
    sectionBorderTop,
    title,
    childContent,
    //   StyleguideItem 
}) => {

    return <View style={
        !!sectionBorderTop && { borderTopWidth: verticalScale(8), borderTopColor: colors.blackAlpha05, paddingBottom: verticalScale(32) }
    }>
        {!!title &&
            <View style={styles.default}>
                <GenericTextComponent
                    styleguideItem={styleguideItem}
                    text={title}
                    color={color}
                    opacity={opacity}
                    textAlign={textAlign}
                />

                {subtitle ? <View style={subtitle && { marginTop: 10, }}>
                    <GenericTextComponent
                        styleguideItem={GenericTextComponent.StyleguideItem.BODY}
                        text={subtitle}
                    />
                </View> : <View />}

            </View>
        }

        {childContent}
    </View>
};

GenericListSectionComponent.defaultProps = {
    styleguideItem: GenericTextComponent.StyleguideItem.BODY,
    title: '',
    subtitle: '',
    textAlign: 'left',
};

GenericListSectionComponent.propTypes = {
    styleguideItem: PropTypes.oneOf(Object.keys(GenericTextComponent.StyleguideItem)),
    subtitle: PropTypes.string,
    title: PropTypes.string,
    textAlign: PropTypes.string,
    childContent: PropTypes.any,
};

const styles = StyleSheet.create({
    default: {
        paddingHorizontal: horizontalScale(32),
        paddingVertical: verticalScale(32)
    }
});
