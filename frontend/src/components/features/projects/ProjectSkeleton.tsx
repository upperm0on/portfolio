import styles from './ProjectSkeleton.module.css';

export function ProjectSkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.imagePlaceholder} />
            <div className={styles.content}>
                <div className={styles.titlePlaceholder} />
                <div className={styles.descriptionPlaceholder} />
                <div className={styles.tagList}>
                    <div className={styles.tagPlaceholder} />
                    <div className={styles.tagPlaceholder} />
                    <div className={styles.tagPlaceholder} />
                </div>
            </div>
        </div>
    );
}
