import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView,
  Clipboard,
  Dimensions,
  BackHandler,
  ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import {
  fontScale,
  horizontalScale,
  verticalScale
} from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import {
  CustomStatusBar,
  GenericTextComponent,
  GenericButtonComponent,
  TopBarComponent,
  FadeTopBarScrollViewComponent,
  GenericModalComponent,
  StatelessParallaxViewComponent
} from 'memenet/src/components/presentation';
import ParallaxViewComponent from 'memenet/src/components/container/parallaxViewComponent';
import { Navigation } from 'react-native-navigation';
import {
  AnimationType,
  GetPopAnimationType
} from 'memenet/src/screens/screenAnimations';
import { Screen, ExampleScreen } from 'memenet/src/screens';
import {
  IS_IPHONE_X,
  formatMoney,
  formatThousands
} from 'memenet/src/commons/utils';
import Store from 'memenet/src/store';
import Icon from 'memenet/src/commons/icon';
import ErrorSceneType from 'memenet/src/config/error/errorSceneType';
// import firebase from 'react-native-firebase';

const ContainerType = {
  WHITEKEYBOARDAVOIDVIEW: 'WHITEKEYBOARDAVOIDVIEW',
  ORANGEKEYBOARDAVOIDVIEW: 'ORANGEKEYBOARDAVOIDVIEW',
  ROUNDEDTOPVIEW: 'ROUNDEDTOPVIEW',
  WHITESCROLLVIEW: 'WHITESCROLLVIEW',
  ORANGESCROLLVIEWBACKGROUNDBIGICON: 'ORANGESCROLLVIEWBACKGROUNDBIGICON',
  ORANGEPARALLAXVIEW: 'ORANGEPARALLAXVIEW',
  GREYPARALLAXVIEW: 'GREYPARALLAXVIEW',
  FADETOPBARSCROLLVIEW: 'FADETOPBARSCROLLVIEW'
};

