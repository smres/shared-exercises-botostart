// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// import ContactList from "./ContactList";
// import inputs from "../constants/input";

// import styles from "./Contacts.module.css";

// function Contacts() {
//   const [contacts, setContacts] = useState([]);
//   const [alert, setAlert] = useState("");
//   const [isEditModeActive, setEditModeActive] = useState(false);
//   const [contact, setContact] = useState({
//     id: "",
//     name: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });

//   const changeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setContact((contact) => ({ ...contact, [name]: value }));
//   };

//   const addHandler = () => {
//     if (
//       !contact.name ||
//       !contact.lastName ||
//       !contact.email ||
//       !contact.phone
//     ) {
//       setAlert("Please enter valid data!");
//       return;
//     }
//     setAlert("");
//     const newContact = {
//       ...contact,
//       id: uuidv4(),
//     };
//     setContacts((contacts) => [...contacts, newContact]);
//     setContact({ name: "", lastName: "", email: "", phone: "", id: "" });
//     console.log(contacts);
//   };

//   const deleteHandler = (id) => {
//     const newContacts = contacts.filter((contact) => contact.id !== id);
//     setContacts(newContacts);
//   };

//   const editHandler = (id) => {
//     const contactForEdit = contacts.find((contact) => contact.id === id);
//     setContact(contactForEdit);
//     setEditModeActive(true);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         {inputs.map((input, index) => (
//           <input
//             key={index}
//             type={input.type}
//             placeholder={input.placeholder}
//             name={input.name}
//             value={contact[input.name]}
//             onChange={changeHandler}
//           />
//         ))}
//         <button onClick={addHandler}>
//           {isEditModeActive ? "Edite" : "Add"} Contact
//         </button>
//       </div>
//       <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
//       <ContactList
//         contacts={contacts}
//         deleteHandler={deleteHandler}
//         editHandler={editHandler}
//         setEditModeActive={setEditModeActive}
//         setContact={setContact}
//       />
//     </div>
//   );
// }

// export default Contacts;

// ============================

import React, { useState, createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import ContactList from "./ContactList";
import inputs from "../constants/input";

import styles from "./Contacts.module.css";

export const ContactsContext = createContext();

const initialState = {
  alert: "",
  contacts: [],
  contact: {
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  },
  isEditing: false,
};

const reducer = (state, action) => {};

function Contacts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false); // حالت ویرایش

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = () => {
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

    if (isEditing) {
      // ویرایش اطلاعات
      setContacts((contacts) =>
        contacts.map((item) => (item.id === contact.id ? { ...contact } : item))
      );
    } else {
      // اضافه کردن مخاطب جدید
      const newContact = {
        ...contact,
        id: uuidv4(),
      };
      setContacts((contacts) => [...contacts, newContact]);
    }

    // ریست کردن فرم
    setContact({ name: "", lastName: "", email: "", phone: "", id: "" });
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  const editHandler = (id) => {
    const contactForEdit = contacts.find((contact) => contact.id === id);
    setContact(contactForEdit);
    setIsEditing(true); // فعال کردن حالت ویرایش
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, deleteHandler, editHandler }}
    >
      <div className={styles.container}>
        <div className={styles.form}>
          {inputs.map((input, index) => (
            <input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={changeHandler}
            />
          ))}
          <button onClick={addHandler}>
            {isEditing ? "Edit Contact" : "Add Contact"}
          </button>
        </div>
        <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
        <ContactList />
      </div>
    </ContactsContext.Provider>
  );
}

export default Contacts;
