import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const buttonAStyle = {
  backgroundColor: "rgb(96, 78, 0)",
  color: "#46139f",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "5px",
};

const buttonBStyle = {
  backgroundColor: "#000",
  color: "#ff7f50",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "5px",
};

const buttonCStyle = {
  backgroundColor: "#fff",
  color: "rgb(96, 78, 0)",
  padding: "8px 16px",
  border: "1px solid #46139f",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "5px",
};
const Problem2 = () => {
  
  const [allContacts, setAllContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [usCountry, setUSCountry] = useState([]);
  const [usContact, setUSContact] = useState([]);
  const [modalAShow, setModalAShow] = useState(false);
  const modalAClose = () => setModalAShow(false);
  const modalA = () => setModalAShow(true);

  const [modalBShow, setModalBShow] = useState(false);
  const modalBClose = () => setModalBShow(false);
  const modalB = () => setModalBShow(true);

  const [modalCShow, setModalCShow] = useState(false);
  const modalCClose = () => setModalCShow(false);
  const modalC = () => setModalCShow(true);

  const switchModalA = () => {
    setModalAShow(true);
    setModalBShow(false);
  };
  const switchModalB = () => {
    setModalAShow(false);
    setModalBShow(true);
  };

  useEffect(() => {
    axios
      .get("https://contact.mediusware.com/api/contacts/")
      .then((response) => {
        // Handle the retrieved data
        setAllContacts(response.data.results);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error.message);
      });

    axios
      .get(
        "https://contact.mediusware.com/api/country-contacts/United%20States/"
      )
      .then((response) => {
        // Handle the retrieved data
        setUSCountry(response.data.results);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error.message);
      });
  }, []);


  // even id show
  const [modalAisChecked, setModalAIsChecked] = useState(false);
  const modalASort = () => {
    setModalAIsChecked(!modalAisChecked);
  };


  const [modalBisChecked, setModalBIsChecked] = useState(false);
  const modalBSort = () => {
    setModalBIsChecked(!modalBisChecked);
  };
 
  useEffect(() => {
    if (modalAisChecked === true) {
      const evenContacts = allContacts.filter(
        (contact) => contact.id % 2 === 0
      );
      setContacts(evenContacts);
    } else {
      setContacts(allContacts);
    }
    if (modalBisChecked === true) {
      const evenContacts = usCountry.filter(
        (contact) => contact.id % 2 === 0
      );
      setUSContact(evenContacts);
    } else {
      setUSContact(usCountry);
    }
  }, [modalAisChecked, allContacts,modalBisChecked,usCountry]);

  // next page

  const nextPage = () => {
    axios
      .get("https://contact.mediusware.com/api/contacts/?page=2")
      .then((response) => {
        // Handle the retrieved data
        setAllContacts(response.data.results);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-lg btn-outline-primary"
              type="button"
              onClick={modalA}
            >
              All Contacts
            </button>
            <button
              onClick={modalB}
              className="btn btn-lg btn-outline-warning"
              type="button"
            >
              US Contacts
            </button>
          </div>
        </div>
      </div>

      <Modal show={modalAShow} onHide={modalAClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal A</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.phone}</td>
                  <td>{data.country.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={nextPage}>Next</button>
          <div className="text-center">
            <button style={buttonAStyle} className="btn btn-info">All contacts</button>
            <button style={buttonBStyle} className="btn btn-primary" onClick={switchModalB}>
              US contacts
            </button>
            <button style={buttonCStyle} className="btn btn-danger" onClick={modalAClose}>
              Close
            </button>
          </div>

          <div className="checkboxCondition">
            <input
              type="checkbox"
              id="even"
              checked={modalAisChecked}
              onChange={modalASort}
            />
            <label htmlFor="even">Only even</label>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalBShow} onHide={modalBClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal B</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {usContact.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.phone}</td>
                  <td>{data.country.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <button style={buttonAStyle} className="btn" onClick={switchModalA}>
              All contacts
            </button>
            <button style={buttonBStyle} className="btn btn-primary">
              US contacts
            </button>
            <button
              style={buttonCStyle}
              className="btn btn-danger"
              onClick={modalBClose}
            >
              Close
            </button>
          </div>
          <div className="checkboxCondition">
            <input
              type="checkbox"
              id="even"
              checked={modalBisChecked}
              onChange={modalBSort}
            />
            <label htmlFor="even">Only even</label>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalCShow} onHide={modalCClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Modal C
          <button
            style={buttonCStyle}
            className="btn btn-danger"
            onClick={modalCClose}
          >
            Close
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Problem2;