export default class BaseScene extends Component {
  constructor(props) {
    super(props);

    // const Analytics = firebase.analytics();

    // Analytics.setAnalyticsCollectionEnabled(true);
    // Analytics.setCurrentScreen(props.childComponentId, 'DotzContaDigital');

    this.childComponentId = props.childComponentId;
    this.isModalScreen = props.isModalScreen;
    this.containerType = props.containerType;
    this.showBackButton = props.showBackButton;
    this.showCloseButton = props.showCloseButton;
    this.showSearchButton = props.showSearchButton;
    this.showFilterButton = props.showFilterButton;
    this.loadingButton = props.loadingButton;
    this.animationTypePop = props.animationTypePop;
    this.alignTitleToTop = props.alignTitleToTop;
    this.topBarTitleText = props.topBarTitleText;
    this.maxHeight = props.maxHeight;
    this.scrollHeight = props.scrollHeight;
    this.textValue = props.textValue;
    this.autoFocus = props.autoFocus;
    this.onPressFilter = props.onPressFilter;
    this.onFooterButton = props.onFooterButton;
    this.showFooterButton = props.showFooterButton;
    this.activeFilter = props.activeFilter;
    this.treatFinancialBalanceOnTopBarTitle =
      props.treatFinancialBalanceOnTopBarTitle;
    this.treatDotzBalanceOnTopBarTitle = props.treatDotzBalanceOnTopBarTitle;
    this.disableTopBarButtons = props.disableTopBarButtons;
    this.fixFadeTopBar = props.fixFadeTopBar;
    this.onTitlePress = props.onTitlePress;
    this.removeTopRoundedPadding = props.removeTopRoundedPadding;
    this.boldTitle = props.boldTitle;
    this.onlyText = props.onlyText;
    this.wordToSearch = props.wordToSearch;
    this.onTextEndPress = props.onTextEndPress;
    this.onCloseSearchBarPress = props.onCloseSearchBarPress;
    this.removeInnerPadding = props.removeInnerPadding;
    this.onSearchTextHandle = props.onSearchTextHandle;
    this.onLinkButtonPress = props.onLinkButtonPress;
    this.showTopLinkButton = props.showTopLinkButton;
    this.linkButtonText = props.linkButtonText;
    this.isFlex = props.isFlex;

    this.navigation = Navigation;
    this.animationType = AnimationType;
    this.errorSceneType = ErrorSceneType;
    this.screen = Screen;
    this.exampleScreen = ExampleScreen;
    this.intervalFinancialBalance = null;
    this.intervalDotzBalance = null;

    this.dotzBalance = null;
    this.financialBalance = null;

    this.height = Dimensions.get('window').height;
    this.width = Dimensions.get('window').width;
    this.fieldRef = React.createRef();

    if (!!this.showCloseButton && !this.showBackButton) {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          this.navigationClose();
          return true;
        }
      );
    }
  }

  navigateTo(screenTo, animationType, passProps, customTransitionProps) {
    !passProps && (passProps = {});
    passProps.animationTypePop = GetPopAnimationType(animationType);
    this.navigation.push(this.childComponentId, {
      component: {
        id: screenTo,
        name: screenTo,
        passProps: passProps,
        options: {
          animations: {
            push: animationType
          },
          customTransition: customTransitionProps
        }
      }
    });
  }

  navigationPop() {
    this.navigation.pop(this.childComponentId, {
      animations: {
        pop: this.animationTypePop
      }
    });
  }

  navigationPopToRoot() {
    this.navigation.popToRoot(this.childComponentId, {
      animations: {
        pop: this.animationType.SLIDEDOWN
      }
    });
  }

  navigationModal(screenTo, animationType, passProps, repeat) {
    this.navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: `${screenTo}${
                repeat ? Math.floor(Math.random() * 100) + 1 : ''
              }`,
              name: screenTo,
              passProps: passProps,
              options: {
                animations: {
                  showModal: animationType,
                  dismissModal: GetPopAnimationType(animationType)
                },
                layout: {
                  orientation: ['portrait']
                }
              }
            }
          }
        ]
      }
    });
  }

  navigationClose = () =>
    this.isModalScreen
      ? this.navigation.dismissModal(this.childComponentId)
      : this.navigationPop();

  dismissLoadingModal = timeoutNumber =>
    setTimeout(
      () => this.navigation.dismissModal(this.screen.TransitionLoadingScene),
      timeoutNumber ? timeoutNumber : 500
    );

  dismissModal = self =>
    !self
      ? this.navigation.dismissAllModals()
      : setTimeout(
          () => this.navigation.dismissModal(this.childComponentId),
          500
        );

  onSearchTopBarPress = () => {};

  onFilterTopBarPress = () => {};

  renderParallaxHeaderContent = () => {
    return (
      <GenericTextComponent
        styleguideItem={GenericTextComponent.StyleguideItem.HEADINGL}
        color={colors.white}
        text={this.topBarTitleText}
      />
    );
  };

  onCopy = async (value, callback) => {
    await Clipboard.setString(value);
    callback();
  };

  renderInfoModal(props) {
    return (
      <GenericModalComponent
        isVisible={props.isVisible}
        onClose={props.onClose}
        distanceFromTop={props.distanceFromTop}
        children={props.children}
        colorModal={props.colorModal}
      />
    );
  }

  renderScreenContainer(children) {
    switch (this.containerType) {
      case ContainerType.WHITEKEYBOARDAVOIDVIEW:
        return (
          <KeyboardAvoidingView
            style={styles.whiteKeyboardAvoidView}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
          >
            <TopBarComponent
              topBarType={TopBarComponent.TopBarType.GENERICTOPBAR}
              onBackButtonPress={
                this.showBackButton ? () => this.navigationPop() : null
              }
              onCloseButtonPress={
                this.showCloseButton ? () => this.navigationClose() : null
              }
              onSearchButtonPress={
                this.showSearchButton ? () => this.onSearchTopBarPress() : null
              }
              onFilterButtonPress={
                this.showFilterButton ? () => this.onFilterTopBarPress() : null
              }
              buttonColor={colors.veryLightPink}
            />
            <View style={{ flex: 1, marginTop: verticalScale(82) }}>
              {children}
            </View>
          </KeyboardAvoidingView>
        );
      case ContainerType.ORANGEKEYBOARDAVOIDVIEW:
        return (
          <KeyboardAvoidingView
            style={styles.pumpkinOrangeKeyboardAvoidView}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
          >
            {(!!this.showBackButton ||
              !!this.showCloseButton ||
              !!this.showSearchButton) && (
              <TopBarComponent
                topBarType={TopBarComponent.TopBarType.GENERICTOPBAR}
                onBackButtonPress={
                  this.showBackButton ? () => this.navigationPop() : null
                }
                onCloseButtonPress={
                  this.showCloseButton ? () => this.navigationClose() : null
                }
                onSearchButtonPress={
                  this.showSearchButton
                    ? () => this.onSearchTopBarPress()
                    : null
                }
                onFilterButtonPress={
                  this.showFilterButton
                    ? () => this.onFilterTopBarPress()
                    : null
                }
                buttonColor={colors.white}
              />
            )}
            <View
              style={{
                flex: 1,
                marginTop:
                  this.showBackButton ||
                  this.showCloseButton ||
                  this.showSearchButton
                    ? verticalScale(82)
                    : 0
              }}
            >
              {children}
            </View>
          </KeyboardAvoidingView>
        );
      case ContainerType.ROUNDEDTOPVIEW:
        return (
          <KeyboardAvoidingView
            style={styles.roundedTopView}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
          >
            <CustomStatusBar />
            <View
              style={[
                styles.topRounded,
                {
                  paddingLeft: horizontalScale(
                    !this.removeInnerPadding ? 24 : 0
                  ),
                  paddingRight: horizontalScale(
                    !this.removeInnerPadding ? 24 : 0
                  )
                }
              ]}
            >
              <View
                style={{
                  paddingHorizontal: horizontalScale(
                    this.removeInnerPadding ? 24 : 0
                  )
                }}
              >
                <TopBarComponent
                  topBarType={TopBarComponent.TopBarType.GENERICTOPBAR}
                  onBackButtonPress={
                    this.showBackButton ? () => this.navigationPop() : null
                  }
                  onCloseButtonPress={
                    this.showCloseButton ? () => this.navigationClose() : null
                  }
                  onSearchButtonPress={
                    this.showSearchButton
                      ? () => this.onSearchTopBarPress()
                      : null
                  }
                  onFilterButtonPress={
                    this.showFilterButton
                      ? () => this.onFilterTopBarPress()
                      : null
                  }
                  onLinkButtonPress={
                    this.showTopLinkButton
                      ? () => this.onLinkButtonPress()
                      : null
                  }
                  linkButtonText={this.linkButtonText}
                  buttonColor={colors.veryLightPink}
                  removeMarginTop
                />
              </View>
              <View
                style={{
                  flex: 1,
                  zIndex: -1,
                  marginTop: this.alignTitleToTop
                    ? IS_IPHONE_X
                      ? verticalScale(-24)
                      : verticalScale(-30)
                    : verticalScale(25)
                }}
              >
                {children}
              </View>
            </View>
          </KeyboardAvoidingView>
        );
      case ContainerType.WHITESCROLLVIEW:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.whiteScrollView}
          >
            <View>
              <TopBarComponent
                topBarType={TopBarComponent.TopBarType.GENERICTOPBAR}
                onBackButtonPress={
                  this.showBackButton ? () => this.navigationPop() : null
                }
                onCloseButtonPress={
                  this.showCloseButton ? () => this.navigationClose() : null
                }
                onSearchButtonPress={
                  this.showSearchButton
                    ? () => this.onSearchTopBarPress()
                    : null
                }
                onFilterButtonPress={
                  this.showFilterButton
                    ? () => this.onFilterTopBarPress()
                    : null
                }
                buttonColor={colors.veryLightPink}
                removeMarginTop
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: verticalScale(42),
                paddingHorizontal: horizontalScale(
                  this.removeInnerPadding ? 24 : 0
                )
              }}
            >
              {children}
            </View>
          </ScrollView>
        );
      case ContainerType.IMAGESCROLLVIEW:
        return (
          <ImageBackground
            source={require('memenet/src/assets/img/bgLogin01.jpg')}
            style={{ width: '100%', height: '100%' }}
          >
            <View style={styles.topImageContainer} />
            <Icon
              name="logo"
              color={colors.white}
              style={styles.logo}
              size={fontScale(70)}
            />

            <View
              style={{
                height: this.height / 1.15
              }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.innerViewWrapperView}>{children}</View>
            </View>
          </ImageBackground>
        );
      case ContainerType.ORANGEPARALLAXVIEW:
        return (
          <StatelessParallaxViewComponent
            topBarTitleText={this.topBarTitleText}
            onBackButtonPress={
              this.showBackButton ? () => this.navigationPop() : null
            }
            onCloseButtonPress={
              this.showCloseButton ? () => this.navigationClose() : null
            }
            onSearchButtonPress={
              this.showSearchButton ? () => this.onSearchTopBarPress() : null
            }
            onFilterButtonPress={
              this.showFilterButton ? () => this.onFilterTopBarPress() : null
            }
            headerContent={this.renderParallaxHeaderContent()}
            treatFinancialBalanceOnTopBarTitle={
              this.treatFinancialBalanceOnTopBarTitle
            }
            isFlex={this.isFlex}
            maxHeight={this.maxHeight}
            scrollHeight={this.scrollHeight}
            activeFilter={this.activeFilter ? this.activeFilter : false}
            treatDotzBalanceOnTopBarTitle={this.treatDotzBalanceOnTopBarTitle}
            childContent={children}
          />
        );
      case ContainerType.GREYPARALLAXVIEW:
        return (
          <ParallaxViewComponent
            headerColor={colors.greyishBrown}
            topBarTitleText={this.topBarTitleText}
            onBackButtonPress={
              this.showBackButton ? () => this.navigationPop() : null
            }
            onCloseButtonPress={
              this.showCloseButton ? () => this.navigationClose() : null
            }
            onSearchButtonPress={
              this.showSearchButton ? () => this.onSearchTopBarPress() : null
            }
            onFilterButtonPress={
              this.showFilterButton ? () => this.onFilterTopBarPress() : null
            }
            headerContent={this.renderParallaxHeaderContent()}
            childContent={children}
          />
        );
      case ContainerType.FADETOPBARSCROLLVIEW:
        return (
          <FadeTopBarScrollViewComponent
            topBarTitleText={this.topBarTitleText}
            onBackButtonPress={
              this.showBackButton ? () => this.navigationPop() : null
            }
            onCloseButtonPress={
              this.showCloseButton ? () => this.navigationClose() : null
            }
            disableTopBarButtons={this.disableTopBarButtons}
            treatFinancialBalanceOnTopBarTitle={
              this.treatFinancialBalanceOnTopBarTitle
            }
            fixTopBar={this.fixFadeTopBar}
            childContent={children}
          />
        );
      default:
        return children;
    }
  }

  componentWillUnmount = () => this.backHandler && this.backHandler.remove();

  render(children) {
    return this.renderScreenContainer(children);
  }
}

