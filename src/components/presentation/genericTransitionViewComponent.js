import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { verticalScale } from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import PropTypes from 'prop-types';
import { GenericTextComponent } from './genericTextComponent';

export const GenericTransitionViewComponent = ({
    title,
    subtitle
}) => (
        <View style={styles.container}>
            <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.HEADINGL}
                color={colors.white}
                text={title} />
            <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.BODY}
                color={colors.white}
                marginTop={verticalScale(10)}
                text={subtitle} />
        </View>
    );

GenericTransitionViewComponent.defaultProps = {
    title: '',
    subtitle: ''
};

GenericTransitionViewComponent.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.pumpkinOrange,
        paddingTop: verticalScale(109)
    }
});
