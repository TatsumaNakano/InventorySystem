import Image from 'next/image'
// import styles from './page.module.css'
import dynamic from 'next/dynamic'
import LendingToolbar from '@/components/LendingToolbar';

const LendingDataDisplay = dynamic(() => import("@/components/LendingDataDisplay"), { ssr: false });

export default function Home() {
  return (
    <>
      <LendingToolbar />
      <LendingDataDisplay />
    </>
  )
}
