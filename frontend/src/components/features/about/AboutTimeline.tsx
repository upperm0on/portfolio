import type { TimelineItem } from '../../../types/portfolio';
import { TimelineItemType } from '../../../types/portfolio';
import styles from './AboutTimeline.module.css';

interface AboutTimelineProps {
  items: TimelineItem[];
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
}

// Format date range
function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  if (!endDate) {
    return `${start} - Present`;
  }
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

// Get type label
function getTypeLabel(type: TimelineItemType): string {
  const labels: Record<TimelineItemType, string> = {
    [TimelineItemType.EXPERIENCE]: 'Experience',
    [TimelineItemType.EDUCATION]: 'Education',
    [TimelineItemType.ACHIEVEMENT]: 'Achievement',
    [TimelineItemType.CERTIFICATION]: 'Certification',
    [TimelineItemType.PROJECT]: 'Project',
  };
  return labels[type] || 'Item';
}

export function AboutTimeline({ items }: AboutTimelineProps) {
  if (items.length === 0) {
    return null;
  }

  // Sort by date (most recent first)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className={styles.timeline} data-animate="fade-up" data-delay="0.4">
      <h3 className={styles.timelineTitle}>Journey Through Time</h3>
      <div className={styles.timelineList}>
        {sortedItems.map((item, index) => (
          <div
            key={`${item.type}-${item.title}-${index}`}
            className={styles.timelineItem}
            data-animate="fade-up"
            data-delay={`${0.45 + index * 0.05}`}
          >
            <div className={styles.timelineMarker}>
              <div className={styles.markerDot}></div>
              {index < sortedItems.length - 1 && (
                <div className={styles.markerLine}></div>
              )}
            </div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineHeader}>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <span className={styles.itemType}>{getTypeLabel(item.type)}</span>
              </div>
              <div className={styles.itemMeta}>
                <span className={styles.organization}>{item.organization}</span>
                {item.location && (
                  <>
                    <span className={styles.separator}>•</span>
                    <span className={styles.location}>{item.location}</span>
                  </>
                )}
              </div>
              <div className={styles.itemDate}>
                {formatDateRange(item.date, item.endDate)}
              </div>
              {item.description && (
                <p className={styles.itemDescription}>{item.description}</p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className={styles.itemTags}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

