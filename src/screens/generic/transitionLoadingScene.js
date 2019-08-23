import React from 'react';
import BaseScene from 'memenet/src/screens/baseScene';
import { OrangeModalLoadingComponent } from 'memenet/src/components/presentation';

export default class TransitionLoadingScene extends BaseScene {
    constructor(props) {
        super({
            childComponentId: props.componentId,
            isModalScreen: true,
            containerType: BaseScene.ContainerType.ORANGEKEYBOARDAVOIDVIEW,
            ...props
        });
        this.text = props.text;
        this.showDotzBalls = props.showDotzBalls;
    }

    render() {
        return super.render(
            <OrangeModalLoadingComponent text={this.text} showDotzBalls={this.showDotzBalls} />
        );
    }
}