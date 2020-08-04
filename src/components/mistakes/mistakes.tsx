import * as React from 'react';

import {IMistakesProps} from './types';

const Mistakes: React.FunctionComponent<IMistakesProps> = (props: IMistakesProps) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  const getMistake = (it, i) => <div key={`mistake-${i}`} className="wrong" />;

  const renderMistakes = () => mistakes.map(getMistake);

  return (
    <div className="game__mistakes">
      {renderMistakes()}
    </div>
  );
};

export default Mistakes;
