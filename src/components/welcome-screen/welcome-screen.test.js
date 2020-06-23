import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen.jsx';
import {Settings} from '../../common/consts';

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      errorsCount={Settings.ERRORS_COUNT}
      onWelcomeButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
