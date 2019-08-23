import React, { Component } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import RedErrorTextComponent from './redErrorTextComponent.js';
import {
  TitleInputComponent,
  GenericTextComponent,
  TextLinkButtonComponent
} from 'memenet/src/components/presentation';
import {
  verticalScale,
  horizontalScale
} from 'memenet/src/commons/scaling.js';
import colors from 'memenet/src/commons/colors.js';
import FadeComponent from 'memenet/src/components/container/animations/fadeComponent.js';

export default class DefaultFormViewComponent extends Component {
  constructor(props) {
    super(props);
    this.fieldRef = React.createRef();
    this.validAnimation = React.createRef();
  }

  componentDidUpdate() {
    const { valid } = this.props;
    valid && this.validAnimation.play();
  }

  focusTextInput = () => this.fieldRef.current._inputElement.focus();

  isValid = () => {
    return this.fieldRef.current.isValid();
  };

  render() {
    const {
      value,
      title,
      placeholderText,
      type,
      options,
      valid,
      onChangeText,
      maxLength,
      errorMessage,
      customMessage,
      customTriggerErrorMessage,
      textButton,
      colorButton,
      autoFocus,
      valueLength,
      onPress,
      onSubmitEditing,
      onBlur,
      showButton,
      error,
      loading,
      description
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TitleInputComponent
            titleText={title}
            placeholderText={placeholderText}
            type={type}
            options={options}
            value={value}
            onChangeText={onChangeText}
            ref={this.fieldRef}
            maxLength={maxLength}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
          />
          {!!valid && (
            <ActivityIndicator size="small" color={colors.blackAlpha50} />

          )}
        </View>
        {!valid &&
          (value.length == maxLength ||
            value.length == customTriggerErrorMessage) && (
            <RedErrorTextComponent text={errorMessage} />
          )}
        {!!error && <RedErrorTextComponent text={errorMessage} />}
        {!!valid && value.length == maxLength && !!customMessage && (
          <GenericTextComponent
            text={customMessage}
            color={colors.midnightBlack}
          />
        )}
        {!!description && (
          <GenericTextComponent
            color={colors.black}
            text={description}
            marginTop={verticalScale(20)}
          />
        )}
        <View
          style={[
            styles.blockRow,
            {
              marginTop:
                Platform.OS === 'ios' ? verticalScale(110) : verticalScale(50)
            }
          ]}
        >
          {showButton &&
            !error &&
            (!!loading ? (
              <TextLinkButtonComponent
                styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
                color={colorButton ? colorButton : colors.pumpkinOrange}
                text={textButton}
                onPress={onPress}
                loading={loading}
              />
            ) : (
                <FadeComponent
                  autoPlay
                  type={FadeComponent.FadeType.FADEIN}
                  children={
                    <TextLinkButtonComponent
                      styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
                      color={colorButton ? colorButton : colors.pumpkinOrange}
                      text={textButton}
                      onPress={onPress}
                    />
                  }
                />
              ))}
          {valueLength && (
            <View style={[styles.blockRow, { marginLeft: 'auto' }]}>
              <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                color={colors.blackAlpha50}
                text={value.length}
              />

              <GenericTextComponent
                styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                color={colors.blackAlpha50}
                text="/100"
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

DefaultFormViewComponent.defaultProps = {
  value: '',
  valid: true,
  error: false,
  title: '',
  placeholderText: '',
  type: '',
  maxLength: 14,
  errorMessage: '',
  loading: false,
  description: null
};

DefaultFormViewComponent.propTypes = {
  value: PropTypes.string,
  valid: PropTypes.bool,
  autoFocus: PropTypes.bool,
  valueLength: PropTypes.bool,
  showButton: PropTypes.bool,
  title: PropTypes.string,
  placeholderText: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func,
  onPress: PropTypes.func,
  errorMessage: PropTypes.string,
  customTriggerErrorMessage: PropTypes.number,
  loading: PropTypes.bool,
  description: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  },
  form: {
    flexDirection: 'row',
    marginBottom: verticalScale(10)
  },
  blockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkIcon: {
    width: 37,
    height: 21,
    alignSelf: 'flex-start',
    paddingLeft: horizontalScale(15),
    marginLeft: Platform.OS === 'ios' ? horizontalScale(-5) : 0,
    marginTop: Platform.OS === 'ios' ? verticalScale(9) : verticalScale(15)
  },
  loadingIcon: {
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignSelf: 'flex-start'
  }
});
