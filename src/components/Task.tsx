import React, {FC, useState} from 'react';
import {ActionIcon, Checkbox, Group} from "@mantine/core";
import {IconPencil, IconTrash} from "@tabler/icons";
import {useAppDispatch} from "../reduxStore/store";
import {changeStatusTask, deleteTask} from "../reducers/tasksReducer";
import {EditableText} from "./EditableText";
import {motion} from "framer-motion";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}


export const Task: FC<TaskPropsType> = React.memo(({title, isDone, id}) => {

    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState<boolean>(false)
    const editModeHandler = (value: boolean) => {
        setEditMode(value)
    }


    const animateTask = {
        hidden: {
            x: -250,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        }
    }


    return (
        <motion.tr variants={animateTask}
                   initial={'hidden'}
                   whileInView={'visible'}
                   exit={{x: +250, opacity: 0, transition: {bounce: 0}}}
                   viewport={{once: true}}>
            <td width={30} style={{paddingTop: '13px'}}>
                <Checkbox checked={isDone} onChange={(e) => {
                    dispatch(changeStatusTask({id, newStatus: e.currentTarget.checked}))
                }}/>
            </td>
            <td width={370}>
                <EditableText idTask={id} isEdit={editMode} text={title} editMode={editModeHandler}/>
            </td>
            <td>
                <Group noWrap position={'right'}>
                    {!editMode && <ActionIcon color={'green.7'} onClick={() => setEditMode(true)}>
                        <IconPencil/>
                    </ActionIcon>}
                    <ActionIcon color={'red.7'} onClick={() => dispatch(deleteTask({id}))}>
                        <IconTrash/>
                    </ActionIcon>
                </Group>
            </td>
        </motion.tr>
    )
})

