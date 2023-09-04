import { Spin } from 'antd';
import styles from './styles.module.scss'

export default function Loader() {

  return (
    <div className={styles.loader}><Spin />;</div>
  )
}