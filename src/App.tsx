import './App.css';
import {createTheme, ThemeProvider} from '@mui/material';
import AvailableStock from './screens/AvailableStock/AvailableStock.tsx';
import CssBaseline from '@mui/material/CssBaseline';
function App() {
	const theme = createTheme({
		typography: {
			fontFamily: '"Montserrat", sans-serif',
		},
		palette: {
			background: {
				default: '#F1F2F6',
			},
		},
	});
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AvailableStock></AvailableStock>
			</ThemeProvider>
		</>
	);
}

export default App;
