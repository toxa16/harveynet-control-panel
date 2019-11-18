import React from 'react';

/**
 * Machine list page component. 
 */
export default function MachineList({ machines }) {
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
      <h2>My Machines</h2>
      <div className="row mt-5">
        <div className="col-12 col-lg-8">
          <ul className="list-unstyled" data-cy="machine-list">
            { renderMachines() }
          </ul>
        </div>
      </div>

      <div className="text-secondary">
        <p className="mt-5">This is machine list view.</p>
        <p>Here we can see machines owned by current user.</p>
      </div>
    </section>
  );
}
