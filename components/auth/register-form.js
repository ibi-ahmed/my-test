import { useRef, useState } from "react";
import { useRouter } from "next/router";

function RegisterForm() {
  const router = useRouter();
  
  const company_name_ref = useRef();
  const first_name_ref = useRef();
  const last_name_ref = useRef();
  const year_incorporated_ref = useRef();
  const email_ref = useRef();
  const password_ref = useRef();
  const confirm_password_ref = useRef();
  
  const [error, setError] = useState();

  function toggleErrorNotification() {
    setError((prevState) => !prevState);
  }

  async function RegisterCompany(
    company_name,
    first_name,
    last_name,
    year_incorporated,
    email,
    password,
    confirm_password
  ) {
    const input = {
      company_name,
      first_name,
      last_name,
      year_incorporated,
      email,
      password,
      confirm_password,
    };
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/");
    }

    if (response.status === 422) {
      setError(data.message);
    }

    return data;
  }

  async function submitHandler(e) {
    e.preventDefault();

    const entered_company_name = company_name_ref.current.value;
    const entered_first_name = first_name_ref.current.value;
    const entered_last_name = last_name_ref.current.value;
    const entered_year_incorporated = year_incorporated_ref.current.value;
    const entered_email = email_ref.current.value;
    const entered_password = password_ref.current.value;
    const entered_confirm_password = confirm_password_ref.current.value;

    try {
      const result = await RegisterCompany(
        entered_company_name,
        entered_first_name,
        entered_last_name,
        entered_year_incorporated,
        entered_email,
        entered_password,
        entered_confirm_password
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="block">
      {error && (
        <div className='notification is-danger is-light'>
          <button className="delete" onClick={toggleErrorNotification}></button>
          {error}
        </div>
      )}
      <form className="box" onSubmit={submitHandler}>
        <div className="field">
          <label className="label">Company Name</label>
          <div className="control">
            <input
              className="input"
              id="company_name"
              type="text"
              required
              placeholder="e.g Arkham Holding Plc"
              ref={company_name_ref}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Contact First Name</label>
          <div className="control">
            <input
              className="input"
              id="contact_first_name"
              type="text"
              required
              placeholder="Enter first name"
              ref={first_name_ref}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Contact Last Name</label>
          <div className="control">
            <input
              className="input"
              id="contact_last_name"
              type="text"
              required
              placeholder="Enter last name"
              ref={last_name_ref}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Year of Incorporation</label>
          <div className="control">
            <input
              className="input"
              id="year_incorporated"
              required
              type="date"
              ref={year_incorporated_ref}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              className="input"
              type="email"
              id="email"
              required
              placeholder="e.g Iliya@danmai.karfi"
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
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              className="input"
              id="confirm_password"
              type="password"
              required
              placeholder="********"
              ref={confirm_password_ref}
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

export default RegisterForm;
