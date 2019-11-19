import React from 'react';

const machineCardStyle = {
  cursor: 'pointer',
};

/**
 * Machine list page component. 
 */
export default function MachineList({ machines, onMachineSelect }) {
  function renderMachines() {
    return machines.map((x, i) => {
      return (
        <li
          key={i}
          className="mb-3"
          style={machineCardStyle}
          onClick={ e => onMachineSelect(x) }
        >
          <div className="card">
            <div className="card-body">
              { x.id }
            </div>
          </div>
        </li>
      );
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

      <div className="text-secondary mt-5">
        <p>
          This is <b>machine list view</b>. 
          Here we can see machines owned by current user.
        </p>
        <p>Click on a machine to navigate to the machine control screen.</p>
      </div>
    </section>
  );
}
