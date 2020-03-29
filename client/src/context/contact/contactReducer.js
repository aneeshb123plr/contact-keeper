import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  ADD_FILTER,
  CLEAR_FILTER,
  GET_CONTACT,
  CLEAR_CONTACT,
  CONTACT_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case ADD_FILTER:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const newReg = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(newReg) || contact.email.match(newReg);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CLEAR_CONTACT:
      return {
        ...state,
        contacts: null,
        error: null,
        filtered: null,
        current: null
      };
    default:
      return state;
  }
};
