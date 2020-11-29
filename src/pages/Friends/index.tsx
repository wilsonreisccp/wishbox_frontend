import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Table, Toast } from 'react-bootstrap';
import api from '../../services/api';
import { BiEdit, BiHeart, BiPlus } from "react-icons/bi";
import { FaHeartBroken } from "react-icons/fa";


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
  const history = useHistory()
  const { teste }= useParams<{ teste: string }>();

  useEffect(() => {
    loadFriends()
  }, [])

  async function loadFriends() {
    const response = await api.get('friends')

    console.log(teste)

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
      setShow(true)
      loadFriends()
    }

  }


  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(amigoEntrando());

  function amigoEntrando(){
    return teste==="novo" ? true : false

  }

  return (
    <div className="container">
      <Toast onClose={() => setShow(false)} show={show} delay={6000} autohide>
        <Toast.Header>
          <strong>Amigo deletado! &#x1F494;</strong>
        </Toast.Header>
        <Toast.Body></Toast.Body>
      </Toast>

      <Toast onClose={() => setShowNew(false)} show={showNew} delay={6000} autohide>
        <Toast.Header>
          <strong>Novo Amigo cadastrado! &#128157;</strong>
        </Toast.Header>
        <Toast.Body></Toast.Body>
      </Toast>

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
                <td><Button variant="outline-info" size="sm"><BiHeart /></Button></td>
                <td>
                  <Button variant="outline-secondary" size="sm"
                    onClick={() => editFriend(friend.id)} >
                    <BiEdit />{' '}</Button>{' '}
                  <Button variant="outline-danger" size="sm"
                    onClick={() => {
                      if (window.confirm('Delete the item?')) {
                        deleteFriend(friend.id)
                      };
                    }
                    } ><FaHeartBroken />
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
  );
}

export default Friends;