BaseScene.ContainerType = ContainerType;

BaseScene.propTypes = {
  childComponentId: PropTypes.any,
  isModalScreen: PropTypes.bool,
  containerType: PropTypes.oneOf(Object.keys(ContainerType)),
  showBackButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  animationTypePop: PropTypes.any,
  alignTitleToTop: PropTypes.string,
  topBarTitleText: PropTypes.string,
  onPressFilter: PropTypes.func,
  activeFilter: PropTypes.bool,
  onPressButton: PropTypes.func,
  disableTopBarButtons: PropTypes.bool
};

const styles = StyleSheet.create({
  whiteScrollView: {
    flex: 1,
    backgroundColor: colors.white
  },
  imagemBg: {
    flex: 1,
    paddingTop: verticalScale(50)
  },
  searchWhiteScrollView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: IS_IPHONE_X ? verticalScale(50) : verticalScale(0)
  },
  innerViewWrapperView: {
    flex: 1,
    paddingTop: verticalScale(42),
    paddingLeft: horizontalScale(24),
    paddingRight: horizontalScale(24)
  },
  catalogWhiteScrollView: {
    flex: 1,
    paddingTop: IS_IPHONE_X ? verticalScale(50) : verticalScale(0),
    backgroundColor: colors.white
  },
  whiteKeyboardAvoidView: {
    flex: 1,
    paddingLeft: horizontalScale(24),
    paddingRight: horizontalScale(24),
    backgroundColor: colors.white
  },
  pumpkinOrangeKeyboardAvoidView: {
    flex: 1,
    paddingLeft: horizontalScale(24),
    paddingRight: horizontalScale(24),
    backgroundColor: colors.pumpkinOrange
  },
  innerWrapperView: {
    
    flex: 1,
    marginTop: verticalScale(42)
  },
  roundedTopView: {
    flex: 1,
    backgroundColor: colors.pumpkinOrange
  },
  topRounded: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: verticalScale(24),
    paddingLeft: horizontalScale(24),
    paddingRight: horizontalScale(24),
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  loading: {
    marginTop: verticalScale(5),
    width: 64,
    height: 22
  },
  logo: {
    zIndex: 2,
    paddingTop: IS_IPHONE_X ? verticalScale(50) : verticalScale(20),
    paddingLeft: horizontalScale(24)
  },
  topImageContainer: {
    position: 'absolute',
    zIndex: 0,
    backgroundColor: colors.black,
    opacity: 0.5,
    width: '100%',
    height: '100%'
  }
});
