import { RectNode, RectNodeModel } from '@logicflow/core';
import { NodeTextTheme } from '@logicflow/core/types/constant/DefaultTheme';

class MysqlAdapterModel extends RectNodeModel {
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
            message: "节点必须为csvTransformer",
            validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
                return sourceNode.type === 'csvTransformer';
            }
        }
        const rule2 = {
            message: "不能连接自己",
            validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
                return sourceNode.id !== targetNode.id;
            }
        }

        const rule3 = {
            message: "必须从左侧的锚点进行连接",
            validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
                return sourceAnchor.name === 'left';
            }
        }

        this.sourceRules.push(rule1, rule2, rule3);

        this.width = 100;
        this.height = 100;
        this.radius = 10;
    }

    getAnchorStyle(anchorInfo: any) {
        const style = super.getAnchorStyle(anchorInfo);
        if (anchorInfo.type === "right") {
            style.fill = "none";
            style.stroke = "transparent";
            style.hover.stroke = "transpanrent";
            style.className = "lf-hide-default";
        } else {
            style.fill = "green";
        }
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
                edgeAddable: false, // 控制锚点是否可以从此锚点手动创建连线。默认为true。
                id: `${id}_1`,
            },
        ];
    }
}

class MysqlAdapterView extends RectNode { }

export default {
    type: 'mysqlAdapter',
    view: MysqlAdapterView,
    model: MysqlAdapterModel,
};