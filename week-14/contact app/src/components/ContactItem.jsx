import React, { useState } from "react";

import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
  editHandler,
  // setEditModeActive,
  setContact,
}) {
  const [isActiveActionButtons, setIsActiveActionButtons] = useState(false);

  const actionHandler = () => {
    setIsActiveActionButtons(false);
    // setEditModeActive(false);
    setContact({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
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
          onClick={() =>
            setIsActiveActionButtons(true)
            // setEditModeActive(false)
          }
        >
          ...
        </span>
      )}
    </li>
  );
}

export default ContactItem;
