import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import axios from 'axios'
import TodoList from '../components/TodoList'

const Home: NextPage = () => {
  return <TodoList />
}
export default Home;