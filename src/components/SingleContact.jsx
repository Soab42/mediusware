import React, { useState } from "react";
import Modal from "react-modal";
export default function SingleContact({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.3s ease-out",
      border: "1px solid #46139f",
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
  }
  const {
    id,
    phone,
    country: { name: countryName },
  } = data || {};
  console.log(modalIsOpen);
  return (
    <tr onClick={openModal}>
      <th scope="col">{id}</th>
      <th scope="col">{phone}</th>
      <th scope="col">{countryName}</th>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          className="btn btn-sm btn-outline-danger "
          style={{ marginLeft: "auto", display: "block" }}
        >
          ❌
        </button>

        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Phone</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col">{phone}</th>
              <th scope="col">{countryName}</th>
            </tr>
          </tbody>
        </table>
      </Modal>
    </tr>
  );
}
