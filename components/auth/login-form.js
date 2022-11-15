import { useRef, useState } from "react";
import { useRouter } from "next/router";
import {signIn} from 'next-auth/react';

function LoginForm() {

    const router = useRouter();
    const email_ref = useRef();
    const password_ref = useRef();
    const [error, setError] = useState();

    function toggleErrorNotification() {
        setError((prevState) => !prevState);
    }

    async function submitHandler(e) {
        e.preventDefault();

        const entered_email = email_ref.current.value;
        const entered_password = password_ref.current.value;

        const result = await signIn('credentials', {
            redirect: false,
            email: entered_email,
            password: entered_password
        });

        if (!result.ok) {
            setError(result.error);
          }
            console.log(result);
    }

  return (
    <div className="block">
      {error && (
        <div className="notification is-danger is-light">
          <button className="delete" onClick={toggleErrorNotification}></button>
          {error}
        </div>
      )}
      <form className="box" onSubmit={submitHandler}>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              className="input"
              type="email"
              id="email"
              required
              ref={email_ref}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              id="password"
              type="password"
              required
              placeholder="********"
              ref={password_ref}
            />
          </div>
        </div>
        <button
          type="submit"
          className="button is-primary is-outlined is-fullwidth is-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
