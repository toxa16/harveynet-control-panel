import React from 'react';

/**
 * Machile list page component. 
 */
export default function MachineList() {
  return (
    <section>
      <h2>Machine List</h2>

      <div className="row mt-5">
        <div className="col-12 col-lg-8">
          <ul className="list-unstyled" data-cy="machine-list">
            <li className="mb-3">
              <div className="card">
                <div className="card-body">
                  machine1
                </div>
              </div>
            </li>
            <li className="mb-3">
              <div className="card">
                <div className="card-body">
                  machine2
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
