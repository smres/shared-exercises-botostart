import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

import ContactList from "./ContactList";
import inputs from "../constants/input";
import styles from "./Contacts.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const ContactsContext = createContext();

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .length(11, "Phone number must be 11 digits")
    .matches(/^\d+$/, "Phone must be numeric")
    .required("Phone is required"),
});

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [contactEditing, setContactEditing] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    isEditing: false,
  });
  const [selectedContact, setSelectedContact] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newContact = {
      ...data,
      id: uuidv4(),
    };

    setContacts((prev) => [...prev, newContact]);

    // Reset form fields
    reset();
    setAlert("");
  };

  console.log(watch("name"));

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const addContactHandler = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("Please enter valid data!");
      return;
    }

    setAlert("");

    const newContact = {
      ...contact,
      id: uuidv4(),
    };

    setContacts((prev) => [...prev, newContact]);

    // Reset Form
    setContact({ id: "", name: "", lastName: "", email: "", phone: "" });
  };

  const editHandler = (id) => {
    const selectedContactFiltered = contacts.find((item) => item.id === id);
    if (!selectedContactFiltered) {
      console.error("Contact not found!");
      return;
    }
    setSelectedContact({ ...selectedContactFiltered });
    setContactEditing((contact) => ({
      ...selectedContactFiltered,
      isEditing: !contact.isEditing,
    }));
  };

  const saveChangesEditedContact = () => {
    const updatedContacts = contacts.map((contact) => {
      return contact.id === contactEditing.id ? contactEditing : contact;
    });

    setContacts(updatedContacts);
    setContactEditing({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      isEditing: false,
    });
  };

  const selectedContactChangeHandler = (event) => {
    const { name, value } = event.target;
    setContactEditing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteContactHandler = () => {
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== selectedContact.id
    );
    console.log(filteredContacts);
    setContacts(filteredContacts);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputGroup}>
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              // value={contact[input.name]}
              // onChange={changeHandler}
              {...register(input.name)}
            />
            {touchedFields[input.name] && errors[input.name] && (
              <p className={styles.error}>{errors[input.name].message}</p>
            )}{" "}
          </div>
        ))}
        <button type="submit">Add Contact</button>
      </form>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <ContactList
        contacts={contacts}
        setContacts={setContacts}
        editHandler={editHandler}
        contactEditing={contactEditing}
        setContactEditing={setContactEditing}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        saveChangesEditedContact={saveChangesEditedContact}
        selectedContactChangeHandler={selectedContactChangeHandler}
        deleteContactHandler={deleteContactHandler}
      />
    </div>
  );
};

export default Contacts;
