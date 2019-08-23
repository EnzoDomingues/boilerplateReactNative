/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  GenericTopBarComponent,
  SimpleTopBarComponent,
  WhiteTopBarComponent
} from 'memenet/src/components/presentation';

const TopBarType = {
  SIMPLETOPBAR: 'SIMPLETOPBAR',
  GENERICTOPBAR: 'GENERICTOPBAR',
  WHITETOPBAR: 'WHITETOPBAR',
  SEARCHTOPBAR: 'SEARCHTOPBAR'
};

export const TopBarComponent = ({
  topBarType,
  onBackButtonPress,
  onCloseButtonPress,
  onSearchButtonPress,
  onFilterButtonPress,
  buttonColor,
  removeMarginTop,
  titleText,
  textValue,
  autoFocus,
  animatedValue,
  treatFinancialBalanceOnTopBarTitle,
  treatDotzBalanceOnTopBarTitle,
  onTitlePress,
  isTransparent,
  onTextEndPress,
  onChangeTextHandle,
  boldTitle,
  activeFilter,
  onlyText,
  onLinkButtonPress,
  linkButtonText
}) => {
  switch (topBarType) {
    case TopBarType.GENERICTOPBAR:
      return (
        <GenericTopBarComponent
          onBackButtonPress={onBackButtonPress}
          onCloseButtonPress={onCloseButtonPress}
          onSearchButtonPress={onSearchButtonPress}
          onFilterButtonPress={onFilterButtonPress}
          active={activeFilter}
          buttonColor={buttonColor}
          removeMarginTop={removeMarginTop}
          titleText={titleText}
          animatedValue={animatedValue}
          treatFinancialBalanceOnTopBarTitle={
            treatFinancialBalanceOnTopBarTitle
          }
          treatDotzBalanceOnTopBarTitle={treatDotzBalanceOnTopBarTitle}
          onLinkButtonPress={onLinkButtonPress}
          linkButtonText={linkButtonText}
        />
      );
    case TopBarType.SIMPLETOPBAR:
      return (
        <SimpleTopBarComponent
          onBackButtonPress={onBackButtonPress}
          onCloseButtonPress={onCloseButtonPress}
          titleText={titleText}
          treatFinancialBalanceOnTopBarTitle={
            treatFinancialBalanceOnTopBarTitle
          }
          isTransparent={isTransparent}
        />
      );
    case TopBarType.WHITETOPBAR:
      return (
        <WhiteTopBarComponent
          onBackButtonPress={onBackButtonPress}
          onCloseButtonPress={onCloseButtonPress}
          titleText={titleText}
          onTitlePress={onTitlePress}
          boldTitle={boldTitle}
          onlyText={onlyText}
          onTextEndPress={onTextEndPress}
        />
      );

    default:
  }
};

TopBarComponent.TopBarType = TopBarType;
