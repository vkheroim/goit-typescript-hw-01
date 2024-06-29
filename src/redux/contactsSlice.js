/** @format */

import {createSlice} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";

const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, "");
  const match = phoneNumber.match(/^(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) {
    return match.slice(1).filter(Boolean).join("-");
  }
  return "";
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [
      {id: "id-1", name: "Rosie Simpson", number: "459-12-56"},
      {id: "id-2", name: "Hermione Kline", number: "443-89-12"},
      {id: "id-3", name: "Eden Clements", number: "645-17-79"},
      {id: "id-4", name: "Annie Copeland", number: "227-91-26"},
    ],
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(contact) {
        const formattedNumber = formatPhoneNumber(contact.number);
        return {
          payload: {
            ...contact,
            id: nanoid(),
            number: formattedNumber,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export const {addContact, deleteContact} = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export default contactsSlice.reducer;
