import * as React from 'react';
import * as renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen';
import {Settings} from '../../common/consts';
import {noop} from '../../common/utils'

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      errorsCount={Settings.ERRORS_COUNT}
      onWelcomeButtonClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
