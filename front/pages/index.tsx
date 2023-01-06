import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import axios from 'axios'
import TodoList from '../components/TodoList'
import styles from 'styles/Home.module.css'
import { mainModule } from 'process'

const Home: NextPage = () => {
  return (
    <>
      <title>
        Todo
      </title>
      <header>
        <h1 className="pageTitle">Todo</h1>
      </header>
      <div className={styles.main}>
        <TodoList />
      </div>
    </>
  );
}
export default Home;