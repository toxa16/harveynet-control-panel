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
    </div>
  );
}
