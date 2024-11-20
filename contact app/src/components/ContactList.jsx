// import ContactItem from "./ContactItem";

// import styles from "./ContactList.module.css";

// function ContactList({
//   contacts,
//   deleteHandler,
//   editHandler,
//   // setEditModeActive,
//   setContact,
// }) {
//   return (
//     <div className={styles.container}>
//       <div className={styles.topHeader}>
//         <h3>Contacts List</h3>
//         <input type="text" placeholder="Search by email or name..." />
//       </div>
//       {contacts.length ? (
//         <ul className={styles.contacts}>
//           {contacts.map((contact) => (
//             <ContactItem
//               key={contact.id}
//               data={contact}
//               deleteHandler={deleteHandler}
//               editHandler={editHandler}
//               // setEditModeActive={setEditModeActive}
//               setContact={setContact}
//             />
//           ))}
//         </ul>
//       ) : (
//         <p className={styles.message}>No Contact Yet!</p>
//       )}
//     </div>
//   );
// }

// export default ContactList;

import React, { useState } from "react";
import ContactItem from "./ContactItem";

import styles from "./ContactList.module.css";

function ContactList({ contacts, deleteHandler, editHandler }) {
  const [searchTerm, setSearchTerm] = useState(""); // استیت برای مقدار جستجو

  // تابع برای مدیریت تغییرات اینپوت جستجو
  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  // فیلتر کردن مخاطبان بر اساس مقدار جستجو
  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.lastName} ${contact.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.topHeader}>
        <h3>Contacts List</h3>
        <input
          type="text"
          placeholder="Search by email or name..."
          value={searchTerm}
          onChange={searchHandler} // مدیریت تغییرات ورودی جستجو
        />
      </div>
      {filteredContacts.length ? (
        <ul className={styles.contacts}>
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contacts Found!</p>
      )}
    </div>
  );
}

export default ContactList;
