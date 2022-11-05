import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ActionIcon, Input, useMantineTheme} from "@mantine/core";
import {IconSquarePlus} from "@tabler/icons";
import {isWhiteSpace} from "../helperFunctions/validateWhiteSpace";
import {addTask} from "../reducers/tasksReducer";
import {useAppDispatch} from "../reduxStore/store";


export const FieldAddingTask = React.memo( () => {

    const theme = useMantineTheme()
    const dispatch = useAppDispatch()
    const [showBtn, setShowBtn] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const addTaskToList = () => {
        dispatch(addTask({isDone: false, title: value}))
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && !isWhiteSpace(value)) {
            // dispatch(addTask({isDone: false, title: e.currentTarget.value}))
            addTaskToList()
            setValue('')
            setShowBtn(false)
        }
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (!isWhiteSpace(e.currentTarget.value)) setShowBtn(true)
        else setShowBtn(false)
    }


    const onClickHandler = () => {
        if (!isWhiteSpace(value)) {
            addTaskToList()
            setValue('');
            setShowBtn(false)
        }
    }



    return (
        <Input.Wrapper description="This field cannot be empty!!!">
            <Input placeholder={'what needs to be done?'}
                   value={value}
                   onChange={onChangeHandler}
                   rightSection={ showBtn &&
                       <ActionIcon variant={'subtle'} onClick={() => onClickHandler() }>
                           <IconSquarePlus stroke={1.7}
                                           color={theme.colors.blue[7]}/>
                       </ActionIcon>
                   }
                   onKeyPress={onKeyPressHandler}/>
        </Input.Wrapper>
    );
});

