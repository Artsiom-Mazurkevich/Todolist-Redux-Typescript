import React from 'react';
import {ActionIcon, Container, Header, Text, useMantineColorScheme} from "@mantine/core";
import {IconMoonStars, IconSun} from "@tabler/icons";

export const HeaderApp = () => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Header height={60} p={'md'}>
            <Container size={'md'} style={{display: 'flex', justifyContent: 'space-between'}}>
                <Text>TodoApp</Text>
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <IconSun size={18}/> : <IconMoonStars size={18}/>}
                </ActionIcon>
            </Container>
        </Header>
    );
};

