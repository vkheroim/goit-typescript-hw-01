/** @format */

import {useDispatch} from "react-redux";
import {deleteContact} from "../../redux/contactsSlice";
import {HiUser, HiPhone} from "react-icons/hi";
import style from "./Contact.module.css";

const Contact = ({contact}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={style.container}>
      <div>
        <div className={style.info}>
          <HiUser className={style.icon} />
          {contact.name}
        </div>
        <div className={style.info}>
          <HiPhone className={style.icon} />
          {contact.number}
        </div>
      </div>
      <button className={style.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
