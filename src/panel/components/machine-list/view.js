import React from 'react';
import { Link } from '@reach/router';


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
export default function MachineListView({ machines }) {
  function renderMachines() {
    return machines.map((x, i) => {
      return (
        <li
          key={i}
          className="mb-3"
          style={{ cursor: 'pointer' }}
        >
          <Link to={`machine/${x.machineId}`} className="card" data-testid="machine-card">
            <div className="card-body">
              <span data-testid="machine-card__machine-id">
                { x.machineId }
              </span>
            </div>
          </Link>
        </li>
      );
    });
  }

  function renderBody() {
    if (!machines) {
      return <LoadingView />;
    }
    if (machines instanceof Error) {
      return <ErrorView error={machines} />
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
