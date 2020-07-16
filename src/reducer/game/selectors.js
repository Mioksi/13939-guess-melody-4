import NameSpace from '../name-space';

export const getStep = (state) => state[NameSpace.GAME].step;

export const getMistakes = (state) => state[NameSpace.GAME].mistakes;

export const getMaxMistakes = (state) => state[NameSpace.GAME].maxMistakes;
