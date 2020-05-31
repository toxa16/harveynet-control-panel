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

function MachineCard(machine) {
  const { machineId, state } = machine;

  function renderStatus() {
    if (state.online) {
      return <b className="text-success">Online</b>;
    }
    return <span className="text-muted">Offline</span>;
  }

  return (
    <div className="card" data-testid="machine-card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <b data-testid="machine-card__machine-id">
            { machineId }
          </b>
          { renderStatus() }
        </div>
      </div>
    </div>
  );
}

function MachineButton({ machine, onClick }) {
  const style = {
    display: 'block',
    width: '100%',
    border: 'none',
    padding: 0,
    background: 'none',
  };
  return (
    <button
      style={style}
      onClick={ e => onClick(machine) }
    >
      <MachineCard {...machine} />
    </button>
  );
}


/**
 * Machine list page component. 
 */
export default function MachineListView({ machines, onMachineSelect }) {
  function handleMachineButtonClick(machine) {
    const { machineId } = machine;
    onMachineSelect(machineId);
    navigate(`/panel/machine/${machineId}`);
  }

  function renderMachines() {
    return machines.map((x, i) => {
      return (
        <li key={i} className="mb-3">
          <MachineButton machine={x} onClick={handleMachineButtonClick} />
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
