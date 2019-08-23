/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { TextInputMask } from 'react-native-masked-text';
import colors from 'memenet/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';
import { fontScale, verticalScale } from 'memenet/src/commons/scaling';

export const TitleInputComponent = React.forwardRef((props, ref) => (
    <View>
        <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
            color={colors.black}
            text={props.titleText} />
        {props.type ? (
            <TextInputMask
                ref={ref}
                {...props}
                type={props.type}
                keyboardType='numeric'
                placeholder={props.placeholderText}
                placeholderTextColor={colors.blackAlpha30}
                allowFontScaling={false}
                style={styles.input}
            />
        ) : (
                <TextInput
                    ref={ref}
                    {...props}
                    placeholder={props.placeholderText}
                    placeholderTextColor={colors.blackAlpha30}
                    allowFontScaling={false}
                    style={styles.input}
                />
            )
        }
    </View>
));

TitleInputComponent.defaultProps = {
    placeholderText: '',
    titleText: '',
    type: ''
};

TitleInputComponent.propTypes = {
    placeholderText: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    type: PropTypes.string
};

const styles = StyleSheet.create({
    input: {
        fontFamily: 'Inter-Regular',
        fontSize: fontScale(18),
        marginTop: Platform.OS === "ios" ? verticalScale(8) : verticalScale(5),
        padding: 0,
        color: colors.black
    }
});
