import {Tree, TreeProps} from "antd";
import {DataNode} from "antd/lib/tree";
import {
    DownOutlined
} from '@ant-design/icons';
import {optionTreeDatas2DataNodes} from "../utils/converter";

function OptionsTree() {
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onDragStart: TreeProps['onDragStart'] = info => {
        console.log(info);
        info.event.dataTransfer.setData('opt', `${info.node.key}`)
    };

    const optionTreeData = [
        {
            "title": "My Data",
            "id": "636209c8fc13ae565c00064a",
            "children": [
                {
                    "title": "DeviceReach-ppid",
                    "id": "636209c8fc13ae565c00064b",
                    "parent": "636209c8fc13ae565c00064a",
                    "children": [
                        {
                            "title": "AdultComposition",
                            "id": "636209c8fc13ae565c00064c",
                            "parent": "636209c8fc13ae565c00064b"
                        },
                        {
                            "title": "AdultComposition111",
                            "id": "636209c8fc13ae565c00064d",
                            "parent": "636209c8fc13ae565c00064b"
                        },
                        {
                            "title": "Age",
                            "id": "636209c8fc13ae565c00064e",
                            "parent": "636209c8fc13ae565c00064b"
                        },
                        {
                            "title": "Education",
                            "id": "636209c8fc13ae565c00064f",
                            "parent": "636209c8fc13ae565c00064b"
                        },
                        {
                            "title": "Gender",
                            "id": "636209c8fc13ae565c000650",
                            "parent": "636209c8fc13ae565c00064b"
                        },
                        {
                            "title": "PresenceOfChild",
                            "id": "636209c8fc13ae565c000651",
                            "parent": "636209c8fc13ae565c00064b"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Analytics Environment Data",
            "id": "636209c8fc13ae565c000652",
            "children": [
                {
                    "title": "Business User",
                    "id": "636209c8fc13ae565c000658",
                    "parent": "636209c8fc13ae565c000652"
                }
            ]
        },
        {
            "title": "Saved Audiences",
            "id": "636209c8fc13ae565c000653",
            "children": [
                {
                    "title": "First Audience",
                    "id": "636209c8fc13ae565c000656",
                    "parent": "636209c8fc13ae565c000653"
                },
                {
                    "title": "Second Audience",
                    "id": "636209c8fc13ae565c000657",
                    "parent": "636209c8fc13ae565c000653"
                }
            ]
        },
        {
            "title": "LookLike Group",
            "id": "636209c8fc13ae565c000659",
            "children": [
                {
                    "title": "Look",
                    "id": "636209c8fc13ae565c000654",
                    "parent": "636209c8fc13ae565c000659"
                },
                {
                    "title": "Like",
                    "id": "636209c8fc13ae565c000655",
                    "parent": "636209c8fc13ae565c000659"
                }
            ]
        }
    ]
    const treeData = optionTreeDatas2DataNodes(optionTreeData);

    return (
        <>
            <Tree
                onDragStart={onDragStart}
                draggable={(nodeData: DataNode) => {
                    return !Boolean(nodeData?.children?.length)
                }}
                showIcon={true}
                onSelect={onSelect}
                defaultExpandedKeys={['0-0-0']}
                switcherIcon={<DownOutlined/>}
                treeData={treeData}/>
        </>
    )
}

export default OptionsTree;