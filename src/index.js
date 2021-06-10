import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { colors, fonts, components } from './database';
import { ScrollToTop } from './ScrollToTop';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = extendTheme({
	colors,
	fonts,
	components,
});

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Router>
				<Provider store={store}>
					<App />
					<ScrollToTop />
				</Provider>
			</Router>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
