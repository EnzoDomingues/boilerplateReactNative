import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import colors from 'memenet/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';
import { TextInputMask } from 'react-native-masked-text';

export const GenericFormListBlankComponent = ({
  title,
  placeholder,
  value,
  handle,
  error,
  type,
  options,
  styleguide,
  txtcolor,
  style,
}) => (
    <View style={[styles.container, style]}>
      <GenericTextComponent
        text={title}
        styleguideItem={styleguide ? styleguide : "HEADING"}
        color={txtcolor ? txtcolor : colors.black}
        marginBottom={10}
      />
      {
        type
          ? (
            <TextInputMask
              type={type}
              options={options}
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              maxLength={19}
              autofocus
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={error ? colors.bloodyRed : colors.blackAlpha30}
              underlineColorAndroid="transparent"
              onChangeText={handle}
            />
          )
          : (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              maxLength={19}
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={error ? colors.bloodyRed : colors.blackAlpha30}
              underlineColorAndroid="transparent"
              onChangeText={handle}
            />
          )
      }

    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: colors.black,
    borderBottomWidth: 0,
  }
});
