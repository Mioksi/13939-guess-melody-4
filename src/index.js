import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import {Settings} from './common/consts';
import questions from './mocks/questions';

ReactDOM.render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
