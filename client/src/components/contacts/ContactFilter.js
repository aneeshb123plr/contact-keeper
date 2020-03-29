import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { addFilter, clearFilter, filtered } = contactContext;
  const text = useRef();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [filtered]);

  const onChange = e => {
    if (text.current.value !== "") {
      addFilter(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        onChange={onChange}
        placeholder='Contact filter...'
      />
    </form>
  );
};

export default ContactFilter;
