/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
    View,
    StatusBar,
    Platform,
    StyleSheet
} from 'react-native';
import { verticalScale } from 'memenet/src/commons/scaling';
import PropTypes from 'prop-types';
import colors from 'memenet/src/commons/colors';

export const CustomStatusBar = ({ headerColor }) => (
    <View style={[styles.container, { backgroundColor: headerColor }]}>
        <StatusBar
            backgroundColor={headerColor}
            barStyle="light-content"
        />
    </View >
);

CustomStatusBar.defaultProps = {
    headerColor: colors.pumpkinOrange
};

CustomStatusBar.propTypes = {
    headerColor: PropTypes.string,
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Platform.OS === 'ios' ? verticalScale(50) : StatusBar.currentHeight,
    }
});
