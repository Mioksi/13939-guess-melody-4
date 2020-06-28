import React from 'react';
import PropTypes from 'prop-types';

const Mistakes = (props) => {
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

Mistakes.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Mistakes;
