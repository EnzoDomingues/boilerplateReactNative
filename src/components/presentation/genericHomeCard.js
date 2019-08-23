/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
    View,
    StyleSheet,
    Platform
} from 'react-native';
import { horizontalScale, verticalScale } from 'memenet/src/commons/scaling';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';
import { GenericTextComponent } from '.';
import FadeComponent from '../container/animations/fadeComponent';
import { formatThousands } from 'memenet/src/commons/utils';
import { TextLinkButtonComponent } from './textLinkButtonComponent';

const StyleguideItem = {
    WHITE: 'WHITE',
    ORANGE: 'ORANGE',
}


export const GenericHomeCard = ({
    dotzBalance,
    componentWidth,
    componentHeight,
    linkPress,
    styleguideItem,
    children,
    onSecondButtonPress
}) => {
    switch (styleguideItem) {
        case StyleguideItem.ORANGE:
            return <View style={[styles.orangeCard, { width: componentWidth, height: componentHeight }]}>
                {children}
            </View>

        case StyleguideItem.WHITE:
            return <View style={[styles.card, { width: componentWidth, height: componentHeight }]}>
                {children}
            </View>

    };
}

const HORIZONTAL_ITEM_WIDTH = Platform.OS === 'ios'
    ? horizontalScale(312)
    : horizontalScale(312);

const VERTICAL_ITEM_HEIGTH = Platform.OS === 'ios'
    ? verticalScale(303)
    : verticalScale(303);

GenericHomeCard.defaultProps = {
    dotzBalance: 0,
    componentWidth: HORIZONTAL_ITEM_WIDTH,
    componentHeight: VERTICAL_ITEM_HEIGTH,
    styleguideItem: StyleguideItem.WHITE,

};

GenericHomeCard.propTypes = {
    dotzBalance: PropTypes.number,
    styleguideItem: PropTypes.oneOf(Object.keys(StyleguideItem))
};

GenericHomeCard.StyleguideItem = StyleguideItem;

const styles = StyleSheet.create({
    card: {
        //    marginRight: horizontalScale(16),
        padding: horizontalScale(32),
        backgroundColor: colors.white,
        borderRadius: 8,
        alignSelf: 'center'
    },
    orangeCard: {
        padding: horizontalScale(32),
        backgroundColor: colors.orangeYellow,
        borderRadius: 8,
        alignSelf: 'center'
    },
    loading: {
        width: 64,
        height: 22
    },
});