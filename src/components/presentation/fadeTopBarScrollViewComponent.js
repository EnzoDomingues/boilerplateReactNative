import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import colors from 'memenet/src/commons/colors';
import { horizontalScale, verticalScale } from 'memenet/src/commons/scaling';
import PropTypes from 'prop-types';
import { CustomStatusBar, TopBarComponent } from '.';

const SCROLL_HEIGHT = verticalScale(120);

export const FadeTopBarScrollViewComponent = ({
  onBackButtonPress,
  onCloseButtonPress,
  topBarTitleText,
  disableTopBarButtons,
  childContent,
  treatFinancialBalanceOnTopBarTitle,
  fixTopBar
}) => {
  let nScroll = new Animated.Value(0);
  let scroll = new Animated.Value(0);

  nScroll.addListener(
    Animated.event([{ value: scroll }], { useNativeDriver: false })
  );

  const reverseOpacityControl = nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityControl = nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const yControl = nScroll.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topBarContainer,
          {
            transform: [
              { translateY: fixTopBar ? 0 : yControl > 0 ? 0 : yControl },
              { perspective: 1000 }
            ],
            opacity: fixTopBar ? 1 : reverseOpacityControl
          }
        ]}
      >
        <CustomStatusBar />
        <TopBarComponent
          topBarType={TopBarComponent.TopBarType.SIMPLETOPBAR}
          onBackButtonPress={onBackButtonPress}
          onCloseButtonPress={onCloseButtonPress}
          titleText={topBarTitleText}
          treatFinancialBalanceOnTopBarTitle={
            treatFinancialBalanceOnTopBarTitle
          }
        />
      </Animated.View>
      {!disableTopBarButtons && (
        <Animated.View
          style={[styles.defaultTopBarContainer, { opacity: opacityControl }]}
        >
          <TopBarComponent
            topBarType={TopBarComponent.TopBarType.GENERICTOPBAR}
            onBackButtonPress={onBackButtonPress}
            onCloseButtonPress={onCloseButtonPress}
            buttonColor={colors.veryLightPink}
          />
        </Animated.View>
      )}
      <Animated.ScrollView
        bounces={false}
        style={styles.scrollViewContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: nScroll } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.animatedChildView}>{childContent}</View>
      </Animated.ScrollView>
    </View>
  );
};

FadeTopBarScrollViewComponent.propTypes = {
  onPressBackButton: PropTypes.func,
  onPressCloseButton: PropTypes.func,
  disableTopBarButtons: PropTypes.bool,
  topBarTitleText: PropTypes.string,
  childContent: PropTypes.any,
  treatFinancialBalanceOnTopBarTitle: PropTypes.bool,
  fixTopBar: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  defaultTopBarContainer: {
    backgroundColor: colors.white,
    paddingLeft: horizontalScale(32),
    paddingRight: horizontalScale(32)
  },
  topBarContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 0
  },
  animatedChildView: {
    height: '100%',
    backgroundColor: colors.white,
    marginTop: verticalScale(42)
  }
});
