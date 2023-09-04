"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className={styles.notFound}>
      <div className={styles.notcontent}>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <button onClick={() => router.back()} type="button">
          Go Back
        </button>
      </div>
    </div>
  );
}
