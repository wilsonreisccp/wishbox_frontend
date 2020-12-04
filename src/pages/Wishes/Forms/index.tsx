import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { BiUndo, BiSave } from "react-icons/bi";
import Loading from '../../../components/Body/loading';

import api from '../../../services/api';
import styles from './index.module.css';

interface IWish {
  name: string;
  description: string;
  link: string;
  concluded: boolean;
  friend: { id: number };

}

const Wishes: React.FC = () => {
  const history = useHistory()
  const { uid, friend_id } = useParams<{ uid: string, friend_id: string }>();
  const [loading, setLoading] = useState(false);

  const [model, setModel] = useState<IWish>({
    name: '',
    description: '',
    link: '',
    concluded: false,
    friend: { id: Number(friend_id) },

  })

  useEffect(() => {
    if (uid !== undefined) {
      findWish()
    }
  }, [uid])

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.checked
      //[e.target.concluded]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    if (uid === undefined) {
      const r = await api.post('wishes', model)
      history.push(`/friends/${model.friend.id}/wishes`, 'new')
    } else {
      const r2 = await api.put(`/wishes/${uid}`, model)
      /*
        history.push('/friends', {id: 2})

        const uid:number = 1 
        passar parameters .push('/', <string, number, objeto, etc>) teste:number
        history.push('/friends', uid)
      */
      history.push(`/friends/${friend_id}/wishes`, 'update')
    }

    setLoading(false)
  }

  async function findWish() {
    const reponse = await api.get(`/wishes/${uid}`)

    setModel({
      name: reponse.data.name,
      description: reponse.data.description,
      link: reponse.data.link,
      concluded: reponse.data.concluded,
      friend: { id: Number(friend_id) },
    })
  }

  function handleChange(e){
    
  }

  return (
    <div className="container">
      {loading ? (
        <div>
          <Loading></Loading>
        </ div>
      ) : (

          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Desejo</Form.Label>
              <Form.Control type="text" placeholder=""
                name="name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                value={model.name}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3}
                name="description"
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                value={model.description}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" placeholder=""
                name="link"
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                value={model.link}
              />
            </Form.Group>
            <div key={`default-checkbox`} className="mb-3">
              <Form.Check.Input
                name="concluded"
                type={`checkbox`}
                id={`default-checkbox`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                checked = {model.concluded}
              /> {model.concluded ? 'Concedido':'Pendente'}
            </div>

            <div className={styles.space_between}>
              <div className={styles.item}>
                <Button onClick={() => { history.goBack() }} variant="outline-primary"><BiUndo /></Button>
              </div>
              <div className={styles.item}>
                <Button variant="outline-primary" type="submit"><BiSave /></Button>
              </div>
            </div>
          </Form>

        )}
    </div>
  );
}

export default Wishes;