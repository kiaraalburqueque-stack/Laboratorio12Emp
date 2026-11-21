import './Skeleton.css'

// Grey placeholder with a shine animation, shown while data is loading.
// width / height accept any CSS size; variant 'text' draws a text line.
function Skeleton({ width = '100%', height = '1rem', variant = 'block', className = '' }) {
  return (
    <span
      className={`skeleton skeleton--${variant} ${className}`.trim()}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

// A whole card made of skeleton pieces, with the same size as a premiere card.
export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton height="0" className="skeleton-card__poster" />
      <Skeleton variant="text" width="80%" height="1.1rem" />
      <Skeleton variant="text" width="50%" height="0.9rem" />
    </div>
  )
}

export default Skeleton
