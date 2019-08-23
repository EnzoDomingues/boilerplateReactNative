import React from 'react';
import BaseScene from 'memenet/src/screens/baseScene';
import { GenericTransitionViewComponent } from 'memenet/src/components/presentation';

export default class TransitionScene extends BaseScene {
    constructor(props) {
        super({
            childComponentId: props.componentId,
            isModalScreen: true,
            containerType: BaseScene.ContainerType.ORANGEKEYBOARDAVOIDVIEW,
            ...props
        });
        this.title = props.title;
        this.subtitle = props.subtitle;
    }

    render() {
        return super.render(
            <GenericTransitionViewComponent title={this.title} subtitle={this.subtitle} />
        );
    }
}