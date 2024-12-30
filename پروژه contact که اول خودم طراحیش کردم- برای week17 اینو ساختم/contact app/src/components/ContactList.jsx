import { useState } from "react";
import ContactItem from "./ContactItem";

import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineUndo } from "react-icons/ai";

import styles from "./ContactList.module.css";

function ContactList({
  contacts,
  editHandler,
  contactEditing,
  saveChangesEditedContact,
  selectedContactChangeHandler,
  deleteContactHandler,
  setContacts, // اضافه شده: برای حذف گروهی
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false); // اضافه شده: مدیریت حالت حذف گروهی
  const [selectedContacts, setSelectedContacts] = useState([]); // اضافه شده: لیست کانتکت‌های انتخاب‌شده

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
    filteredContacts;
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.includes(searchTerm.toLowerCase().trim()) ||
      contact.lastName.includes(searchTerm.toLowerCase().trim()) ||
      contact.email.includes(searchTerm.toLowerCase().trim())
  );

  const toggleBulkDeleteMode = () => {
    setBulkDeleteMode((prev) => !prev);
    setSelectedContacts([]); // ریست کردن لیست انتخاب‌شده‌ها
  };

  const handleContactSelection = (id) => {
    setSelectedContacts((prevContacts) =>
      prevContacts.includes(id)
        ? prevContacts.filter((contactId) => contactId !== id)
        : [...prevContacts, id]
    );
  };

  const deleteSelectedContacts = () => {
    const remainingContacts = contacts.filter(
      (contact) => !selectedContacts.includes(contact.id)
    );
    setContacts(remainingContacts);
    setBulkDeleteMode(false);
  };

  const selectAllContactsHandler = () => {
    setSelectedContacts(filteredContacts.map((contact) => contact.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.topHeader}>
        <h3>Contacts List</h3>
        <input
          type="text"
          placeholder="Search by email or name..."
          value={searchTerm}
          onChange={searchHandler}
        />
      </div>

      {filteredContacts.length ? (
        <>
          <div
            style={{
              textAlign: "right",
              marginTop: "1.5rem",
            }}
          >
            <button style={{ marginRight: "0.5rem" }}>
              {bulkDeleteMode ? (
                <AiOutlineCheckSquare
                  title="Select All"
                  onClick={selectAllContactsHandler}
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "#636363",
                  }}
                  cursor="pointer"
                />
              ) : (
                <AiOutlineUsergroupDelete
                  onClick={toggleBulkDeleteMode}
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "#636363",
                  }}
                  cursor="pointer"
                />
              )}
            </button>
            {bulkDeleteMode && (
              <>
                <button
                  onClick={deleteSelectedContacts}
                  disabled={!selectedContacts.length}
                  style={{ marginRight: "0.5rem" }}
                >
                  <AiOutlineDelete
                    title="Delete"
                    onClick={deleteSelectedContacts}
                    style={{
                      width: "40px",
                      height: "40px",
                      color: selectedContacts.length ? "#636363" : "#bcbcbc",
                      cursor: selectedContacts.length
                        ? "pointer"
                        : "not-allowed",
                    }}
                    cursor="pointer"
                  />
                </button>
                <button onClick={toggleBulkDeleteMode}>
                  <AiOutlineUndo
                    title="Cancel"
                    style={{
                      width: "40px",
                      height: "40px",
                      color: "#636363",
                    }}
                    cursor="pointer"
                  />
                </button>
              </>
            )}
          </div>
          <ul className={styles.contacts}>
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                data={contact}
                editHandler={editHandler}
                contactEditing={contactEditing}
                saveChangesEditedContact={saveChangesEditedContact}
                selectedContactChangeHandler={selectedContactChangeHandler}
                deleteContactHandler={deleteContactHandler}
                bulkDeleteMode={bulkDeleteMode} // اضافه شده: ارسال حالت حذف گروهی
                handleContactSelection={handleContactSelection} // اضافه شده: ارسال تابع انتخاب کانتکت
                isSelected={selectedContacts.includes(contact.id)} // اضافه شده: بررسی انتخاب کانتکت
              />
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.message}>No Contact Found!</p>
      )}
    </div>
  );
}

export default ContactList;
