import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Alert, Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { BiEdit, BiHeart, BiPlus } from "react-icons/bi";
import { FaHeartBroken } from "react-icons/fa";
import Loading from '../../components/Body/loading';
import styles from './index.module.css';

import { Detail } from './modalDetail'

require('react-dom');
window.React = require('react');

interface IWishes {
  id: number;
  name: string;
  description: string;
  link: string;
  concluded: boolean;
  friends: [id: number];
}

const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<IWishes[]>([])

  const [state2, setState2] = useState(false);
  const [stateForm, setStateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageWish, setMessageWish] = useState("");

  const { state } = useLocation<string>();

  const history = useHistory()

  const { friend_id } = useParams<{ friend_id: string }>();
  const friend = Number(friend_id)

  useEffect(() => {
    loadWishes(friend)
  }, [])

  async function loadWishes(friend_id: number) {
    setLoading(true)
    const response = await api.get(`/friends/${friend_id}/wishes`)
    setLoading(false)

    if (state === "new") {
      setMessageWish("Novo Desejo cadastrado! ")
      setStateForm(true)
    } else if (state === "update") {
      setMessageWish("Desejo atualizado!")
      setStateForm(true)
    }

    setTimeout(() => {
      setStateForm(false);
    }, 2500)

    history.replace({ ...history.location, state: undefined });

    setWishes(response.data)
  }

  function newWish(friend: number) {
    console.log('entrou')
    history.push(`/friends/${friend_id}/wish_cad/`)
  }

  function editWish(id: number) {
    history.push(`/friends/${friend_id}/wish_cad/${id}`)
  }

  async function deleteWish(id: number) {
    const response = await api.delete(`/wishes/${id}`)

    if (response.status === 200) {

      loadWishes(friend)

      setState2(true);
      setTimeout(() => {
        setState2(false);
      }, 3000)
    }
  }

  function goDetail(uid: number) {
 
    
  }

  

  return (
    <div className="container">
      <Alert variant="danger" show={state2} >
        Desejo deletado! &#x1F494;
      </Alert>

      <Alert variant="success" show={stateForm} >
        {messageWish} &#128157;
      </Alert>

      {loading ? (
        <div>
          <Loading></Loading>
        </ div>
      ) : (
          <div>
            <h1>Desejos</h1>

            <Table striped bordered hover size="sm" className="text-center">
              <thead>
                <tr>
                  <th>Desejo</th>
                  <th>Link</th>
                  <th>Detalhe</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                  wishes.map(wish => (
                    <tr key={wish.id}>
                      <td>{wish.name}</td>
                      <td> 
                        { wish.link === '' ? 'Sem Página': <a href= {wish.link} target="_blank">Ver página</a>}
                      </td>
                      <td>
                        <Detail 
                          name={wish.name} 
                          description={wish.description}
                          link={wish.link}
                          concluded={wish.concluded}
                        ></Detail>
                      </td>
                      <td>
                        <Button variant="outline-secondary" size="sm"
                          onClick={() => editWish(wish.id)} >
                          <BiEdit />{' '}</Button>{' '}
                        <Button variant="outline-danger" size="sm"
                          onClick={
                            () => {
                              if (window.confirm(`Quer mesmo DELETAR o ${wish.name}?`)) {
                                deleteWish(wish.id)
                              };
                            }
                          } >
                          <FaHeartBroken />
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>

            <div className={styles.btn_new}>
              <Button variant="primary" onClick={() => newWish(friend)} style={{ borderRadius: 40 }} size="lg"><BiPlus />{' '}</Button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Wishes;