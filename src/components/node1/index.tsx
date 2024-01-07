import { RectNode, RectNodeModel } from '@logicflow/core';

class Node1Model extends RectNodeModel {
    getNodeStyle() {
        const style = super.getNodeStyle();
        style.fill = '#fff';
        style.stroke = 'blue';
        style.strokeDasharray = '3 3'
        return style;
    }
}

class Node1View extends RectNode { }

export default {
    type: 'node1',
    view: Node1View,
    model: Node1Model,
};