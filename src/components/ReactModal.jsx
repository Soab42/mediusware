import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import SingleContact from "./SingleContact";

export default function ReactModal({ modalIsOpen, setIsOpen }) {
  const [contactsData, setContactsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate("");
  const [onlyEven, setOnlyEven] = useState(false);

  const handleCheckboxChange = (event) => {
    setOnlyEven(event.target.checked);
    // You can perform additional actions based on the checkbox state here
  };

  // Get the current location object
  const location = useLocation();
  //for handle routing
  const handleRouting = (status) => {
    if (status === "all") {
      navigate("/problem-2/all", { replace: true });
      setIsOpen(true);
    } else if (status === "us") {
      navigate("/problem-2/us", { replace: true });
      setIsOpen(true);
    }
  };
  // Access the current URL from the location object
  const currentUrl = location.pathname.replace("/problem-2/", "");
  // console.log(currentUrl);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let apiUrl;

        if (currentUrl === "us") {
          apiUrl =
            "https://contact.mediusware.com/api/country-contacts/united%20states";
        } else {
          apiUrl = "https://contact.mediusware.com/api/contacts/";
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Handle the data, update state, etc.
        setContactsData(data?.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return setContactsData([]);
  }, [currentUrl]);

  const filteredContacts = onlyEven
    ? contactsData.filter((contact) => contact.id % 2 === 0)
    : contactsData;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.3s ease-out",
    },
  };
  // console.log(contactsData);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button
        className="btn btn-sm btn-outline-danger "
        style={{ marginLeft: "auto", display: "block" }}
        onClick={closeModal}
      >
        ❌
      </button>
      <div className="d-flex justify-content-center gap-3">
        <button
          className={`btn btn-sm btn-outline-primary ${
            currentUrl !== "us" && "active"
          }`}
          type="button"
          style={{ color: "#46139f" }}
          onClick={() => handleRouting("all")}
        >
          All Contacts
        </button>
        <button
          className={`btn btn-sm btn-outline-warning ${
            currentUrl === "us" && "active"
          }`}
          type="button"
          style={{ color: "#ff7f50" }}
          onClick={() => handleRouting("us")}
        >
          US Contacts
        </button>
      </div>
      <div>
        {loading ? (
          <div className="loading">
            <div className="bar1"></div>
            <div className="bar2"></div>
          </div>
        ) : (
          <table className="table table-striped tableData">
            <form onSubmit={debounce}>
              <input type="text" onChange={(e) => setSearch(e.target.value)} />
            </form>
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts &&
                filteredContacts.map((contact) => (
                  <SingleContact data={contact} key={contact.id} />
                ))}
            </tbody>
            <div className="checkBox">
              <label htmlFor="even">Only even</label>
              <input
                type="checkbox"
                name="even"
                id="even"
                checked={onlyEven}
                onChange={handleCheckboxChange}
              />
            </div>
            <div></div>
          </table>
        )}
      </div>
    </Modal>
  );
}
