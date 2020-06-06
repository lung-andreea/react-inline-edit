import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AutoresizeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue
        };
        this.handleTextareaChanged = this.handleTextareaChanged.bind(this);
    }

    handleTextareaChanged(e) {
        this.setState({
            value: e.target.value
        });
        this.props.onChange && this.props.onChange(e.target.value, e);
    }

    render() {
        const { isDisabled, className, ...restOfProps } = this.props;
        const { value } = this.state;

        let classes = classNames('autoresize-input', className);

        let textareaAttributes = {
            ...restOfProps,
            disabled: isDisabled,
            className: 'autoresize-input__text',
            onChange: this.handleTextareaChanged,
            value
        };
        delete textareaAttributes.initialValue; // or React will warn about not recognizing the prop on a DOM element

        return (
            <div className={classes}>
                <span className="autoresize-input__sizer">{value}</span>
                <textarea {...textareaAttributes} />
            </div>
        );
    }
}

AutoresizeInput.defaultProps = {
    initialValue: ''
};

AutoresizeInput.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    initialValue: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default AutoresizeInput;
