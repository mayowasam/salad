import Image from 'next/image'
import styles from './page.module.scss'


const topData = [
  {
    name: "8,304,933.00",
    color: "green"
  },
  {
    name: "8,304,933.00",
    color: "yellow"
  },
  {
    name: "8,304,933.00",
    color: "red"
  },
  {
    name: "8,304,933.00",
    color: "blue"
  }
]

let newTop = []

while (newTop.length < 9) {
  newTop.push(...topData);
}

const flow = [
  {
    name: "Payments inflow",
    image: "/payment.svg",
    amount: "600,000,000.000"
  },
  {
    name: "Transfer debits",
    image: "/transfer_debit.svg",
    amount: "20,346,000.00"
  },
  {
    name: "Bills debits",
    image: "/bill_debit.svg",
    amount: "234,000"
  },
  {
    name: "Subscription debits",
    image: "/subscription_debits.svg",
    amount: "234,000"
  }
]



export default function Dashboard() {
  return (
    <section className={styles.dashboard}>

      <div className={styles.balance}>

        <div className={styles.balance_top}>

          <div className={styles.balance_items}>
            <p>TOTAL AVAILABLE BALANCE</p>
            <p className={styles.text}>NGN 5,128,304,933.00</p>
          </div>

          <div className={styles.balance_items}>
            <p>QUICK ACTIONS</p>

            <div className={styles.buttons}>
              <button>Transfer Money</button>
              <button>Link account</button>
              <button>Pay bills</button>
            </div>
          </div>
        </div>

        <div className={styles.balance_cards_container}>
          <div className={styles.balance_cards}>
            {
              topData.map((item, i) => (
                <div className={`${styles.card} ${styles[`${item.color}`]}`} key={i}>
                  <p>BALANCE</p>
                  <p>NGN {item.name}</p>
                </div>

              ))
            }

          </div>

          <div className={styles.balance_nextbutton}>
            <Image src={'/nextbutton.svg'} alt="" width={30} height={30} />
          </div>

        </div>

      </div>

      <div className={styles.content}>

        <div className={styles.chart}>
          <div className={styles.chart_description}>
            <p>Cashflow</p>
            <span>Your cashflow across your accounts</span>{" "}
            <span>(Last sync - Friday, next sync - Today, 12am)</span>
          </div>
          <div className={styles.chart_buttons}>
            <button className={styles.active}>7 Days</button>
            <button>1 Month</button>
            <button>3 Months</button>
            <button>Custom Dates</button>
          </div>

          <div className={styles.chart_image}>
          <Image src={'/chart.svg'} alt="" width={600} height={300} />

          </div>
        </div>
        <div className={styles.transactions}>
          {
            flow.map((item, i) => (
              <div key={i} className={styles.transactions_item}>
                <div className={styles.transactions_info}>
                  <div className={styles.transactions_name}>
                    <Image src={item.image} alt={item.name} width={30} height={50} />
                    <div>
                      <p>{item.name}</p>
                      <span>{item.amount}</span>
                    </div>

                  </div>
                  <div className={styles.arrow}>
                    <Image src={`/arrow.svg`} alt="arrow" width={10} height={13} />

                  </div>
                </div>

              </div>

            ))
          }
        </div>

      </div>
    </section>
  )
}
