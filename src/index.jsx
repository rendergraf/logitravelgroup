import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const theme = extendTheme({
	colors: {
		todo: {
			50: '#F7FAFC',
			100: '#d8efad',
			200: '#E2E8F0',
			300: '#CBD5E0',
			400: '#A0AEC0',
			500: '#324BFF', // Color del Botón Scheme Color
			600: '#001ef5', // Hover del Botón Scheme Color
			700: '#001ef5', // Active Color
			800: '#1A202C',
			900: '#F7F7F7',
			1000: 'rgb(255 255 255 / 80%);',
		},
	},
	components: {
		Button: {
			baseStyle: {
				borderRadius: 58,
				textTransform: 'uppercase',
			},
		},
	},
	styles: {
		global: {
			body: {
				height: '100vh',
				backgroundColor: '#C2E9FB',
				backgroundImage: 'linear-gradient(45deg, #A1C4FD, transparent)',
			},
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
)
