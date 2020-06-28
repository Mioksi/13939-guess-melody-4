import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from './components/app/app.jsx';
import {Settings} from './common/consts';
import questions from './mocks/questions';
import {reducer} from "./reducer.js";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App
        errorsCount={Settings.ERRORS_COUNT}
        questions={questions}
      />
    </Provider>,
    document.querySelector(`#root`)
);
