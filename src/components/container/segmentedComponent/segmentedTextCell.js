import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text
} from 'react-native';
import colors from 'memenet/src/commons/colors';
import FakeCursor from './fakeCursor';
import { fontScale } from 'memenet/src/commons/scaling';

export default class SegmentedTextCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCursor: false,
            maskValue: false,
            value: ''
        }
        this.height = props.height;
        this.width = props.width;
        this.isTwoDigits = props.isTwoDigits;
        this.isSixDigits = props.isSixDigits;
        this.onPress = props.onPress;
    }

    clearContent = () => this.setState({ value: '', maskValue: false })

    setContent = (value) => {
        this.setState({ value }, () => {
            !value && this.setState({ maskValue: false })
            !!value && setTimeout(() => this.setState({ maskValue: true }), 150)
        })
    }

    clearFocus = () => this.setState({ showCursor: false })

    setFocus = () => this.setState({ showCursor: true, value: '', maskValue: false })

    render() {
        const { value, maskValue, showCursor } = this.state;
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[{
                    height: this.height,
                    width: this.width,
                    marginLeft: this.isTwoDigits ? 5 : 0,
                    marginRight: this.isTwoDigits ? 5 : 0
                }, styles.containerCell]} >
                    {!!showCursor && <FakeCursor isSixDigits={this.isSixDigits} />}
                    {!!value && !maskValue && <Text style={this.isSixDigits ? styles.textValueSixDigits : styles.textValueBase}>{value}</Text>}
                    {!!value && !!maskValue && <View style={this.isSixDigits ? styles.maskBulletSixDigits : styles.maskBulletBase} />}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

SegmentedTextCell.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    isTwoDigits: PropTypes.number,
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    containerCell: {
        backgroundColor: colors.pumpkinOrangeAlpha10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    textValueBase: {
        fontSize: fontScale(30),
        fontFamily: 'Inter-Bold',
        color: colors.pumpkinOrange
    },
    textValueSixDigits: {
        fontSize: fontScale(18),
        fontFamily: 'Inter-Bold',
        color: colors.pumpkinOrange
    },
    maskBulletBase: {
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: colors.pumpkinOrange
    },
    maskBulletSixDigits: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: colors.pumpkinOrange
    }
});