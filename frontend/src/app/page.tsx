import Image from 'next/image'
// import styles from './page.module.css'
import dynamic from 'next/dynamic'

const LendingDataTable = dynamic(() => import("@/components/LendingDataTable"), { ssr: false });

export default function Home() {
  return (
    <main>
      <LendingDataTable />
    </main>
  )
}
