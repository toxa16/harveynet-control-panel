import React from 'react';

const machines = [
  { id: 'machine1' },
  { id: 'machine2' },
];

/**
 * Machile list page component. 
 */
export default function MachineList() {
  function renderMachines() {
    return machines.map((x, i) => {
      return <li key={i} className="mb-3">
        <div className="card">
          <div className="card-body">
            { x.id }
          </div>
        </div>
      </li>;
    });
  }

  return (
    <section>
      <h2>Machine List</h2>

      <div className="row mt-5">
        <div className="col-12 col-lg-8">
          <ul className="list-unstyled" data-cy="machine-list">
            { renderMachines() }
          </ul>
        </div>
      </div>
    </section>
  );
}
