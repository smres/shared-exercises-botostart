# Contacts Management App

This is a simple React application for managing a list of contacts. The app uses **Formik** for form handling and **Yup** for validation. It allows you to add, edit, delete, and search contacts with ease.

## Features

- **Add New Contacts**: Users can add new contacts by filling out a form.
- **Edit Existing Contacts**: Edit details of any contact in the list.
- **Delete Contacts**: Remove a single contact or multiple contacts at once.
- **Search Contacts**: Filter the contact list by name, last name, or email.
- **Formik & Yup Integration**: Form management and validation using Formik and Yup.
- **Responsive UI**: A simple and responsive user interface.

## Technologies Used

- **React**: Core framework for building the application.
- **Formik**: Form handling and state management.
- **Yup**: Schema-based form validation.
- **UUID**: For generating unique IDs for each contact.
- **CSS Modules**: For styling components.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/smres/shared-exercises-botostart.git
   ```

2. Navigate to the project directory:

   ```bash
   cd contact-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. automaticaly open the app in your browser at `http://localhost:3000`.

## Project Structure

```plaintext
src
├── components
│   ├── Contacts.jsx       # Main component with form and context setup
│   ├── ContactList.jsx    # Component for rendering the list of contacts
│   ├── ContactItem.jsx    # Component for individual contact items
├── constants
│   └── input.js           # Input field configurations
├── styles
│   ├── Contacts.module.css
│   ├── ContactList.module.css
│   └── ContactItem.module.css
└── App.jsx                # Root component
```

## How to Use

1. **Add Contact**:

   - Fill in the form fields (Name, Last Name, Email, Phone).
   - Click on "Add Contact" to save the contact.

2. **Edit Contact**:

   - Click the "..." icon next to a contact and select "Edit".
   - Update the form fields and click "Update Contact".

3. **Delete Contact**:

   - Click the "..." icon next to a contact and select "Delete".
   - For bulk delete, select multiple contacts and use the delete button.

4. **Search**:
   - Use the search bar at the top of the contact list to filter by name, last name, or email.

## Validation Rules

- **Name**: Required.
- **Last Name**: Required.
- **Email**: Must be a valid email address.
- **Phone**: Must be numeric and is required.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributions

Feel free to contribute by creating a pull request or submitting an issue. Suggestions and feedback are always welcome!

---

**Author**: Mohammad Reza Esmailzadeh
