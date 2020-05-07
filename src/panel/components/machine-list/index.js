import React, { useEffect, useState } from 'react';


const machines0 = [
  {
    machineId: 'machine1',
  },
  /*{
    machineId: 'machine2',
  },
  {
    machineId: 'machine3',
  },*/
];


const machineCardStyle = {
  cursor: 'pointer',
};


const ownershipServerUrl = process.env.REACT_APP_OWNERSHIP_SERVER_URL ||
  'https://harveynet-ownership-server.herokuapp.com';


/**
 * Machine list page component. 
 */
export default function MachineList({ machines = machines0, onMachineSelect }) {
  /*const [machines, setMachines] = useState([]);

  useEffect(() => {
    console.log('loading machines...')
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(x => x.trim().match(/^access_token=/));
    const token = tokenCookie.split('=')[1];
    const authHeader = `Bearer ${token}`;
    fetch(`${ownershipServerUrl}/me/machines`, {
      headers: {
        authorization: authHeader,
      }
    })
      .then(res => res.json())
      .then(_machines => setMachines(_machines));
  }, []);*/

  function renderMachines() {
    return machines.map((x, i) => {
      return (
        <li
          key={i}
          className="mb-3"
          style={machineCardStyle}
          onClick={ e => onMachineSelect(x) }
        >
          <div className="card" data-testid="machine-card">
            <div className="card-body">
              { x.machineId }
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
          <ul className="list-unstyled">
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
