import React from 'react';
import { navigate } from '@reach/router';


function ErrorView() {
  return (
    <div className="text-danger">Error occurred.</div>
  );
}

function LoadingView() {
  return (
    <div className="text-muted">Loading...</div>
  );
}


/**
 * Machine list page component. 
 */
export default function MachineListView({ machines, machinesError, onMachineSelect }) {
  function renderMachines() {
    return machines.map((x, i) => {
      return (
        <li
          key={i}
          className="mb-3"
          style={{ cursor: 'pointer' }}
          onClick={ /*e => onMachineSelect(x)*/ e => navigate('panel/machine')  }
        >
          <div className="card" data-testid="machine-card">
            <div className="card-body">
              <span data-testid="machine-card__machine-id">
                { x.machineId }
              </span>
            </div>
          </div>
        </li>
      );
    });
  }

  function renderBody() {
    if (machinesError) {
      return <ErrorView />;
    }
    if (!machines) {
      return <LoadingView />;
    }
    return (
      <ul className="list-unstyled">
        { renderMachines() }
      </ul>
    );
  }

  return (
    <section>
      <h2>My Machines</h2>
      <div className="row mt-5">
        <div className="col-12 col-lg-8">
          { renderBody() }
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
