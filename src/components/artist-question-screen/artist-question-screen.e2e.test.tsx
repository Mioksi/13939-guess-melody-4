import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {GameType, QuestionArtist} from "../../types";

import ArtistQuestionScreen from './artist-question-screen';

import {noop} from '../../common/utils';

configure({adapter: new Adapter()});

const question: QuestionArtist = {
  type: GameType.ARTIST,
  song: {
    artist: ``,
    src: ``
  },
  answers: [
    {
      artist: `one`,
      picture: `pic-one`,
    },
    {
      artist: `two`,
      picture: `pic-two`,
    },
    {
      artist: `three`,
      picture: `pic-three`,
    },
  ],
};

const mockEvent = {
  preventDefault: noop,
};

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const onAnswer = jest.fn();
  const userAnswer = {
    artist: `one`,
    picture: `pic-one`,
  };

  const screen = shallow(<ArtistQuestionScreen
    onAnswer={onAnswer}
    question={question}
    renderPlayer={() => null}
  />);

  const answerInputs = screen.find(`input`);
  const answerOne = answerInputs.at(0);

  answerOne.simulate(`change`, mockEvent);

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});
