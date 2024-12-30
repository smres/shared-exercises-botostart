import { createContext } from "react";

export const ContactsContext = createContext();

function ContactsProvider({ children }) {
  return (
    <>
      <ContactsContext.Provider>{children}</ContactsContext.Provider>
    </>
  );
}

export default ContactsProvider;
