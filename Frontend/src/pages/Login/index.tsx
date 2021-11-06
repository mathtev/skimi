import { Button } from '@material-ui/core';
import { Field, Form, Formik, FormikState } from 'formik';
import React from 'react';
import CustomField from '../../components/CustomField';
import { useAuth } from '../../hooks/useAuth';

import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/user/mutations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
);

export interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const [loginMutation] = useMutation(LOGIN);

  const loginUser = ({ email, password }: FormValues) => {
    return loginMutation({
      variables: { email, password },
    }).then((resp) => resp.data);
  };

  return (
    <div>
      <Formik
        validateOnChange={true}
        enableReinitialize={true}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (formData: FormValues, { setSubmitting }) => {
          setSubmitting(true);
          await loginUser(formData);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
          <Form className={classes.root}>
            <Field label="email" name="email" type="input" as={CustomField} />
            <Field
              label="password"
              name="password"
              type="input"
              as={CustomField}
            />
            <Button disabled={isSubmitting} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
