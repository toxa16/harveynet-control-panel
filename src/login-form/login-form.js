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
          <h1>Login Form</h1>

          <br />

          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" className="form-control" />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" className="form-control" />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" className="form-control" />
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
