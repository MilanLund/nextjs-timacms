import styles from "./page.module.css";
import { NewsComponent } from "@/components/news/news.component";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Novinky</h1>
        <NewsComponent />
      </div>
    </main>
  );
}
