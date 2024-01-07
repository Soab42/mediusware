import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./ReactModal";

const Problem2 = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");
  const handleRouting = (status) => {
    if (status === "all") {
      navigate("/problem-2/all", { replace: true });
      setIsOpen(true);
    } else if (status === "us") {
      navigate("/problem-2/us", { replace: true });
      setIsOpen(true);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => handleRouting("all")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => handleRouting("us")}
          >
            US Contacts
          </button>
        </div>

        <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Problem2;
