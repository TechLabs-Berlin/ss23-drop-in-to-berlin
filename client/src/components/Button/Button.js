import classNames from 'classnames';
import './Button.css'

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  const classes = classNames(rest.className,'button-base', {
    'button-primary': primary,
    'button-secondary': secondary,
    'button-success': success,
    'button-warning': warning,
    'button-danger': danger,
    'button-outline': outline,
    'button-rounded': rounded,
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;