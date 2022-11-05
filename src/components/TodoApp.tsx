import React, {useEffect} from 'react';
import {Button, Container, Stack, Table} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../reduxStore/store";
import {filterTask, FilterValuesType} from "../reducers/tasksReducer";
import {HeaderApp} from "./HeaderApp";
import {Task} from "./Task";
import {FieldAddingTask} from "./FieldAddingTask";
import {AnimatePresence} from "framer-motion";


export const TodoApp = React.memo(() => {

    const tasks = useAppSelector(state => state.tasks.tasks)
    const filter = useAppSelector(state => state.tasks.filterType)
    const keysTasks = Object.keys(tasks)
    const dispatch = useAppDispatch()


    const filterTasksHandler = (filterType: FilterValuesType) => {
        dispatch(filterTask({filterType}))
    }
    useEffect(() => {
        dispatch(filterTask({filterType: 'all'}))
    }, [dispatch])

    return (
        <div>
            <HeaderApp/>
            <Container size={'xs'} pt={70}>
                <FieldAddingTask/>
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
                        <AnimatePresence>
                            {
                                keysTasks.map(idTask => {
                                    return (
                                        <Task key={idTask} title={tasks[idTask].title} isDone={tasks[idTask].isDone}
                                              id={idTask}/>
                                    )
                                })
                            }
                        </AnimatePresence>
                        </tbody>
                    </Table>
                </Stack>
            </Container>
        </div>
    );
});

