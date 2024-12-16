import React, { useState, useContext } from "react";

import { ContactsContext } from "./Contacts";

import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  isActiveAllDelete,
  toggleSelectContact,
  isSelected, // آیا این مخاطب انتخاب شده است
}) {
  const [isActiveActionButtons, setIsActiveActionButtons] = useState(false);

  const { deleteHandler, editHandler } = useContext(ContactsContext);

  const actionHandler = () => {
    setIsActiveActionButtons(false);
  };

  return (
    <li className={styles.item}>
      <p>
        {name} {lastName}
      </p>
      <p>
        <span>📩</span> {email}
      </p>
      <p>
        <span>📞</span> {phone}
      </p>

      {isActiveActionButtons ? (
        <div>
          <button onClick={() => editHandler(id)}>Edit</button>
          <button
            style={{ marginLeft: "1rem" }}
            onClick={() => deleteHandler(id)}
          >
            Delete
          </button>
          <button onClick={actionHandler} style={{ marginLeft: "1.5rem" }}>
            🔙
          </button>
        </div>
      ) : (
        <span
          style={{
            lineHeight: "20px",
            fontSize: "1.5rem",
            fontWeight: "700",
            cursor: "pointer",
          }}
          onClick={
            () => setIsActiveActionButtons(true)
          }
        >
          ...
        </span>
      )}
      {!!isActiveAllDelete && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelectContact(id)}
          style={{ marginLeft: "1rem" }}
        />
      )}
    </li>
  );
}

export default ContactItem;
