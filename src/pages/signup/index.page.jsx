import React, { useCallback, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';
import { useSignup } from '~/hooks/useSignup';
import { useId } from '~/hooks/useId';
import { CommonButton } from '~/components/common/CommonButton';
import { FormField } from '~/components/common/FormField';

const SignUp = () => {
  const auth = useSelector((state) => state.auth.token !== null);

  const id = useId();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useSignup();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      signup({ email, name, password })
        .catch((err) => {
          setErrorMessage(`サインアップに失敗しました: ${err.message}`);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [email, name, password]
  );

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="signup">
      <h2 className="signup__title">Register</h2>
      <p className="signup__error">{errorMessage}</p>
      <form className="signup__form" onSubmit={onSubmit}>
        <FormField
          className="signup__form_field"
          id={`${id}-email`}
          labelClass="signup__form_label"
          label="E-mail Address"
        >
          <input
            id={`${id}-email`}
            autoComplete="email"
            className="form_field_input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormField>
        <FormField
          className="signup__form_field"
          id={`${id}-name`}
          autoComplete="name"
          labelClass="signup__form_label"
          label="Name"
        >
          <input
            id={`${id}-name`}
            type="text"
            className="form_field_input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormField>
        <FormField
          className="signup__form_field"
          id={`${id}-password`}
          autoComplete="new-password"
          labelClass="signup__form_label"
          label="Password"
        >
          <input
            id={`${id}-password`}
            type="password"
            className="form_field_input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormField>
        <div className="common__form_actions">
          <Link className="common_button" data-variant="secondary" to="/signin">
            Login
          </Link>
          <div className="common__form_actions_spacer"></div>
          <CommonButton type="submit" disabled={isSubmitting}>
            Register
          </CommonButton>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
