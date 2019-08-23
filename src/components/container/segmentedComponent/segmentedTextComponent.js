import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TextInput
} from "react-native";
import SegmentedTextCell from "./segmentedTextCell";
import { GenericTextComponent, TextLinkButtonComponent } from "memenet/src/components/presentation";
import RedErrorTextComponent from "memenet/src/components/container/redErrorTextComponent";
import colors from "memenet/src/commons/colors";
import { verticalScale } from "memenet/src/commons/scaling";

const SegmentedTextType = {
    TWODIGITS: {
        size: 2,
        height: 70,
        width: 70
    },
    FOURDIGITS: {
        size: 4,
        height: 70,
        width: 70
    },
    SIXDIGITS: {
        size: 6,
        height: 45,
        width: 45
    }
}

export default class SegmentedTextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currentIndex: 0
        }
        this.cellsReferences = [];
        this.ghostInput = React.createRef();

        this.title = props.title
        this.text = props.text
        this.linkText = props.linkText
        this.linkPress = props.linkPress
        this.segmentedTextType = props.segmentedTextType
        this.callback = props.callback
        this.callbackClearText = props.callbackClearText
    }

    _onChangeText(text) {
        const { value, currentIndex } = this.state
        this.setState(
            {
                value: text,
                currentIndex: value.length < text.length && text.length < this.segmentedTextType.size ? currentIndex + 1 : currentIndex
            }, () => {
                this._defineInputToFocus()
                if (text.length === this.segmentedTextType.size) {
                    this._setAllReferencesValues()
                    this._clearAllReferencesFocus()
                    this.ghostInput.blur()
                    this.callback(text)
                }
            })
    }

    _onKeyPress(e) {
        const { currentIndex } = this.state
        e.nativeEvent.key === 'Backspace' && this._setFocus(currentIndex > 0 ? (currentIndex - 1) : currentIndex)
    }

    _setFocus(index, pressed) {
        const { value } = this.state
        this.callbackClearText && this.callbackClearText()
        this.setState(
            {
                value: value.length >= index && value.substring(0, index),
                currentIndex: index
            }, () => this._defineInputToFocus(pressed))
    }

    _defineInputToFocus(pressed) {
        const { currentIndex } = this.state;

        if (pressed) {
            this.ghostInput.blur();
            setTimeout(() => this.ghostInput.focus(), 1);
        } else {
            this.ghostInput.focus()
        }

        this._clearAllReferencesFocus()
        this._setAllReferencesValues()
        this.cellsReferences[currentIndex].setFocus()
    }

    _clearAllReferencesFocus() {
        for (let i = 0; i < this.segmentedTextType.size; i++) {
            this.cellsReferences[i].clearFocus()
        }
    }

    _setAllReferencesValues() {
        const { value } = this.state;
        for (let i = 0; i < this.segmentedTextType.size; i++) {
            value.length > 0 && this.cellsReferences[i].setContent(value.charAt(i))
        }
    }

    _clearText() {
        this.ghostInput.clear()
        this.setState({ value: '' }, () => {
            for (let i = 0; i < this.segmentedTextType.size; i++) {
                this.cellsReferences[i].setContent('')
            }
        })
    }

    renderCells() {
        let cells = []
        for (let i = 0; i < this.segmentedTextType.size; i++) {
            cells.push(
                <SegmentedTextCell
                    ref={(ref) => this.cellsReferences[i] = ref}
                    height={this.segmentedTextType.height}
                    width={this.segmentedTextType.width}
                    isTwoDigits={this.segmentedTextType == SegmentedTextType.TWODIGITS}
                    isSixDigits={this.segmentedTextType == SegmentedTextType.SIXDIGITS}
                    onPress={() => this._setFocus(i, true)}
                />
            )
        }
        return cells;
    }

    render() {
        const { value } = this.state;
        const { errorMessage } = this.props;
        return (
            <View>
                <GenericTextComponent
                    styleguideItem={GenericTextComponent.StyleguideItem.HEADING}
                    text={this.title}
                    color={colors.black}
                />
                <TextInput
                    ref={(ref) => this.ghostInput = ref}
                    style={styles.ghostInput}
                    keyboardType={"numeric"}
                    onChangeText={(text) => this._onChangeText(text)}
                    onKeyPress={(e) => this._onKeyPress(e)}
                    maxLength={this.segmentedTextType.size}
                    value={value} />
                <View style={this.segmentedTextType == SegmentedTextType.TWODIGITS ? styles.twoDigitsContainer : styles.baseContainer}>
                    {this.renderCells()}
                </View>
                {!!this.text && <GenericTextComponent text={this.text} color={colors.midnightBlack} />}
                {!!errorMessage && <View style={{ paddingVertical: verticalScale(10) }}><RedErrorTextComponent text={errorMessage} /></View>}
                {!!this.linkText && !!this.linkPress && <TextLinkButtonComponent
                    styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
                    color={colors.pumpkinOrange}
                    text={this.linkText}
                    onPress={this.linkPress}
                />}
            </View>
        );
    }
}

SegmentedTextComponent.SegmentedTextType = SegmentedTextType;

SegmentedTextComponent.defaultProps = {
};

SegmentedTextComponent.propTypes = {
    segmentedTextType: PropTypes.oneOf(Object.keys(SegmentedTextType)),
    callback: PropTypes.func
};

const styles = StyleSheet.create({
    baseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(10),
        marginBottom: verticalScale(10)
    },
    twoDigitsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(10),
        marginBottom: verticalScale(10)
    },
    ghostInput: {
        position: 'absolute',
        opacity: 0
    }
});