"use client"

import Image from 'next/image'
// import styles from './page.module.css'
import dynamic from 'next/dynamic'
import LendingToolbar from '@/components/LendingToolbar';
import { useState } from 'react';

const LendingDataDisplay = dynamic(() => import("@/components/LendingDataDisplay"), { ssr: false });

export default function Home() {
  const [connected, setConnected] = useState(false);

  return (
    <>
      {connected ? <LendingToolbar /> : null}
      <LendingDataDisplay onConnected={() => { setConnected(true) }} />
    </>
  )
}
