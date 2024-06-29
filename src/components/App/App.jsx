/** @format */

import ContactForm from "../ContactForm/ContactForm.jsx";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import style from "./App.module.css";

function App() {
  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
