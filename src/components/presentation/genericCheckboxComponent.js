import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'memenet/src/commons/icon';
import colors from 'memenet/src/commons/colors';
import { GenericTextMiddleLinkComponent, GenericTextComponent } from 'memenet/src/components/presentation';
import { horizontalScale } from 'memenet/src/commons/scaling';

export const GenericCheckboxComponent = ({
    text,
    isChecked,
    onPress,
    color,
    linkText,
    linkPress,
    linkColor,
    hasUnderline,
    style
}) => (
        <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
            <View style={styles.cbx}>
                {isChecked && <Icon
                    name="Check"
                    color={colors.pumpkinOrange}
                    size={32}
                />}
            </View>
            <View style={{ alignSelf: 'center' }}>
                {!!linkText ? (
                    <GenericTextMiddleLinkComponent
                        style={{ color }}
                        text={text}
                        linkText={linkText}
                        linkPress={linkPress}
                        linkColor={linkColor}
                        hasUnderline={hasUnderline}
                    />
                ) : <GenericTextComponent text={text} color={color} />
                }
            </View>
        </TouchableOpacity>
    )

GenericCheckboxComponent.defaultProps = {
    color: colors.black,
    linkColor: colors.orangeYellow,
    hasUnderline: false,
    style: {}
}

GenericCheckboxComponent.propTypes = {
    text: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    linkText: PropTypes.string,
    linkPress: PropTypes.func,
    linkColor: PropTypes.string,
    hasUnderline: PropTypes.bool,
    style: PropTypes.objectOf(PropTypes.any)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: horizontalScale(32)
    },
    cbx: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.orangeYellow,
        width: horizontalScale(40),
        height: horizontalScale(40),
        borderRadius: 6,
        marginRight: horizontalScale(16)
    }
})
