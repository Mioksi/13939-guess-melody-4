import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import GameOverScreen from './game-over-screen';

import {noop} from '../../common/utils';

it(`Should GameOverScreen render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <GameOverScreen
            onReplayButtonClick={noop}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
