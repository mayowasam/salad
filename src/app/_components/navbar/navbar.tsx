"use client"
import { useState } from 'react'
import styles from './navbar.module.scss'
import { Button, Input } from 'antd';
import { ArrowLeftOutlined, LogoutOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons'
import Image from 'next/image';
import Link from 'next/link';
import { data } from '../sidebar/sidebar';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [search, setSearch] = useState("")
    const [sidebar, setSidebar] = useState(false)
    const pathname = usePathname()

    const toggle = () => setSidebar(!sidebar)

    return (
        <div className={styles.navbar}>

            <div className={styles.desktop}>
                <div className={styles.search}>
                    <Input size="large" placeholder="Search" onChange={e => setSearch(e.target.value)} prefix={<SearchOutlined />} />
                </div>
                <div className={styles.user}>
                    <Image src={"/avatar.png"} alt="avatar" width={30} height={30} />
                    <div>
                        <p>Tega Christopher</p>
                        <Link href="/">View Profile</Link>
                    </div>

                    <div className={styles.icons}>
                        <Image src={"/notification.svg"} alt="notification" width={20} height={20} />
                        <Image src={"/settings.svg"} alt="settings" width={20} height={20} />
                        <Image src={"/logout.svg"} alt="logout" width={20} height={20} />

                    </div>

                </div>
            </div>

            <div className={styles.mobile}>
                <MenuUnfoldOutlined onClick={toggle} />

                <div className={styles.user}>
                    <Image src={"/avatar.png"} alt="avatar" width={30} height={30} />
                    <div className={styles.username}>
                        <p>Tega Christopher</p>
                        <Link href="/">View Profile</Link>
                    </div>

                    <div className={styles.icons}>
                        <Image src={"/notification.svg"} alt="notification" width={20} height={20} />
                        <Image src={"/settings.svg"} alt="settings" width={20} height={20} />
                        <Image src={"/logout.svg"} alt="logout" width={20} height={20} />

                    </div>

                </div>


            </div>

            <nav className={`${styles.sidebar} ${sidebar ? styles.show : ""}`}>

                <div className={styles.logo}>
                        <ArrowLeftOutlined onClick={toggle} />

                    <div className={styles.image}>

                    </div>

                    <div className={styles.text}>
                        <Image src="/dashboard.svg" alt="logo" width={30} height={30} />
                        <span>Dashboard</span>
                    </div>
                </div>

                <ul className={styles.sidebar_contents}>
                    {data.map((items, i) => (
                        <li key={i} className={styles.box} >
                            <p>{items.title}</p>

                            {items.items.map((item, index) => {
                                const isActive = pathname === item.link;
                               

                                return (
                                    <Link href={item.link} key={index} className={`${styles.items} ${isActive ? styles.active : ''}`} onClick={() =>  setSidebar(false)}>
                                        <Image src={item.image} alt={item.name} width={30} height={30} />
                                        <span>{item.name}</span>
                                    </Link>

                                )
                            })}
                        </li>

                    ))}

                </ul>

                <div>
                    <Button type="primary" icon={<LogoutOutlined />}>Log Out</Button>
                </div>



            </nav>
        </div>
    )
}