import React, {useState} from 'react';
import './App.css';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {TodoApp} from "./components/TodoApp";

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme, colors: {
                    dark: [
                        '#d5d7e0',
                        '#acaebf',
                        '#8c8fa3',
                        '#666980',
                        '#4d4f66',
                        '#34354a',
                        '#2b2c3d',
                        '#0B1121',
                        '#0c0d21',
                        '#01010a',
                    ],
                },

            }} withGlobalStyles withNormalizeCSS>
                <TodoApp/>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
