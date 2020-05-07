const machines0 = [
  {
    machineId: 'test-machine-1',
  },
  {
    machineId: 'test-machine-2',
  },
];


export default class OwnershipClient {
  getUserMachines = async () => {
    return machines0;
  }
}
