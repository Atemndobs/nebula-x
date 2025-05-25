import React from 'react';
import styles from './progress.module.css';

interface ProgressBarProps {
  /** Current progress value (0-100) */
  value: number;
  /** Additional CSS class names */
  className?: string;
  /** Whether to show the numeric value */
  showValue?: boolean;
  /** Accessible name for the progress bar */
  'aria-label'?: string;
  /** ID of the element that describes the progress bar */
  'aria-labelledby'?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(({ 
  value, 
  className = '',
  showValue = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props 
}, ref) => {
  const getStatus = () => {
    if (value > 90) return 'critical';
    if (value > 70) return 'warning';
    return 'normal';
  };

  const progressValue = Math.min(100, Math.max(0, value));
  const status = getStatus();
  const progressBarId = React.useId();
  const descriptionId = `${progressBarId}-description`;

  // Set the progress width using CSS custom property

  const progressBarProps = {
    'aria-valuenow': progressValue,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuetext': `${progressValue}%`,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy || (showValue ? descriptionId : undefined),
    role: 'progressbar',
  };

  // Create a ref to store the progress bar element
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  // Update the CSS custom property when the value changes
  React.useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress-width', `${progressValue}%`);
    }
  }, [progressValue]);

  return (
    <div className={`w-full ${className}`} ref={ref} {...props}>
      {showValue && (
        <div className="flex justify-between text-sm mb-1">
          <span id={descriptionId} className="text-gray-300">
            {ariaLabel || 'Progress'}
          </span>
          <span className="font-medium text-white">{progressValue}%</span>
        </div>
      )}
      <div 
        ref={progressBarRef}
        className={styles.progressContainer}
        {...progressBarProps}
      >
        <div className={`${styles.progressBar} ${styles[status]}`} />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
