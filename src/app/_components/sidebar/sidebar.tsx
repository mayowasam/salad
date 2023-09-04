"use client"
import Image from 'next/image'
import styles from './styles.module.scss'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const data = [
    {
        title: "Account",
        items: [
            {
                name: "Account",
                image: "/account.svg",                
                link: "#"


            },
            {
                name: "Transactions",
                image: "/transactions.svg",
                link: "/transaction"
            },
            {
                name: "Settlements",
                image: "/settlements.svg",                
                link: "#"
            },
            {
                name: "Cards",
                image: "/card.svg",                
                link: "#"
            }
        ]
    },
    {
        title: "Payments",
        items: [
            {
                name: "Fund Transfer",
                image: "/fundtransfer.svg",                
                link: "#"
            },
            {
                name: "Bills Payment",
                image: "/bill.svg",                
                link: "#"
            },
            {
                name: "Airtime",
                image: "/airtime.svg",                
                link: "#"
            },
            {
                name: "Subscriptions",
                image: "/subscription.svg",                
                link: "#"
            }
        ]
    }
]

export default function Sidebar() {
    const pathname = usePathname()
   
   
    return (
        <nav className={styles.sidebar}>

            <div className={styles.logo}>

                <div className={styles.image}></div>

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
                                <Link href={item.link} key={index} className={`${styles.items} ${isActive  ? styles.active : ''}`}>
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
    )
}