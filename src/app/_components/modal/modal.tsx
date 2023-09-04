import { useState, useEffect } from "react";
import { Button, Modal, Progress } from 'antd';
import Image from 'next/image';
import styles from './styles.module.scss'
import { TableContent } from '../transaction/transaction';


type ModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedItem: TableContent,

}


type ProgressProps = {
    openProgress: boolean,
    setOpenProgress: React.Dispatch<React.SetStateAction<boolean>>
    setRetry: React.Dispatch<React.SetStateAction<boolean>>
    selectedItem: TableContent,
}


const ModalComponent = ({ isModalOpen, setIsModalOpen, selectedItem }: ModalProps) => {
    const [retry, setRetry] = useState(false)
    const [openProgress, setOpenProgress] = useState(false)

    const handleOk = () => {
        setIsModalOpen(false);
        setRetry(false)

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setRetry(false)
    };

    const openRetryModal = () => {
        setIsModalOpen(false); // Close the first modal
        setOpenProgress(true); // Open the retry modal
        setRetry(false)

    };

    

    return (
        <>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closeIcon={false}
                className="custom_modal"
                bodyStyle={{
                    background: "#EDF0F4",
                }}

            >
                <div className={styles.success}>
                    <div className={styles.top}>
                        <span>Transaction details</span>
                        <button onClick={handleOk}>
                        <Image src="/cancel.svg" alt="cancel" width="20" height="20" />

                        </button>
                    </div>

                    <div className={styles.message}>
                        <div className={styles.image}>
                            {selectedItem?.status === "Successful" ?
                                <Image src="/success.svg" alt="cancel" width="40" height="40" /> :
                                <Image src="/failed.svg" alt="cancel" width="40" height="40" />
                            }
                            <p className={`${styles[selectedItem?.status]}`}>{selectedItem?.status}</p>
                        </div>
                        <div className={styles.text}>
                            <p>Sent</p>
                            <p>{selectedItem?.amount}</p>
                            <p>Transaction narration or description of transaction <br />
                                and details of transaction and reason
                            </p>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <p><span>Date</span> <span>{selectedItem?.date}</span></p>
                        <p><span>Category</span> <span>Transfer</span></p>
                        <p><span>Beneficiary Name</span> <span>{selectedItem?.name}</span></p>
                        <p><span>Beneficiary Bank</span> <span>GTBank Plc</span></p>

                    </div>

                    {(selectedItem?.status !== "Successful") && !retry &&
                        <div className={styles.buttons}>
                            <Button type="primary" block size='large' onClick={() => setRetry(true)}>Requery transaction</Button>
                        </div>

                    }

                    {
                        retry &&
                        <div className={styles.buttons}>
                            <p>Are you sure you want to <br />
                                requery transaction
                            </p>

                            <div className={styles.button_container}>
                                <button onClick={handleOk} className={styles.red}>
                                    Cancel
                                </button>
                                <button onClick={openRetryModal} className={styles.blue} >Continue</button>
                            </div>


                        </div>
                    }



                </div>



            </Modal>

            <RetryModal openProgress={openProgress} setOpenProgress={setOpenProgress} setRetry={setRetry} selectedItem={selectedItem} />
        </>
    );
};


const RetryModal = ({ openProgress, setOpenProgress, setRetry, selectedItem }: ProgressProps) => {
    const [value, setValue] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {        
        setValue(false);
      }, 10000);
  
      return () => {
        clearTimeout(timer); 
      };
    }, []); 

    const handleOk = () => {
        setOpenProgress(false);
        setRetry(false)

    };

    const handleCancel = () => {
        setOpenProgress(false);
        setRetry(false)

    };


    return (
        <>
            <Modal
                open={openProgress}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closeIcon={false}
                className="custom_modal"
                bodyStyle={{
                    background: "#EDF0F4",
                }}

            >
                <div className={styles.retry}>

                    {
                        value ?
                            <div className={styles.retrying}>
                                <p>Retrying Transaction</p>

                                <Progress percent={70} showInfo={false} status="active" strokeColor={{ '0%': '#87d068', '50%': '#87d068' }} />

                            </div>

                            :

                            <div className={styles.done}>

                                <div className={styles.done_top}>
                                    <div className={styles.button}>
                                        <button onClick={handleOk}>
                                        <Image src="/cancel.svg" alt="cancel" width="20" height="20" />

                                        </button>

                                    </div>
                                    <p>Done</p>
                                </div>
                                <Image src="/success.svg" alt="cancel" width="40" height="40" />

                                <div className={styles.done_info}>
                                    <p>Successfull</p>
                                    <p>{selectedItem?.name}</p>
                                    <p> ₦ {selectedItem.amount}</p>


                                </div>
                            </div>
                    }



                </div>



            </Modal >
        </>
    );
};





export default ModalComponent;