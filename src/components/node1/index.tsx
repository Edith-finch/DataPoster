import { RectNode, RectNodeModel } from '@logicflow/core';

class Node1Model extends RectNodeModel {
    getNodeStyle() {
        const style = super.getNodeStyle();
        const properties = this.properties;
        if (properties.status === 'ready') {
            style.stroke = 'yellow';
        } else if (properties.status === 'complete') {
            style.stroke = 'green';
        } else if (properties.status === 'error') {
            style.stroke = 'red';
        } else {
            style.stroke = 'blue';
        }
        style.fill = '#fff';
        style.strokeDasharray = '3 3'
        return style;
    }

    initNodeData(data: any): void {
        super.initNodeData(data);
        const rule1 = {
            message: "节点必须为node1",
            validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
                return targetNode.type === 'node1';
            }
        }
        const rule2 = {
            message: "不能连接自己",
            validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
                return sourceNode.id !== targetNode.id;
            }
        }

        this.sourceRules.push(rule1, rule2);

        this.width = 100;
        this.height = 100;
        this.radius = 10;
    }
}

class Node1View extends RectNode { }

export default {
    type: 'node1',
    view: Node1View,
    model: Node1Model,
};