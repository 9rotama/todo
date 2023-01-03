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
  context: string;
  created: string;
  updated: string;
}

// 仮データ
const mockData: Todo[] = [
  {
    id: Math.random().toString(32).substring(2),
    context: "キャベツ買う",
    created: Date.now().toString(),
    updated: Date.now().toString(),
  },
  {
    id: Math.random().toString(32).substring(2),
    context: "ニンジン買う",
    created: Date.now().toString(),
    updated: Date.now().toString(),
  },

  {
    id: Math.random().toString(32).substring(2),
    context: "豚肉買う",
    created: Date.now().toString(),
    updated: Date.now().toString(),
  },
];

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
  });

  const formRef = useRef<HTMLInputElement | null>(null);

  const getTodoList = async () => {
    setTodoList(mockData);
  }

  const addTodo = async (todo: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(32).substring(2),
      context: todo,
      created: Date.now().toString(),
      updated: Date.now().toString(),
    };
    setTodoList(todoList.concat([newTodo]));
  }

  const deleteTodo = async (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
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
              <p className={styles.todoContext}>{props.context}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;