import React from 'react';
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Panel from '..';
import panel from '../redux/reducer';


// fixture
const testMachines = [
  {
    machineId: 'test-machine-1',
  },
  {
    machineId: 'test-machine-2',
  },
];

// init redux
const store = createStore(combineReducers({ panel }));


test('Rendering user machines', () => {
  const { getAllByTestId } = render(
    <Provider store={store}>
      <Panel />
    </Provider>
  );
  const machineCards = getAllByTestId('machine-card');
  const actualMachines = machineCards.map(x => {
    const machineId = x
      .querySelector('[data-testid="machine-card__machine-id"]')
      .innerHTML;
    return { machineId };
  });
  expect(actualMachines).toEqual(testMachines);
});
