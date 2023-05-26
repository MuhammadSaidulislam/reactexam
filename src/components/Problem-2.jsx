import React, { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const buttonAStyle = {
    backgroundColor: '#f6e69f',
    color: '#46139f',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin:'5px'
  };
  
const buttonBStyle = {
    backgroundColor: '#aaa',
    color: '#ff7f50',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin:'5px'
  };

  const buttonCStyle = {
    backgroundColor: '#fff',
    color: '#f6e69f',
    padding: '8px 16px',
    border: '1px solid #46139f',
    borderRadius: '4px',
    cursor: 'pointer',
    margin:'5px'
  };
const Problem2 = () => {
    const [modalAShow, setModalAShow] = useState(false);
    const modalAClose = () => setModalAShow(false);
    const modalA = () => setModalAShow(true);

    const [modalBShow, setModalBShow] = useState(false);
    const modalBClose = () => setModalBShow(false);
    const modalB = () => setModalBShow(true);

    const [modalCShow, setModalCShow] = useState(false);
    const modalCClose = () => setModalCShow(false);
    const modalC = () => setModalCShow(true);

    const switchModalA=()=>{
        setModalAShow(true);
        setModalBShow(false);
    }
    const switchModalB=()=>{
        setModalAShow(false);
        setModalBShow(true);
    }


    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://contact.mediusware.com/api-doc/'); // Replace with your API endpoint
          setData(response.data.paths);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    console.log('data',data);
  
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
            <button  onClick={modalB} className="btn btn-lg btn-outline-warning" type="button">
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
        Modal A
        <div className='text-center'>
        <button className='btn btn-info'>All contacts</button>
        <button className='btn btn-primary' onClick={switchModalB}>US contacts</button>
        <button className='btn btn-danger' onClick={modalAClose}>Close</button>
        </div>
        
        <div className='checkboxCondition'>
        <input type='checkbox' id="even" />
        <label htmlFor='even'>Only even</label>
        </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalBShow} onHide={modalBClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal B</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Modal A
        <div className='text-center'>
        <button style={buttonAStyle} className='btn' onClick={switchModalA}>All contacts</button>
        <button style={buttonBStyle} className='btn btn-primary'>US contacts</button>
        <button style={buttonCStyle} className='btn btn-danger' onClick={modalBClose}>Close</button>
        </div>
        <div className='checkboxCondition'>
        <input type='checkbox' id="even" />
        <label htmlFor='even'>Only even</label>
        </div>
        </Modal.Body>
      </Modal>


      <Modal show={modalCShow} onHide={modalCClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Modal C
        <button style={buttonCStyle} className='btn btn-danger' onClick={modalCClose}>Close</button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Problem2;
