import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { BiUndo, BiSave } from "react-icons/bi";
import api from '../../../services/api';

import styles from './index.module.css';

interface IFriends {
  name: string;
}

const Friends: React.FC = () => {
  const history = useHistory()
  const { id }= useParams<{ id: string }>();

  const [model, setModel] = useState<IFriends>({
    name:''
  })

  useEffect(()=> {
    if (id !== undefined) {
      findFriend()  
    }
  }, [id])

  function updateModel(e: ChangeEvent<HTMLInputElement>){
    setModel({
      ... model,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()

    let response

    if(id === undefined){
      response = await api.post('friends', model)
    }else{
      response = await api.put(`friends/${id}`, model)
    }

    console.log(response)

    goBack()
  }

  async function findFriend(){
    const reponse = await api.get(`friends/${id}`)

    setModel({
      name: reponse.data.name
    })
  }

  function goBack(){
    history.goBack()
  }

  return (
    <div className="container">
      
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Nome do Amigo"
            name="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            value={model.name}
          />
          <Form.Text className="text-muted">
            Todo amigo querido merece um agrado.
            </Form.Text>
        </Form.Group>

        <div className={styles.space_between}>
          <div className={styles.item}>
            <Button onClick={goBack}  variant="outline-primary"><BiUndo /></Button>
          </div>
          <div className={styles.item}>
            <Button variant="outline-primary" type="submit"><BiSave /></Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Friends;