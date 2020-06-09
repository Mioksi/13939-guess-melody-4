import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import {Settings} from './common/consts';

ReactDOM.render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
    />,
    document.querySelector(`#root`)
);
