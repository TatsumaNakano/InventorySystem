import Image from 'next/image'
// import styles from './page.module.css'
import dynamic from 'next/dynamic'

const LendingDataDisplay = dynamic(() => import("@/components/LendingDataDisplay"), { ssr: false });

export default function Home() {
  return (
    <>
      <LendingDataDisplay />
    </>
  )
}
