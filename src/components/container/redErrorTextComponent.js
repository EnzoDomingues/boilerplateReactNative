import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Animated, Easing } from "react-native";
import { fontScale } from "memenet/src/commons/scaling";
import colors from "memenet/src/commons/colors";

export default class RedErrorTextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: new Animated.Value(0),
        }
    }

    componentDidMount() {
        const { value } = this.state;
        Animated.timing(value, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
        }).start();
    }

    render() {
        const { text } = this.props;
        const { value } = this.state;
        return (
            <Animated.Text style={[
                styles.errorText,
                {
                    marginLeft: value.interpolate({
                        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                        outputRange: [0, -10, 10, -10, 10, -10, 0]
                    })
                }
            ]}>{text}</Animated.Text>
        );
    }
}

RedErrorTextComponent.defaultProps = {
    text: ''
};

RedErrorTextComponent.propTypes = {
    text: PropTypes.string
};

const styles = StyleSheet.create({
    errorText: {
        fontFamily: 'Inter-Regular',
        fontSize: fontScale(14),
        color: colors.bloodyRed
    }
});