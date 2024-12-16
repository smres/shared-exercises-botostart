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

// ================================

import React, { useState, useContext } from "react";
import ContactItem from "./ContactItem";

import { ContactsContext } from "./Contacts";
import { AiOutlineUserDelete } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";

import styles from "./ContactList.module.css";

function ContactList() {
  const [searchTerm, setSearchTerm] = useState(""); // استیت برای مقدار جستجو
  const [isActiveAllDelete, setIsActiveAllDelete] = useState(false);

  const [selectedContacts, setSelectedContacts] = useState([]);

  // ******  useContext  ******
  const { contacts, deleteHandler, setContacts } = useContext(ContactsContext);

  // مدیریت انتخاب یا عدم انتخاب مخاطبین
  const toggleSelectContact = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  console.log(selectedContacts);

  const deleteSelectedContacts = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]); // ریست کردن لیست انتخاب‌شده‌ها
    setIsActiveAllDelete(false); // غیر فعال کردن حالت حذف گروهی
  };

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
      {!!filteredContacts.length && (
        <div style={{ textAlign: "right" }}>
          {!isActiveAllDelete && (
            <AiOutlineUserDelete
              color="#919191"
              cursor="pointer"
              strokeWidth="50"
              style={{ width: "30px", height: "30px", marginTop: "30px" }}
              onClick={() => setIsActiveAllDelete(true)}
            />
          )}
          {!!isActiveAllDelete && selectedContacts.length > 0 && (
            <AiTwotoneDelete
              color="#919191"
              cursor="pointer"
              strokeWidth="50"
              style={{ width: "30px", height: "30px", marginTop: "30px" }}
              onClick={deleteSelectedContacts}
            />
          )}
        </div>
      )}

      {filteredContacts.length ? (
        <ul className={styles.contacts}>
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              isActiveAllDelete={isActiveAllDelete}
              toggleSelectContact={toggleSelectContact}
              isSelected={selectedContacts.includes(contact.id)} // بررسی انتخاب شدن مخاطب
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
