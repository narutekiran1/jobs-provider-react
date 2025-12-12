import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import styles from "../styles/auth.module.css";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  name: Yup.string().min(2).required("Required"),
  email: Yup.string().email("Invalid").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className={styles.authWrap}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const userCred = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );

              await setDoc(doc(db, "users", userCred.user.uid), {
                name: values.name,
                email: values.email,
                role: "user",
                createdAt: Date.now(),
              });

              alert("Account created successfully!");
              navigate("/login"); // redirect to login

            } catch (err) {
              setErrors({ submit: err.message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className={styles.form}>
              <label>Full Name</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" className={styles.err} />

              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className={styles.err} />

              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className={styles.err} />

              {errors.submit && <div className={styles.err}>{errors.submit}</div>}

              <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create account"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
