import React, {KeyboardEvent, useEffect} from 'react';
import {Button, Container, Input, Stack, Table} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../reduxStore/store";
import {addTask, filterTask, FilterValuesType} from "../reducers/tasksReducer";
import {HeaderApp} from "./HeaderApp";
import {Task} from "./Task";
import {isWhiteSpace} from "../helperFunctions/validateWhiteSpace";


// function isTouchEvent(e: React.TouchEvent | React.KeyboardEvent): e is React.TouchEvent {
//     return e && 'touches' in e;
// }

// function isMouseEvent(e: React.TouchEvent | React.MouseEvent): e is React.MouseEvent {
//     return e && 'screenX' in e;
// }



export const TodoApp = React.memo(() => {

    const tasks = useAppSelector(state => state.tasks.tasks)
    const filter = useAppSelector(state => state.tasks.filterType)
    const keysTasks = Object.keys(tasks)
    const dispatch = useAppDispatch()

    const onChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && !isWhiteSpace(e.currentTarget.value)) {
            dispatch(addTask({isDone: false, title: e.currentTarget.value}))
            e.currentTarget.value = ''
        }
    }


    const filterTasksHandler = (filterType: FilterValuesType) => {
        dispatch(filterTask({filterType}))
    }
    useEffect(() => {
        dispatch(filterTask({filterType: 'all'}))
    }, [])

    return (
        <div>
            <HeaderApp/>
            <Container size={'xs'} pt={70}>
                <Input.Wrapper description="This field cannot be empty!!!">
                    <button onTouchStart={(e) => {console.log(e)}}></button>
                    <Input placeholder={'what needs to be done?'}
                           onKeyPress={onChangeHandler}/>
                </Input.Wrapper>
                <Stack align={'center'} justify={'center'} mt={50}>
                    <Button.Group>
                        <Button variant={filter === 'all' ? 'filled' : 'default'}
                                onClick={() => filterTasksHandler('all')}>All</Button>
                        <Button variant={filter === 'active' ? 'filled' : 'default'}
                                onClick={() => filterTasksHandler('active')}>Active</Button>
                        <Button variant={filter === 'completed' ? 'filled' : 'default'}
                                onClick={() => filterTasksHandler('completed')}>Completed</Button>
                    </Button.Group>
                    <Table captionSide={'top'}>
                        <caption>Your Tasks</caption>
                        <tbody>
                        {
                            keysTasks.map(idTask => {
                                return (
                                    <Task key={idTask} title={tasks[idTask].title} isDone={tasks[idTask].isDone}
                                          id={idTask}/>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Stack>
            </Container>
        </div>
    );
});

