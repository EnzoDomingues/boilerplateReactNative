import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Animated } from "react-native";

export default class SlideUpFadeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeValue: new Animated.Value(0),
            slideUpValue: new Animated.Value(0),
            fadeDuration: this.props.fadeDuration,
            slideUpDuration: this.props.slideUpDuration
        };
    }
    componentDidMount() {
        const { autoPlay } = this.props;

        autoPlay && this._start();
    }

    componentDidUpdate(prevProps) {
        const { startWhen } = this.props;

        if (startWhen !== prevProps.startWhen) {
            startWhen ? this._start() : this.restart()
        }
    }

    restart = () => {
        this.setState({
            fadeValue: new Animated.Value(1),
            slideUpValue: new Animated.Value(1)
        }, () => {
            return Animated.parallel([
                Animated.timing(this.state.fadeValue, {
                    toValue: 0,
                    duration: this.state.fadeDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.slideUpValue, {
                    toValue: 0,
                    duration: this.state.slideUpDuration,
                    useNativeDriver: true
                })
            ]).start();
        })
    };

    _start = () => {
        const { callback } = this.props;

        return Animated.parallel([
            Animated.timing(this.state.fadeValue, {
                toValue: 1,
                duration: this.state.fadeDuration,
                useNativeDriver: true
            }),
            Animated.timing(this.state.slideUpValue, {
                toValue: 1,
                duration: this.state.slideUpDuration,
                useNativeDriver: true
            })
        ]).start(() => callback && callback())
    };

    render() {
        const { slideUpValue, fadeValue } = this.state;
        const { children, style, ...props } = this.props;
        return (
            <Animated.View
                {...props}
                style={{
                    ...style,
                    transform: [
                        {
                            translateY: slideUpValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-300, 0]
                            })
                        },
                        {
                            perspective: 1000
                        }
                    ],
                    opacity: fadeValue
                }}
            >
                {children}
            </Animated.View>
        );
    }
}

SlideUpFadeComponent.defaultProps = {
    slideUpDuration: 2000,
    fadeDuration: 3000,
    callbackTrigger: 1
};

SlideUpFadeComponent.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    slideUpDuration: PropTypes.number,
    fadeDuration: PropTypes.number,
    callbackTrigger: PropTypes.number,
    callback: PropTypes.func,
    startWhen: PropTypes.bool,
    autoPlay: PropTypes.bool
};