/** @format */

import {useSelector} from "react-redux";
import Contact from "../Contact/Contact";
import {selectContacts} from "../../redux/contactsSlice";
import {selectNameFilter} from "../../redux/filtersSlice";
import style from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={style.container}>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          <Contact key={contact.id} contact={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
