import './Button.css'

const VARIANTS = ['primary', 'secondary', 'ghost']
const SIZES = ['md', 'sm']

// Reusable button. The content comes from children and the look from props:
//   variant: 'primary' | 'secondary' | 'ghost'
//   size:    'md' | 'sm'
// With href it renders a link that looks like a button; otherwise a <button>.
// Any other prop (onClick, aria-pressed, title...) is passed to the element.
function Button({ children, variant = 'primary', size = 'md', href, type = 'button', className = '', ...rest }) {
  const safeVariant = VARIANTS.includes(variant) ? variant : 'primary'
  const safeSize = SIZES.includes(size) ? size : 'md'
  const classes = `button button--${safeVariant} button--${safeSize} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
