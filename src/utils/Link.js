import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Link extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { disabled, onClick } = this.props;

        if (disabled) {
            ev.preventDefault();
            return;
        }

        onClick && onClick(ev);
    }

    render() {
        const {
            className,
            disabled,
            secondary,
            light,
            children,
            ...restOfProps
        } = this.props;

        const linkClasses = classNames(className, {
            'link--disabled': disabled,
            'link--secondary': secondary,
            'link--light': light
        });

        return (
            <a className={linkClasses} {...restOfProps} onClick={this.handleClick}>
                {children}
            </a>
        );
    }
}

Link.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    secondary: PropTypes.bool,
    light: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node
};

export default Link;
