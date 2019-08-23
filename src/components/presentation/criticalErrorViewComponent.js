/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { GenericTextComponent, TextLinkButtonComponent } from 'memenet/src/components/presentation';
import { verticalScale, horizontalScale } from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';

export const CriticalErrorViewComponent = ({
    titleText,
    contentText,
    buttonText,
    onPress
}) => (
        <View>
            <View style={styles.container}>
                <GenericTextComponent
                    styleguideItem={GenericTextComponent.StyleguideItem.HEADINGL}
                    color={colors.inkBlue}
                    text={'Poxa :('}
                />
                <GenericTextComponent
                    styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
                    color={colors.black}
                    text={titleText}
                    marginTop={verticalScale(109)}
                />
                <GenericTextComponent
                    styleguideItem={GenericTextComponent.StyleguideItem.BODY}
                    color={colors.black}
                    opacity={.5}
                    text={contentText}
                    marginTop={verticalScale(8)}
                />
                <View style={styles.buttonContainer}>
                    {!!buttonText && !!onPress && <TextLinkButtonComponent
                        styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
                        color={colors.inkBlue}
                        text={buttonText}
                        onPress={onPress}
                    />}
                </View>
            </View>
        </View>
    );

const styles = StyleSheet.create({
    container: {
        paddingLeft: horizontalScale(32),
        paddingRight: horizontalScale(32)
    },
    buttonContainer: {
        marginTop: verticalScale(109)
    }
});
