import { RectNode, RectNodeModel } from '@logicflow/core';
import { NodeTextTheme } from '@logicflow/core/types/constant/DefaultTheme';

class CsvTransformerModel extends RectNodeModel {
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

    getTextStyle(): NodeTextTheme {
        const style = super.getTextStyle();
        style.fontSize = 16;
        style.fill = '#000';
        return style;
    }

    initNodeData(data: any): void {
        super.initNodeData(data);
        this.text.draggable = false;
        this.text.editable = false;
        const rule1 = {
            message: "节点必须为csvReader",
            validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
                return sourceNode.type === 'csvReader';
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

    getAnchorStyle(anchorInfo: any) {
        const style = super.getAnchorStyle(anchorInfo);
        style.fill = "green";
        return style;
    }

    getDefaultAnchor() {
        const { width, height, x, y, id } = this;
        return [
            {
                x: x - width / 2,
                y,
                type: "left",
                id: `${id}_0`,
            },
            {
                x: x + width / 2,
                y,
                type: "right",
                id: `${id}_1`,
            },
        ];
    }
}

class CsvTansformerView extends RectNode { }

export default {
    type: 'csvTransformer',
    view: CsvTansformerView,
    model: CsvTransformerModel,
};