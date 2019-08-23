import React, { Component } from "react";
import {
    Animated,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import colors from 'memenet/src/commons/colors';
import { horizontalScale, verticalScale } from 'memenet/src/commons/scaling';
import PropTypes from 'prop-types';
import { CustomStatusBar, TopBarComponent } from '../presentation';

const SCROLL_HEIGHT = verticalScale(70)

const HEADERMAXHEIGHT = verticalScale(160);
const PARALLAXHEIGHT = verticalScale(80);

export default class ParallaxViewComponent extends Component {
    constructor(props) {
        super(props);

        this.onBackButtonPress = props.childComponentId;
        this.onCloseButtonPress = props.onCloseButtonPress;
        this.onSearchButtonPress = props.onSearchButtonPress;
        this.onFilterButtonPress = props.onFilterButtonPress;
        this.topBarTitleText = props.topBarTitleText;
        this.headerContent = props.headerContent;
        this.childContent = props.childContent;
        this.headerColor = props.headerColor;
        this.treatFinancialBalanceOnTopBarTitle = props.treatFinancialBalanceOnTopBarTitle;
        this.treatDotzBalanceOnTopBarTitle = props.treatDotzBalanceOnTopBarTitle;

        this.state = {
            nScroll: new Animated.Value(0),
            scroll: new Animated.Value(0),
            topBarHeight: 0,
            srcollHeight: 0,
            titleOnLayout: 0,
            statusBarHeight: 0
        }
    }

    componentDidMount() {
        this.state.nScroll.addListener(Animated.event([{ value: this.state.scroll }], { useNativeDriver: false }));
    }

    render() {

        const textOpacity = this.state.nScroll.interpolate({
            inputRange: [0, SCROLL_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        const reverseTextOpacity = this.state.nScroll.interpolate({
            inputRange: [0, SCROLL_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        const isParalaxable = Dimensions.get('window').height <= this.state.topBarHeight + this.state.srcollHeight + this.state.titleOnLayout;

        return (
            <View
                style={[styles.container, { backgroundColor: this.headerColor }]}>
                <CustomStatusBar
                    onLayout={(event) => this.setState({ statusBarHeight: event.nativeEvent.layout.height })}
                    headerColor={this.headerColor}
                />
                <View
                    onLayout={(event) => this.setState({ topBarHeight: event.nativeEvent.layout.height })}
                    style={styles.topBarContainer}>
                    <TopBarComponent
                        topBarType={TopBarComponent.TopBarType.GENERICTOPBAR}
                        onBackButtonPress={this.props.onBackButtonPress}
                        onCloseButtonPress={this.props.onCloseButtonPress}
                        onSearchButtonPress={this.props.onSearchButtonPress}
                        onFilterButtonPress={this.props.onFilterButtonPress}
                        buttonColor={colors.white}
                        removeMarginTop
                        titleText={this.topBarTitleText}
                        animatedValue={(isParalaxable ? reverseTextOpacity : new Animated.Value(0))}
                        treatFinancialBalanceOnTopBarTitle={this.treatFinancialBalanceOnTopBarTitle}
                        treatDotzBalanceOnTopBarTitle={this.treatDotzBalanceOnTopBarTitle}
                    />
                </View>
                <Animated.ScrollView
                    bounces={false}
                    style={styles.scrollViewContainer}
                    onScroll={
                        Animated.event([{ nativeEvent: { contentOffset: { y: this.state.nScroll } } }], { useNativeDriver: true })
                    }
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={[styles.parallaxHeaderContainer, {
                        backgroundColor: this.headerColor,
                    }]} >

                        <Animated.View style={[styles.parallaxTitleContainer, { opacity: (isParalaxable ? textOpacity : new Animated.Value(1)) }]}
                            onLayout={(event) => { this.setState({ titleOnLayout: event.nativeEvent.layout.height / 2 }) }}
                        >
                            {this.headerContent}
                        </Animated.View>
                    </View>
                    <View style={styles.animatedChildView}
                        onLayout={(event) => { this.setState({ srcollHeight: event.nativeEvent.layout.height }) }}
                    >
                        {this.childContent}
                    </View>
                </Animated.ScrollView >
            </View >
        );
    }
}

ParallaxViewComponent.defaultProps = {
    headerColor: colors.pumpkinOrange
};

ParallaxViewComponent.propTypes = {
    onPressBackButton: PropTypes.func,
    onPressCloseButton: PropTypes.func,
    onSearchButtonPress: PropTypes.func,
    onFilterButtonPress: PropTypes.func,
    topBarTitleText: PropTypes.string,
    headerContent: PropTypes.any,
    childContent: PropTypes.any,
    headerColor: PropTypes.string,
    treatFinancialBalanceOnTopBarTitle: PropTypes.bool,
    treatDotzBalanceOnTopBarTitle: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: HEADERMAXHEIGHT
    },
    parallaxTitleContainer: {
        flex: 1,
        paddingHorizontal: horizontalScale(32),
        paddingBottom: verticalScale(32),
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    animatedChildView: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 0
    }
});
