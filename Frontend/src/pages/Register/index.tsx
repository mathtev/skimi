import { Button, Card, Typography } from '@material-ui/core';
import { Field, Form, Formik, FormikState } from 'formik';
import React from 'react';
import CustomField from '../../components/CustomField';
import { useAuth } from '../../hooks/useAuth';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

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
    },
  })
);

export interface FormValues {
  email: string;
  login: string;
  password: string;
}

const Register = () => {
  const classes = useStyles();
  const { register } = useAuth();

  return (
    <div className={classes.root}>
      <Card>
        <Formik
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={{
            email: '',
            login: '',
            password: '',
          }}
          onSubmit={async (formData: FormValues, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const { email, login, password } = formData;
              await register!(email, login, password);
              window.location.href = 'http://localhost:3000/login';
            } catch (error) {
              console.error(error);
            }

            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }: FormikState<FormValues>) => (
            <Form className={classes.form}>
              <Typography
                className={classes.formTitle}
                gutterBottom
                variant="h5"
              >
                Register
              </Typography>
              <Field label="email" name="email" type="email" as={CustomField} />
              <Field label="login" name="login" type="text" as={CustomField} />
              <Field
                label="password"
                name="password"
                type="password"
                as={CustomField}
              />
              <Button
                disabled={isSubmitting}
                variant="contained"
                color="secondary"
                type="submit"
                style={{ marginTop: 30 }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Register;
