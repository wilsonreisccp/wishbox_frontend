import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { BiHeart } from "react-icons/bi";

type DetailProps = {
  name: string;
  description: string;
  link:string;
  concluded: boolean;
}

export const Detail = (props: DetailProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <div>
      <Button variant={props.concluded===true ? 'success': 'outline-info'} size="sm"
        onClick={handleShow} >
        <BiHeart />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.description}
          <hr/>
          { props.link === '' ? 'Sem Página': <a href= {props.link} target="_blank" rel="noopener noreferrer">Ver página</a>}
          <hr/>
          Desejo {props.concluded===true ? 'Recebido!': 'Pendente!'}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
