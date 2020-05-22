import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store/index'
import routes from './routes/index.js'
import { HashRouter } from 'react-router-dom';
import { DataProvider } from "./application/Singers/data";

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle/>
                <IconStyle/>
                <DataProvider>
                    {renderRoutes(routes)}
                </DataProvider>
            </HashRouter>
        </Provider>
    )
}

export default App;
