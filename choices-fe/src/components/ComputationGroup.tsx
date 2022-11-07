import {
    CloseOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    HolderOutlined
} from "@ant-design/icons";
import styles from './ComputationGroup.module.scss'
import React, {useRef, useState} from "react";
import Selection from "./Selection";
import {useComputationDispatch, useComputationNode} from "../store/hooks";
import {useDrop} from "ahooks";
import {addComputationNode} from "../store/computationSlice";
import {AddComputationNodePayload} from "../store/payload/AddComputationNodePayload";
import {getComputationItem} from "../service/OptionsApi";
import {fetchComputationItemById} from "../store/actions";
import {unwrapResult} from "@reduxjs/toolkit";

interface ComputationGroupProp {
    serialId: string;
}

const ComputationGroup: React.FC<ComputationGroupProp> = ({serialId}) => {
    const [collapse, setCollapse] = useState(false);

    const computationNode = useComputationNode(serialId);
    const selectedOptions = computationNode?.options?.filter(item => item.status) || [];
    const headers = selectedOptions.map(item => item.option?.title || '');
    const dropRef = useRef(null);
    const dispatch = useComputationDispatch();
    const addNewComputationNode = async (id: string, targetSerialId: string, parentSerialId: string) => {
        // console.info('Group invoke')
        // const resultAction = await dispatch(fetchComputationItemById(id))
        // const item = unwrapResult(resultAction)
        const data = [
            {
                "nodeId": "636209c8fc13ae565c00064c",
                "title": "AdultComposition",
                "directory": "My Data / DeviceReach-ppid / AdultComposition",
                "options": [
                    {
                        "id": "5a637756-b36f-47ff-be5a-6e8d55e6b966",
                        "title": "AbbreviatedFamily",
                        "count": 200
                    },
                    {
                        "id": "2d8817a7-3eae-45f9-b67e-157216b7f835",
                        "title": "2Person",
                        "count": 100
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c00064d",
                "title": "AdultComposition111",
                "directory": "My Data / DeviceReach-ppid / AdultComposition111",
                "options": [
                    {
                        "id": "04e82117-f4cc-4e72-a131-b95e26b4e49e",
                        "title": "AbbreviatedFamily",
                        "count": 217
                    },
                    {
                        "id": "be20fa96-e182-462a-99fa-c3760e44ee65",
                        "title": "3Person",
                        "count": 119
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c00064e",
                "title": "Age",
                "directory": "My Data / DeviceReach-ppid / Age",
                "options": [
                    {
                        "id": "25c0c232-333a-438b-b232-d82c4788b6d7",
                        "title": "0",
                        "count": 17
                    },
                    {
                        "id": "b18b468f-e176-40c2-8207-170509d96e62",
                        "title": "1",
                        "count": 11
                    },
                    {
                        "id": "bfd2cae1-bd2b-40ea-9f0a-ec73d38a53ac",
                        "title": "5",
                        "count": 56
                    },
                    {
                        "id": "7f1aa8e9-e791-4df5-97a8-b3fa3f4f064c",
                        "title": "10",
                        "count": 77
                    },
                    {
                        "id": "64de2879-1b2e-43e2-a0a6-aa9323939b4e",
                        "title": "20",
                        "count": 77
                    },
                    {
                        "id": "9c998f63-f19a-4a8a-8a01-984b8ad63a69",
                        "title": "21",
                        "count": 7
                    },
                    {
                        "id": "94c67913-9c78-4085-8e80-b1584d1372db",
                        "title": "20",
                        "count": 77
                    },
                    {
                        "id": "fc086b65-92b4-489e-aebe-b677566ce886",
                        "title": "21",
                        "count": 7
                    },
                    {
                        "id": "cd0db0ad-6c5f-4a83-8cfc-d60a3cd0e2ca",
                        "title": "22",
                        "count": 11
                    },
                    {
                        "id": "93005ae7-614b-4e36-b5f9-db8bc38e69dc",
                        "title": "23",
                        "count": 37
                    },
                    {
                        "id": "f94a2c88-ad5a-48f9-b373-dd20e7c6386a",
                        "title": "24",
                        "count": 3
                    },
                    {
                        "id": "b58d7fe9-f272-4111-8642-1c53366e4a7b",
                        "title": "25",
                        "count": 18
                    },
                    {
                        "id": "7409e346-48b1-4ba8-8042-0a52a8e44281",
                        "title": "26",
                        "count": 121
                    },
                    {
                        "id": "9490afa0-5fe1-4f6d-9f6e-ea0eea032a6c",
                        "title": "27",
                        "count": 357
                    },
                    {
                        "id": "bde87e82-35f8-4eb6-a087-786c501ed17f",
                        "title": "28",
                        "count": 118
                    },
                    {
                        "id": "0afc8717-3176-4403-b651-2a221c82b965",
                        "title": "29",
                        "count": 47
                    },
                    {
                        "id": "85241581-5ac4-45eb-b9f4-4889009fc884",
                        "title": "30",
                        "count": 18
                    },
                    {
                        "id": "7d709331-c556-402d-9bfa-51119c970b51",
                        "title": "31",
                        "count": 211
                    },
                    {
                        "id": "952ae693-0fab-404e-a090-f03319f30dca",
                        "title": "32",
                        "count": 57
                    },
                    {
                        "id": "3a51b8d5-c267-409a-919a-76429468faa4",
                        "title": "33",
                        "count": 8
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c00064f",
                "title": "Education",
                "directory": "My Data / DeviceReach-ppid / Education",
                "options": [
                    {
                        "id": "a577a88d-3e42-47a9-87f8-9056378df2ef",
                        "title": "College",
                        "count": 366
                    },
                    {
                        "id": "1bed59c4-198f-4c09-96cd-26ec5e6062b4",
                        "title": "Graduate",
                        "count": 352
                    },
                    {
                        "id": "f5ad9291-ef39-4176-91c6-7a3e3e5c1dbb",
                        "title": "HighSchool",
                        "count": 260
                    },
                    {
                        "id": "15750543-25d6-4135-a146-28e53b72da2c",
                        "title": "Others",
                        "count": 280
                    },
                    {
                        "id": "8ad4247f-5623-4f67-9042-4b66563094a3",
                        "title": "PHD",
                        "count": 270
                    },
                    {
                        "id": "e1cdebb8-8071-4627-8f04-6c3cd1ae3165",
                        "title": "University",
                        "count": 469
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c000650",
                "title": "Gender",
                "directory": "My Data / DeviceReach-ppid / Gender",
                "options": [
                    {
                        "id": "f128efef-517d-44e9-a5d7-21d7b9838f88",
                        "title": "Male",
                        "count": 87
                    },
                    {
                        "id": "744f5dba-f239-43b0-b451-cdf48ab930f3",
                        "title": "Female",
                        "count": 99
                    },
                    {
                        "id": "e506fa8e-0952-4b84-a45f-fba626cf5b8e",
                        "title": "Unknown",
                        "count": 398
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c000651",
                "title": "PresenceOfChild",
                "directory": "My Data / DeviceReach-ppid / PresenceOfChild",
                "options": [
                    {
                        "id": "11c9ba83-0c9a-4233-980e-815976c08c75",
                        "title": "0",
                        "count": 27
                    },
                    {
                        "id": "e5cadb6a-b166-4aeb-847d-e91be3608202",
                        "title": "1",
                        "count": 33
                    },
                    {
                        "id": "9af36abe-66ee-48d6-a204-04505405a7f7",
                        "title": "2",
                        "count": 22
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c000658",
                "title": "Business User",
                "directory": "Analytics Environment Data / Business User",
                "options": [
                    {
                        "id": "28ef1be1-63cb-4b76-ac56-8b3586d64f07",
                        "title": "110",
                        "count": 207
                    },
                    {
                        "id": "fd793321-e00f-462f-812f-093086250156",
                        "title": "200",
                        "count": 313
                    },
                    {
                        "id": "32d9f87d-891e-4e4f-ac0f-cd0de8403be0",
                        "title": "300",
                        "count": 221
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c000656",
                "title": "First Audience",
                "directory": "Saved Audiences / First Audience",
                "options": [
                    {
                        "id": "c3ef11e7-9628-4c19-817c-16c699530be8",
                        "title": "Yse",
                        "count": 207
                    },
                    {
                        "id": "e389351e-4850-4b99-a0de-35fb6e750e85",
                        "title": "No",
                        "count": 313
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c000657",
                "title": "Second Audience",
                "directory": "Saved Audiences / Second Audience",
                "options": [
                    {
                        "id": "7508fb9d-c0ad-4857-b44b-c09e2b86a6fc",
                        "title": "Yse",
                        "count": 237
                    },
                    {
                        "id": "cd72ef49-767a-4f5e-aa7c-261b5133a913",
                        "title": "No",
                        "count": 13
                    }
                ]
            },
            {
                "nodeId": "636209c8fc13ae565c000654",
                "title": "Look",
                "directory": "LookLike Group / Look",
                "options": [
                    {
                        "id": "7fbde861-5459-4444-b61f-624825a4858b",
                        "title": "Yse",
                        "count": 370
                    },
                    {
                        "id": "d577f5fd-2bcf-4ebf-b960-91d1d6f0a67f",
                        "title": "No",
                        "count": 113
                    }
                ]
            }
        ]
        const item = data.find(i => i.nodeId === id)
        if (item
        ) {
            await dispatch(
                addComputationNode(
                    AddComputationNodePayload.create(
                        parentSerialId, targetSerialId, item
                    )
                )
            )
        }
    }
    useDrop(dropRef, {
        onText: async (text, e) => {
            await addNewComputationNode(text, computationNode?.serialId || '', computationNode?.parentSerialId || '')
        },
        onDrop: (e) => {
            e?.stopPropagation();
            e?.preventDefault();
        }
    });

    const showContent = Boolean(computationNode && !computationNode.isGroupContainerNode)
    console.info({options: computationNode?.options})
    console.info({isGroupContainerNode: showContent})
    return (
        <div ref={dropRef}>
            {showContent &&
                <div className={styles.computation_group}>
                    <div className={styles.computation_group_header}>
                        <HolderOutlined/>
                        <div className={styles.computation_group_header_title}>
                            <span>{`${computationNode?.title || ''}=`}</span>
                            <span>{`${headers.join(',')}`}</span>
                        </div>
                        <div className={styles.computation_group_header_operations}>
                            <div onClick={() => {
                                setCollapse(!collapse)
                            }}>{collapse ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}</div>
                            <CloseOutlined className={styles.computation_group_header_operations_close}/>
                        </div>
                    </div>

                    <div>
                        {
                            !collapse && < >
                                <span
                                    className={styles.computation_group_directory}>{computationNode?.directory || ''}</span>
                                <Selection serialId={serialId} onCheck={(checked, title) => {

                                }}/>
                            </>
                        }
                    </div>
                </div>
            }

            <div className={computationNode?.children?.length ? styles.computation_group_children : ''}>
                {
                    computationNode?.children?.map(item => {
                        return <ComputationGroup serialId={item.serialId} key={item.serialId}/>
                    })
                }
            </div>
        </div>
    )

}

export default ComputationGroup;