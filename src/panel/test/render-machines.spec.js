import React from 'react';
import { render } from '@testing-library/react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import Panel from '..';
import panel from '../redux/reducer';
import panelSaga from '../redux/saga';


// fixture
const testMachines = [
  {
    machineId: 'test-machine-1',
  },
  {
    machineId: 'test-machine-2',
  },
];

const ownershipClientStub = {
  getUserMachines: async () => testMachines,
};

// init redux
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ panel }),
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(panelSaga, ownershipClientStub);


test.skip('Rendering user machines', () => {
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
