import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';
import { GoSearch, GoBookmarkFill, GoComment } from 'react-icons/go';

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
  const classes = twMerge(
    classNames(rest.className, 'px-3 py-1.5 border flex items-center gap-1.5 hover:translate-y-1 transition-all', {
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-cyan-500 bg-cyan-500 text-white': secondary,
      'border-green-500 bg-green-500 text-gray-700': success,
      'border-yellow-500 bg-yellow-500 text-gray-700': warning,
      'border-red-500 bg-red-500 text-gray-700': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': primary && outline,
      'text-cyan-500': secondary && outline,
      'text-green-500': success && outline,
      'text-yellow-500': warning && outline,
      'text-red-500': danger && outline,
    })
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  children: PropTypes.node,

  checkVariationValue: function(props, propName, componentName) {
    const count =
      Number(!!props.primary) +
      Number(!!props.secondary) +
      Number(!!props.warning) +
      Number(!!props.success) +
      Number(!!props.danger);

    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true'
      );
    }
  }
};

function Buttons() {
  const handleClick = () => {};

  return (
    <div>
      <div>
        <Button secondary outline rounded className="mb-5" onClick={handleClick}>
          <GoSearch />
          Find
        </Button>
      </div>
      <div>
        <Button secondary outline>
          <GoBookmarkFill />
          Save
        </Button>
      </div>
    </div>
  );
}

export function FindButton({ onClick }) {
    return (
      <Button 
        secondary 
        outline 
        rounded 
        className="mb-5 text-2xl px-8 py-4"
        onClick={onClick}
      >
        <GoSearch />
        Find
      </Button>
    );
  }
  
export default Buttons;