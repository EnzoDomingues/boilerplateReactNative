/* eslint-disable import/prefer-default-export */
import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { verticalScale, horizontalScale } from 'memenet/src/commons/scaling'
import colors from 'memenet/src/commons/colors'
import { GenericTextComponent } from './genericTextComponent'
import { TextLinkButtonComponent } from './textLinkButtonComponent'
import { GenericButtonComponent } from './genericButtonComponent'

export const GenericModalInfoContainerComponent = ({
    title,
    text,
    linkText,
    linkPress,
    buttonText,
    onPress,
    loading,
    card,
}) => (
        <View style={styles.container}>
            <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
                color={colors.midnightBlack}
                text={title}
            />
            <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.BODY}
                color={colors.midnightBlack50}
                marginTop={verticalScale(10)}
                marginBottom={Platform.OS == 'ios' ? verticalScale(70) : verticalScale(40)}
                text={text}
            />
            {!!linkPress && !!linkText && (
                !!loading ?
                    <ActivityIndicator size="small" color={colors.blackAlpha50} />
                    : <TextLinkButtonComponent
                        styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
                        color={colors.pumpkinOrange}
                        text={linkText}
                        onPress={linkPress}
                    />
            )}
            {!!onPress && !!buttonText && <GenericButtonComponent
                buttonColor={colors.pumpkinOrange}
                textColor={colors.white}
                text={buttonText}
                onPress={onPress}
            />}
        </View >
    )

const styles = StyleSheet.create({
    container: {
        paddingVertical: verticalScale(64),
        paddingHorizontal: horizontalScale(32)
    },
    loadingIcon: {
        width: 80,
        height: 28,
        justifyContent: 'center',
        alignSelf: 'flex-start',
    }
})