import React, { useState } from 'react';
import Modal from 'react-modal';
import { Slider } from '@material-ui/core';
import { useAuthValue, useForestIdValue } from '../../../../context';
import axiosInstance from '../../../../utils/axios';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
  
Modal.setAppElement('#root')
  
export const ReportModal = ({modalIsOpen, setIsOpen, latitude, longitude}) => {
  
  const [certainty, setCertainty] = useState(0);
  const { token } = useAuthValue();
  const { forestId } = useForestIdValue();

  const header = {
    headers: {'auth-token': token }
  };

  const afterOpenModal = () => {

  }

  const saveReport = async () => {
    console.log(forestId, latitude, latitude)
    await axiosInstance.post('/reports', {
        forestId,
        location: {
            latitude,
            longitude
        },
        certainty
    }, header)
    .then(result => {
        console.log("res", result.data)
    })
    .catch(e => {
        console.log("err", e.response.data);
    })
    closeModal()
  }


  const closeModal = () => {
    setIsOpen(false);
  }
  
  const handleChange = (event, value) => {
    setCertainty(value);
  }

  
  return (
    <div>
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Report Modal"
      >
        <button onClick={closeModal}>x</button>

        <Slider
          value={certainty}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="on"
          onChange={handleChange}
        />

        <button onClick={saveReport}>Report</button>
      </Modal>
    </div>
  );
}