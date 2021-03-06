import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { Alert, Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { BiEdit, BiHeart, BiPlus } from "react-icons/bi";
import { FaHeartBroken } from "react-icons/fa";
import Loading from '../../components/Body/loading';

import styles from './index.module.css';

require('react-dom');
window.React = require('react');

interface IFriends {
  id: number;
  name: string;
}

const Friends: React.FC = () => {
  //const [loading, setLoading ] = useState()
  //setLoading(true)

  const [friends, setFriends] = useState<IFriends[]>([])
  const [state2, setState2] = useState(false);
  const [stateForm, setStateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageFriend, setMessageFriend] = useState("");

  const history = useHistory()

  //const { teste } =useLocation<{id:number}>();

  const { state } = useLocation<string>();

  useEffect(() => {
    loadFriends()
  }, [])

  async function loadFriends() {
    setLoading(true)
    const response = await api.get('friends')
    setLoading(false)

    if (state === "new") {
      setMessageFriend("Novo Amigo cadastrado! ")
      setStateForm(true)
    } else if (state === "update") {
      setMessageFriend("Amigo atualizado!")
      setStateForm(true)
    }

    setTimeout(() => {
      setStateForm(false);
    }, 2500)

    history.replace({ ...history.location, state: undefined });

    setFriends(response.data)
  }

  function newFriend() {
    history.push('friend_cad')
  }

  function editFriend(id: number) {
    history.push(`friend_cad/${id}`)
  }

  async function deleteFriend(id: number) {
    const response = await api.delete(`friends/${id}`)

    if (response.status === 200) {
      loadFriends()

      setState2(true);
      setTimeout(() => {
        setState2(false);
      }, 3000)
    }

  }

  function goWishes(id: number) {
    history.push(`./friends/${id}/wishes`)
  }

  return (
    <div className="container">

      <Alert variant="danger" show={state2} >
        Amigo deletado! &#x1F494;
      </Alert>

      <Alert variant="success" show={stateForm} >
        {messageFriend} &#128157;
      </Alert>

      {loading ? (
        <div>
          <Loading></Loading>

        </ div>
      ) : (
          <div>
            <h1>Amigos</h1>

            <Table striped bordered hover size="sm" className="text-center">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Desejos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                  friends.map(friend => (
                    <tr key={friend.id}>
                      <td>{friend.name}</td>
                      <td><Button variant="outline-info" size="sm"
                        onClick={() => goWishes(friend.id)} >
                        <BiHeart />
                      </Button></td>
                      <td>
                        <Button variant="outline-secondary" size="sm"
                          onClick={() => editFriend(friend.id)} >
                          <BiEdit />{' '}</Button>{' '}
                        <Button variant="outline-danger" size="sm"
                          onClick={
                            () => {
                              if (window.confirm(`Quer mesmo DELETAR ${friend.name}?`)) {
                                deleteFriend(friend.id)
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
              <Button variant="primary" onClick={newFriend} style={{ borderRadius: 40 }} size="lg"><BiPlus />{' '}</Button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Friends;