import inputs from "../constants/input";
import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  editHandler,
  contactEditing,
  saveChangesEditedContact,
  selectedContactChangeHandler,
  deleteContactHandler,
  bulkDeleteMode, // اضافه شده: دریافت حالت حذف گروهی
  handleContactSelection, // اضافه شده: دریافت تابع انتخاب کانتکت
  isSelected, // اضافه شده: بررسی انتخاب‌شدن کانتکت
}) {
  const {
    id: contactEditingId,
    name: contactEditingName,
    lastName: contactEditingLastName,
    email: contactEditingEmail,
    phone: contactEditingPhone,
    isEditing: contactEditingIsEditing,
  } = contactEditing;

  return (
    <li className={styles.item}>
      <div className={styles.showContactItem}>
        <p>
          {name} {lastName}
        </p>
        <p>
          <span>📩</span> {email}
        </p>
        <p>
          <span>📞</span> {phone}
        </p>

        <span
          onClick={() => editHandler(id)}
          title="Edit"
          style={{
            lineHeight: "20px",
            fontSize: "1.5rem",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          ...
        </span>
        {bulkDeleteMode && (
          <input
            type="checkbox"
            onChange={() => handleContactSelection(id)}
            checked={isSelected}
          />
        )}
      </div>

      {contactEditingId === id && contactEditingIsEditing && (
        <div className={styles.edit}>
          <div className={styles.form}>
            {inputs.map((input, index) => (
              <div key={index} className={styles.inputGroup}>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={contactEditing[input.name] || ""}
                  onChange={selectedContactChangeHandler}
                />
              </div>
            ))}
            <button onClick={saveChangesEditedContact}>
              Save Edited Changes
            </button>
            <h2>OR</h2>
            <button
              style={{ background: "red" }}
              onClick={deleteContactHandler}
            >
              Delete this Contact
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default ContactItem;
