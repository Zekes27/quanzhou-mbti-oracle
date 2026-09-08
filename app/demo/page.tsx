import styles from "./demo.module.css";

export default function DemoPage() {
  return (
    <main className={styles.demoPage}>
      <div
        className={styles.backgroundGlow}
        aria-hidden="true"
      />

      <section className={styles.demoContent}>
        <div className={styles.phone}>
          {/* 左侧静音键 */}
          <span
            className={`${styles.sideButton} ${styles.muteButton}`}
            aria-hidden="true"
          />

          {/* 左侧音量键 */}
          <span
            className={`${styles.sideButton} ${styles.volumeUpButton}`}
            aria-hidden="true"
          />

          <span
            className={`${styles.sideButton} ${styles.volumeDownButton}`}
            aria-hidden="true"
          />

          {/* 右侧电源键 */}
          <span
            className={`${styles.sideButton} ${styles.powerButton}`}
            aria-hidden="true"
          />

          <div className={styles.phoneBezel}>
            <div className={styles.phoneScreen}>
              <iframe
                className={styles.appFrame}
                src="/"
                title="与神对话互动演示"
                allow="fullscreen"
              />

        

              {/* 底部手势横条 */}
              <div
                className={styles.homeIndicator}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <p className={styles.hint}>
          在手机中点击，开始与神对话
        </p>

        <a
          className={styles.directLink}
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          全屏打开
        </a>
      </section>
    </main>
  );
}