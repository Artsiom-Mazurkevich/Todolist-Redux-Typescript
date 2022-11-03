import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {Input, ActionIcon} from "@mantine/core";
import {IconCheck} from "@tabler/icons";
import {useAppDispatch} from "../reduxStore/store";
import {changeTaskTitle} from "../reducers/tasksReducer";


type EditableTextPropsType = {
    text: string
    isEdit: boolean
    editMode: (value: boolean) => void
    idTask: string
}


export const EditableText: FC<EditableTextPropsType> = React.memo(({text, isEdit, editMode, idTask}) => {

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState(text);
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const disableEditModeHandler = useCallback((id: string = idTask, newTitle: string = title) => {
        editMode(false)
        dispatch(changeTaskTitle({id, newTitle}))
    }, [idTask, title])


    return (
        <div style={{maxWidth: '370px', wordBreak: 'break-word'}}>
            {isEdit
                ? <Input value={title}
                         onChange={changeTitle}
                         onBlur={() => disableEditModeHandler()}
                         autoFocus
                         rightSection={
                             <div>
                                 <ActionIcon onClick={() => disableEditModeHandler()}>
                                     <IconCheck color={'#37B24D'} size={25}
                                                cursor={'pointer'} style={{display: 'block'}}/>
                                 </ActionIcon>
                             </div>
                         }/>
                : text
            }
        </div>
    );
});

