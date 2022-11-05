import React, {useEffect} from 'react';
import {Button, Container, Stack, Table, useMantineTheme} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../reduxStore/store";
import {filterTask, FilterValuesType} from "../reducers/tasksReducer";
import {HeaderApp} from "./HeaderApp";
import {Task} from "./Task";
import {FieldAddingTask} from "./FieldAddingTask";


export const TodoApp = React.memo(() => {

    const tasks = useAppSelector(state => state.tasks.tasks)
    const filter = useAppSelector(state => state.tasks.filterType)
    const keysTasks = Object.keys(tasks)
    const theme = useMantineTheme()
    const dispatch = useAppDispatch()

    // const onChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.code === 'Enter' && !isWhiteSpace(e.currentTarget.value)) {
    //         dispatch(addTask({isDone: false, title: e.currentTarget.value}))
    //         e.currentTarget.value = ''
    //     }
    // }
    // const onClickHandler = (e: ChangeEvent<HTMLButtonElement>) => {
    //
    // }


    const filterTasksHandler = (filterType: FilterValuesType) => {
        dispatch(filterTask({filterType}))
    }
    useEffect(() => {
        dispatch(filterTask({filterType: 'all'}))
    }, [])

    return (
        <div onTouchStart={e => console.log(e)}>
            <HeaderApp/>
            <Container size={'xs'} pt={70}>
                <FieldAddingTask/>
                {/*<Input.Wrapper description="This field cannot be empty!!!">*/}
                {/*    <Input placeholder={'what needs to be done?'}*/}
                {/*           rightSection={*/}
                {/*               <ActionIcon variant={'subtle'}>*/}
                {/*                   <IconSquarePlus stroke={1.7}*/}
                {/*                                   color={theme.colors.blue[7]}/>*/}
                {/*               </ActionIcon>*/}
                {/*           }*/}
                {/*           onKeyPress={onChangeHandler}/>*/}
                {/*</Input.Wrapper>*/}
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

