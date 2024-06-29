/** @format */

import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {addContact, selectContacts} from "../../redux/contactsSlice";
import style from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [formattedNumber, setFormattedNumber] = useState("");

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),
    number: Yup.string()
      .required("Required")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .matches(/^\d{0,3}-?\d{0,2}-?\d{0,2}$/, "Invalid phone number format"),
  });

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const match = phoneNumber.match(/^(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      return match.slice(1).filter(Boolean).join("-");
    }
    return "";
  };

  const handleChange = (event, formikProps) => {
    const {value} = event.target;
    const formatted = formatPhoneNumber(value);
    setFormattedNumber(formatted);
    formikProps.setFieldValue("number", formatted);
  };

  const handleSubmit = (values, {resetForm}) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name === values.name && contact.number === values.number
    );

    if (isDuplicate) {
      alert("This contact already exists.");
    } else {
      dispatch(addContact(values));
      resetForm();
      setFormattedNumber(""); // Reset the formatted number
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form className={style.container}>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage className={style.error} name="name" component="span" />
          <label htmlFor="number">Number</label>
          <Field
            type="text"
            name="number"
            value={formattedNumber}
            onChange={(e) => handleChange(e, formikProps)}
          />
          <ErrorMessage
            className={style.error}
            name="number"
            component="span"
          />
          <button className={style.button} type="submit">
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
