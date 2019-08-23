import React from 'react';
import BaseScene from 'memenet/src/screens/baseScene';
import { CriticalErrorViewComponent } from 'memenet/src/components/presentation';
import PropTypes from 'prop-types';
import { registerLoginStack } from '..';
import ErrorSceneType from 'memenet/src/config/error/errorSceneType';

export default class ErrorScene extends BaseScene {
    constructor(props) {
        super({
            childComponentId: props.componentId,
            isModalScreen: props.errorType.isModalScreen,
            containerType: BaseScene.ContainerType.WHITESCROLLVIEW,
            showCloseButton: props.errorType.showCloseButton,
            ...props
        });

        this.navigationClose = () => {
            switch (props.errorType.type) {
                case 'BLOCKEDACCOUNT':
                    registerLoginStack()
                    break;
                default:
                    this.dismissModal()
            }
        }

        this.errorType = props.errorType
        this.errorMsg = props.errorMsg

    }


    render() {
        return super.render(
            <CriticalErrorViewComponent
                titleText={this.errorType.title}
                contentText={this.errorMsg || this.errorType.text}
                buttonText={(this.errorType.type !== 'BLOCKEDACCOUNT' && this.errorType.type !== 'BLOCKEDACCOUNTKYC') ? this.errorType.buttonText : ''}
                onPress={() => (this.errorType.type !== 'BLOCKEDACCOUNT' && this.errorType.type !== 'BLOCKEDACCOUNTKYC')}
            />
        );
    }
}

ErrorScene.propTypes = {
    errorType: PropTypes.oneOf(Object.keys(ErrorSceneType))
};