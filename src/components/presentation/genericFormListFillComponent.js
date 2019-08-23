import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { verticalScale } from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import PropTypes from 'prop-types';
import { GenericTextComponent } from './genericTextComponent';

export const GenericFormListFillComponent = ({
  title,
  subtitle
}) => (
    <View style={styles.container}>
      <GenericTextComponent
        styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
        color={colors.blackAlpha30}
        text={title} />
      <GenericTextComponent
        styleguideItem={GenericTextComponent.StyleguideItem.BODY}
        color={colors.black}
        marginTop={verticalScale(10)}
        text={subtitle} />
    </View>
  );

GenericFormListFillComponent.propTypes = {
  text: PropTypes.string,
  subtitle: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: verticalScale(25)
  }
});
