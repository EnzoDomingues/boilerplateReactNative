import React, { Component } from 'react';
import { Text } from 'react-native';
import colors from 'memenet/src/commons/colors';
import { fontScale } from 'memenet/src/commons/scaling';

const CURSOR_BLINKING_ANIMATION_SPEED = 500;
const CURSOR_SYMBOL = '|';

export default class FakeCursor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorSymbol: CURSOR_SYMBOL
        }
        this.timeout = 0;
        this.isSixDigits = props.isSixDigits;
    }

    componentDidMount() {
        // Simulate cursor blink animation
        this.timeout = setInterval(
            () =>
                this.setState(({ cursorSymbol }) => ({
                    cursorSymbol: cursorSymbol ? '' : CURSOR_SYMBOL,
                })),
            CURSOR_BLINKING_ANIMATION_SPEED,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    render() {
        return <Text style={{
            color: colors.pumpkinOrange,
            fontSize: this.isSixDigits ? fontScale(18) : fontScale(30)
        }
        }>{this.state.cursorSymbol}</Text>;
    }
}