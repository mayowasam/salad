"use client"
import { PaginationProps } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import ModalComponent from '../modal/modal'
import Paginate from '../pagination/pagination'
import styles from './styles.module.scss'

interface User {
    __typename: string;
    about: string | null;
    avatar: {
        __typename: string;
        medium: string;
    };
    createdAt: number;
    name: string;
    updatedAt: number;
}

interface IndexProps {
    users: User[];
}



const tableheaders = ["Name", "Amount", "Date", "Type", "Status", "Action"]

const tableContent = [
    {
        id: "1",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Successful",
        action: ""

    },
    {
        id: "2",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Successful",
        action: ""

    },
    {
        id: "3",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Failed",
        action: ""

    },
    {
        id: "4",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Credit",
        status: "Successful",
        action: ""

    },
    {
        id: "5",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Credit",
        status: "Successful",
        action: ""

    },
    {
        id: "6",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Unresolved",
        action: ""

    },
    {
        id: "7",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Successful",
        action: ""

    },
    {
        id: "8",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Failed",
        action: ""

    },
    {
        id: "9",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Credit",
        status: "Successful",
        action: ""

    },
    {
        id: "10",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Unresolved",
        action: ""

    },
    {
        id: "11",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Credit",
        status: "Unresolved",
        action: ""

    },
    {
        id: "12",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Successful",
        action: ""

    },
    {
        id: "13",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Successful",
        action: ""

    },
    {
        id: "14",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Credit",
        status: "Failed",
        action: ""

    },
    {
        id: "15",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Credit",
        status: "Successful",
        action: ""

    },
    {
        id: "16",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Failed",
        action: ""

    },
    {
        id: "17",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Failed",
        action: ""

    },
    {
        id: "18",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Credit",
        status: "Successful",
        action: ""

    },
    {
        id: "19",
        name: "Users name goes here",
        amount: "45,000.00",
        date: "04-02-2022",
        type: "Debit",
        status: "Failed",
        action: ""

    }
]

export type TableContent = {
    id: string;
    name: string;
    amount: string;
    date: string;
    type: string;
    status: string;
    action: string;
}

//added 20 more items to dummy the array

let newTop: TableContent[] = []

while (newTop.length < 20) {
    newTop.push(...tableContent);
}

export default function Index({ users }: IndexProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams();
    const [pageNumber, setPageNumber] = useState(Number(searchParams.get("page")) || 1);
    const [status, setStatus] = useState("")
    const [selectedItem, setSelectedItem] = useState<TableContent>()
    const pageLimit = 10;


   


    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setPageNumber(page)
        router.push(`?page=${page}&limit=${pageLimit}`);
    }


    const handleStatus = (status: string) => {
        setPageNumber(1);
        setStatus(status)

    }

    //updated the array with the name value of the data fetched from the anilist

    const updatedTableContent = tableContent.map((item, index) => ({
        ...item,
        name: users[index].name || item.name,
    }));

    const toggle = (id: string) => {
        let item = updatedTableContent.find(item => item.id === id);
        setSelectedItem(item)
        setIsModalOpen(!isModalOpen);
    };

    function exportCsv() {
        const usersCsv = newTop.map((item) => {
            const { id, name, amount, date, type, status, action } = item;
            return [id, name, amount, date, type, status, action].join(",");
        });

        const csvData = [tableheaders.join(","), ...usersCsv].join("\n");

        downloadCsv(csvData);
    }



    function downloadCsv(data: string) {
        const blob = new Blob([data], { type: "text/csv" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "payment_history.csv");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }


    const filteredTableContent = useMemo(() => {
        const startIndex = (pageNumber - 1) * pageLimit;
        const endIndex = startIndex + pageLimit;
        return updatedTableContent.slice(startIndex, endIndex);
    }, [pageNumber, updatedTableContent]);



    return (
        <div className={styles.transactions}>
            <div className={styles.transactions_top}>
                <div className={styles.breadcrumb}>
                    <span>Transactions</span>{" "} /<Link href={"/"}>back to dashboard</Link>
                </div>

                <div className={styles.buttons}>
                    <div className={styles.leftbuttons}>
                        <button className={status === "" ? styles.active : ""} onClick={() => handleStatus("")}>All</button>
                        <button className={status === "Successful" ? styles.active : ""} onClick={() => handleStatus("Successful")}>Successful</button>
                        <button className={status === "Failed" ? styles.active : ""} onClick={() => handleStatus("Failed")}>Failed</button>
                        <button className={status === "Unresolved" ? styles.active : ""} onClick={() => handleStatus("Unresolved")}>Unresolved</button>
                    </div>

                    <div className={styles.rightbuttons}>
                        <button>Filter transactions</button>
                        <button onClick={exportCsv}>Export CSV</button>
                    </div>

                </div>


            </div>

            <div className={styles.transactions_content}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {tableheaders.map((item, i) => (
                                <th key={i}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTableContent.filter((item) => (status === "" ? true : item.status === status)).map((item, i) => (
                            <tr key={i} onClick={() => toggle(item.id)}>
                                <td data-cell="No"><input type="checkbox" /></td>
                                <td data-cell="Name">{item.name}</td>
                                <td data-cell="Amount">{item.amount}</td>
                                <td data-cell="Date">{item.date}</td>
                                <td data-cell="Type" className={item.type === "Debit" ? `${styles.debit}` : `${styles.credit}`}>{item.type}</td>
                                <td data-cell="Status" className={item.status === "Unresolved" ? `${styles.unresolved}` : ""}>{item.status}</td>
                                <td data-cell="Action">
                                    <Image src={'/eye.svg'} alt={'eye'} width={10} height={15} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className={styles.transactions_footer}>
                <Paginate onChange={onChange} total={updatedTableContent.length} />

            </div>
            <ModalComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedItem={selectedItem!}
            />

        </div>
    )
}