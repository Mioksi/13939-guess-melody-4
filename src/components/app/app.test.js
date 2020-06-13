import React from "react";
import renderer from "react-test-renderer";

import App from "./app.jsx";
import {Settings} from '../../common/consts';

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      errorsCount={Settings.ERRORS_COUNT}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
