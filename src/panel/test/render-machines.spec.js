import React from 'react';
import { render } from '@testing-library/react';

import Panel from '..';


const testMachines = [
  {
    machineId: 'test-machine-1',
  },
  {
    machineId: 'test-machine-2',
  },
];


test('Rendering user machines', () => {
  const { getAllByTestId } = render(<Panel />);
  const machineCards = getAllByTestId('machine-card');
  const actualMachines = machineCards.map(x => {
    const machineId = x
      .querySelector('[data-testid="machine-card__machine-id"]')
      .innerHTML;
    return { machineId };
  });
  expect(actualMachines).toEqual(testMachines);
});
