import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";

import ContactList from "./ContactList";
import inputs from "../constants/input";
import styles from "./Contacts.module.css";

export const ContactsContext = createContext();

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("وارد کردن نــام الزامی است😍"),
      lastName: Yup.string().required(
        "وارد کردن نــام خانــوادگی الزامی است🤗"
      ),
      email: Yup.string()
        .email("آدرس ایمـل معتبر نیست خوشگله😘")
        .required("وارد کردن ایمــل الزامی است😍"),
      phone: Yup.string()
        .matches(/^\d+$/, "تلفن را به طور صحیح و عددی وارد کنید😉")
        .required("وارد کردن تلفن الزامی است😎"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditing) {
        // Update existing contact
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === editingId ? { ...values, id: editingId } : contact
          )
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new contact
        setContacts((prevContacts) => [
          ...prevContacts,
          { ...values, id: uuidv4() },
        ]);
      }

      resetForm();
      setAlert("");
    },
  });

  const editHandler = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      formik.setValues(contactToEdit);
      setIsEditing(true);
      setEditingId(id);
    }
  };

  const deleteHandler = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, deleteHandler, editHandler }}
    >
      <div className={styles.container}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          {inputs.map((input, index) => (
            <div key={index} className={styles.inputGroup}>
              <input
                type={input.type}
                placeholder={input.placeholder}
                name={input.name}
                value={formik.values[input.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[input.name] && formik.errors[input.name] && (
                <p className={styles.error}>{formik.errors[input.name]}</p>
              )}
            </div>
          ))}
          <button type="submit">
            {isEditing ? "Update Contact" : "Add Contact"}
          </button>
        </form>
        <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
        <ContactList />
      </div>
    </ContactsContext.Provider>
  );
};

export default Contacts;
