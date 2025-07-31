import React, { useCallback, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogin } from '~/hooks/useLogin';
import { useId } from '~/hooks/useId';
import './index.css';
import { CommonButton } from '~/components/common/CommonButton';
import { FormField } from '~/components/common/FormField';

const SignIn = () => {
  const auth = useSelector((state) => state.auth.token !== null);
  const { login } = useLogin();

  const id = useId();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      login({ email, password })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [email, password]
  );

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="signin">
      <h2 className="signin__title">Login</h2>
      <p className="signin__error">{errorMessage}</p>
      <form className="signin__form" onSubmit={onSubmit}>
        <FormField
          className="signin__form_field"
          id={`${id}-email`}
          ladelClass="signin__form_label"
          label="E-mail Address"
        >
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            className="form_field_input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormField>
        <FormField
          className="signin__form_field"
          id={`${id}-password`}
          labelClass="signin__form_label"
          label="Password"
        >
          <input
            id={`${id}-password`}
            type="password"
            autoComplete="current-password"
            className="form_field_input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormField>
        <div className="common__form_actions">
          <Link className="common_button" data-variant="secondary" to="/signup">
            Register
          </Link>
          <div className="common__form_actions_spacer"></div>
          <CommonButton type="submit" disabled={isSubmitting}>
            Login
          </CommonButton>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
