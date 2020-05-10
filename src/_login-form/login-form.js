import React from 'react';

/**
 * Login form component.
 */
export default function LoginForm({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit && onSubmit(e);
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-4">
        <form
          method="post"
          action="#"
          id="login-form"
          onSubmit={handleSubmit}
        >
          <h1>Login</h1>

          <br />

          <div className="form-group">
            <label>Username:</label>
            <input name="username" className="form-control" required />
          </div>

          <br />

          <div>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>

      <div className="col-12 text-secondary">
        <p className="mt-5">This is a Control Panel login screen.</p>
        <p>Available usernames:</p>
        <ul>
          <li>
            <b>alice</b> - (owning 2 machines: "<i>machine1</i>" and "<i>machine2</i>");
          </li>
          <li>
            <b>bob</b> - (owning 1 machine: "<i>machine3</i>").
          </li>
        </ul>
        <p>Note: the usernames are case-sensitive, keep them lowercase.</p>
        <p>
          You can also use non-existing usernames (e.g. <i>charlie</i>), 
          they will be treated as users owning zero machines.
        </p>
      </div>
    </div>
  );
}
