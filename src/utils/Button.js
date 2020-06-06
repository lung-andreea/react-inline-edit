import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = React.forwardRef((props, ref) => {
    let {
        className,
        onClick,
        disabled,
        label,
        children,
        primary,
        secondary,
        isLarge,
        ...restOfProps
    } = props;
    let content = children || label;
    let classes = classnames(className, 'button', {
        'button--primary': primary,
        'button--secondary': secondary && !primary,
        'button--large': isLarge
    });

    return (
        <button {...restOfProps} ref={ref} className={classes} onClick={onClick} disabled={disabled}>
            {content}
        </button>
    );
});

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.node,
    title: PropTypes.string,
    children: PropTypes.node,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    isLarge: PropTypes.bool
};

export default Button;
