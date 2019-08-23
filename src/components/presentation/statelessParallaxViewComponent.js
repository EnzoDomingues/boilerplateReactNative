import React from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import colors from 'memenet/src/commons/colors';
import { horizontalScale, verticalScale } from 'memenet/src/commons/scaling';
import PropTypes from 'prop-types';
import { CustomStatusBar, TopBarComponent } from 'memenet/src/components/presentation';

const SCROLL_HEIGHT = verticalScale(70)

const HEADERMAXHEIGHT = verticalScale(160);
const PARALLAXHEIGHT = verticalScale(80);

export const StatelessParallaxViewComponent = ({
    onBackButtonPress,
    onCloseButtonPress,
    onSearchButtonPress,
    onFilterButtonPress,
    activeFilter,
    topBarTitleText,
    headerContent,
    childContent,
    headerColor,
    isFlex,
    treatFinancialBalanceOnTopBarTitle,
    treatDotzBalanceOnTopBarTitle,
    maxHeight,
    scrollHeight
}) => {

    let nScroll = new Animated.Value(0);
    let scroll = new Animated.Value(0);

    nScroll.addListener(Animated.event([{ value: scroll }], { useNativeDriver: false }));

    const textOpacity = nScroll.interpolate({
        inputRange: [0, scrollHeight ? scrollHeight : SCROLL_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    const reverseTextOpacity = nScroll.interpolate({
        inputRange: [0, scrollHeight ? scrollHeight : SCROLL_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    return (
        <View style={styles.container}>
            <CustomStatusBar />
            <View style={styles.topBarContainer}>
                <TopBarComponent
                    topBarType={TopBarComponent.TopBarType.GENERICTOPBAR}
                    onBackButtonPress={onBackButtonPress}
                    onCloseButtonPress={onCloseButtonPress}
                    onSearchButtonPress={onSearchButtonPress}
                    onFilterButtonPress={onFilterButtonPress}
                    activeFilter={activeFilter}
                    buttonColor={colors.white}
                    removeMarginTop
                    titleText={topBarTitleText}
                    animatedValue={reverseTextOpacity}
                    treatFinancialBalanceOnTopBarTitle={treatFinancialBalanceOnTopBarTitle}
                    treatDotzBalanceOnTopBarTitle={treatDotzBalanceOnTopBarTitle}
                />
            </View>
            <Animated.ScrollView
                bounces={false}
                style={styles.scrollViewContainer}
                onScroll={
                    Animated.event([{ nativeEvent: { contentOffset: { y: nScroll } } }], { useNativeDriver: true })
                }
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
            >

                <Animated.View style={[styles.parallaxHeaderContainer, {
                    backgroundColor: colors.pumpkinOrange,
                    height: isFlex ? null : maxHeight ? maxHeight : HEADERMAXHEIGHT,
                    paddingLeft: (maxHeight || isFlex) ? horizontalScale(0) : horizontalScale(32),
                    paddingRight: (maxHeight || isFlex) ? horizontalScale(0) : horizontalScale(32)
                }]} >

                    <Animated.View style={[styles.parallaxTitleContainer, { opacity: textOpacity, backgroundColor: 'transparent' }]}>
                        {headerContent}
                    </Animated.View>



                </Animated.View>

                <View style={styles.animatedChildView}>
                    {childContent}
                </View>

            </Animated.ScrollView >
        </View >
    );
};

StatelessParallaxViewComponent.defaultProps = {
    headerColor: colors.pumpkinOrange,
    isFlex: false
};

StatelessParallaxViewComponent.propTypes = {
    onPressBackButton: PropTypes.func,
    onPressCloseButton: PropTypes.func,
    onSearchButtonPress: PropTypes.func,
    onFilterButtonPress: PropTypes.func,
    topBarTitleText: PropTypes.string,
    headerContent: PropTypes.any,
    childContent: PropTypes.any,
    headerColor: PropTypes.string,
    treatFinancialBalanceOnTopBarTitle: PropTypes.bool,
    treatDotzBalanceOnTopBarTitle: PropTypes.bool,
    maxHeight: PropTypes.number,
    scrollHeight: PropTypes.number,
    isFlex: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pumpkinOrange
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topBarContainer: {
        paddingLeft: horizontalScale(32),
        paddingRight: horizontalScale(32),
        paddingBottom: verticalScale(10)
    },
    parallaxHeaderContainer: {
        width: '100%',
        zIndex: 2,
    },
    parallaxTitleContainer: {
        flex: 1,
        paddingBottom: verticalScale(32),
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    animatedChildView: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 0,
        zIndex: 99
    }
});
