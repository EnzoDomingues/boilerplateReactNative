import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { horizontalScale, verticalScale } from 'memenet/src/commons/scaling';
import colors from 'memenet/src/commons/colors';
import { GenericTextComponent } from './genericTextComponent';

const { width } = Dimensions.get('window');

export const GenericListCardComponent = ({
  date,
  url,
  title,
  status,
  onPress,
  colorTxtButton,
  off,
  descri
}) => (
    <TouchableOpacity style={status ? [styles.row, { marginBottom: verticalScale(28) }] : styles.row} onPress={onPress}>
      <Image source={{ uri: url }} style={styles.img} />
      {date && (
        <GenericTextComponent
          text={date}
          styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
          color={colors.blackAlpha50}
          textAlign='left'
          marginTop={verticalScale(5)}
          marginBottom={verticalScale(5)}
        />
      )}
      {title && (
        <GenericTextComponent
          text={title}
          styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
          color={colors.midnightBlack}
          marginTop={verticalScale(2)}
          textAlign='left'
        />
      )}

      {off && (
        <GenericTextComponent
          text={off}
          styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
          color={colors.pumpkinOrange}
          marginTop={verticalScale(2)}
          marginBottom={verticalScale(8)}
          textAlign='left'
        />
      )}

      {descri && (
        <GenericTextComponent
          text={descri}
          numberOfLines={2}
          styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
          color={colors.black}
          marginTop={verticalScale(2)}
          marginBottom={status ? verticalScale(10) : verticalScale(0)}
          textAlign='left'
        />
      )}

      {status && (
        <View style={styles.status}>
          <GenericTextComponent
            text={status}
            styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
            color={colorTxtButton}
            textAlign='center'
          />
        </View>
      )}

    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  row: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blackAlpha30,
    width: width / 2.4,
    paddingHorizontal: 15,
    paddingVertical: verticalScale(24),
    marginRight: horizontalScale(10),
    position: 'relative',
    marginBottom: verticalScale(10),
  },
  img: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: verticalScale(15)
  },
  h1: {
    marginVertical: verticalScale(5)
  },
  containerButton: {
    justifyContent: 'center'
  },
  status: {
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.midnightBlackAlpha30,
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    left: horizontalScale(15),
    right: 0,
    bottom: verticalScale(-15)
  }
});

export default GenericListCardComponent;