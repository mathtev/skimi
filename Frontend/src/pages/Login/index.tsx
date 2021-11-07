import { Button, Card, Typography } from '@material-ui/core';
import { Field, Form, Formik, FormikState } from 'formik';
import React from 'react';
import CustomField from '../../components/CustomField';
import { useAuth } from '../../hooks/useAuth';

import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 40,

      '&>*': {
        margin: 10,
      },
    },
    formTitle: {
      marginRight: 'auto',
    }
  })
);

export interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const classes = useStyles();
  const { login } = useAuth();

  return (
    <div className={classes.root}>
      <Card>
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (formData: FormValues, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await login!(formData.email, formData.password);
              window.location.href = 'http://localhost:3000';
            } catch (error) {
              console.error(error);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
            <Form className={classes.form}>
              <Typography className={classes.formTitle} gutterBottom variant="h5">
                Login
              </Typography>
              <Field label="email" name="email" type="email" as={CustomField} />
              <Field
                label="password"
                name="password"
                type="password"
                as={CustomField}
              />
              <Button disabled={isSubmitting} type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
