import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { createDecipheriv } from 'crypto'
import { Done, Add } from './icon'
import styles from '../styles/TodoList.module.css'
import { css } from '@emotion/react'

type Todo = {
  id: string;
  name: string;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
  });

  const formRef = useRef<HTMLInputElement | null>(null);

  const getTodoList = async () => {
    apiClient.get('/api/tasks').then((res) => {
      console.log(res.data[0].name)
      setTodoList(res.data);
    })
  }

  const addTodo = async (name: string) => {
    apiClient.post('/api/tasks', {
      name: name
    }).then((res) => {
      getTodoList();
    })
  }

  const deleteTodo = async (id: string) => {
    apiClient.delete('/api/tasks/' + id
    ).then((res) => {
      getTodoList();
    })
  }

  const store = async () => {
    if(formRef.current) {
      await addTodo(formRef.current.value);
      formRef.current.value = "";
    }
  }

  useEffect(() => {
    getTodoList();
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.addForm}>
        <input
          className={styles.addInput}
          type="text"
          ref={formRef}
        >
        </input>
        <button
          className={styles.addButton}
          onClick={store}
        >
          {Add}
        </button>
      </div>
      {todoList && (
        <ul className={styles.todoList}>
          {todoList.map((props, index) => (
            <li key={index} className={styles.todo}>
              <button className={styles.doneButton} onClick={() => deleteTodo(props.id)}>{Done}</button>
              <p className={styles.todoContext}>{props.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;