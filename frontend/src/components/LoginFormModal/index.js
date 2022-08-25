// frontend/src/components/LoginFormPage/index.js
// import component
import LoginForm from "./LoginForm";
import './LoginForm.css';
import { Modal } from "../../context/Modal";

// import react
import { useState } from "react";

//? LoginFormModal
const LoginFormModal = () => {
  /**
   * Controlled Inputs:
   * ------------------
   * showModal: state to show modal; defaulted as false
   */
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* // On click, set showModal to true */}
      <button onClick={_ => setShowModal(true)}>
        Log In
      </button>

      {/* // Modal component */}
      {
        // only when showModal is true...
        showModal
        &&
        // .... render LoginForm component
        <Modal onClose={_ => showModal(false)}>
            <LoginForm />
        </Modal>
      }
    </>
  );
}
;

export default LoginFormModal;
