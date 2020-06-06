// This is a modified version of a React controlled input box,
// with the difference that the user can edit it without us having to listen for every keypress and supply an updated property.
// The caller should listen to onBlur events instead, which are triggered when the user blurs or presses enter.
//
// Only use this input box if this is the behaviour you want.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ENTER = 13;

class TextInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { value: props.initialValue };

        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
        this.createRef = this.createRef.bind(this);
    }

    createRef(element) {
        this.inputElement = element;
    }

    handleInputChanged(e) {
        this.setState({
            value: e.target.value
        });
        this.props.onChange && this.props.onChange(e.target.value, e);
    }

    handleInputBlur(e) {
        if (this.props.parseValue) {
            // The parent is still expected to handle the unparsed value,
            // but this means we'll fix the shown value even if the property doesn't change
            this.setState({ value: this.props.parseValue(e.target.value) });
        }
        this.props.onBlur && this.props.onBlur(e.target.value, e);
    }

    handleInputKeyUp(e) {
        if (e.keyCode === ENTER) {
            this.handleInputBlur(e); // Enter should update the value, the same as blurring
            this.props.onEnterPressed && this.props.onEnterPressed(e);
        }
        this.props.onKeyUp && this.props.onKeyUp(e);
    }

    setFocus() {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    }

    render() {
        const { isLarge, isDisabled, className, ...restOfProps } = this.props;

        let inputProps = {
            ...restOfProps,
            className: classNames(className, {
                'form-input--large': isLarge
            }),
            disabled: isDisabled,
            value: this.state.value || '',
            onChange: this.handleInputChanged,
            onBlur: this.handleInputBlur,
            onKeyUp: this.handleInputKeyUp
        };

        delete inputProps.initialValue; // or React will warn about it not being a valid "input" parameter
        delete inputProps.onEnterPressed; // or React will warn about it not being a valid "input" parameter
        delete inputProps.parseValue; // or React will warn about not recognizing the prop on a DOM element

        return <input type="text" {...inputProps} ref={this.createRef} />;
    }
}

TextInput.defaultProps = {
    initialValue: ''
};

TextInput.propTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func, // Supply this function to listen to user updates
    onEnterPressed: PropTypes.func,
    parseValue: PropTypes.func,
    className: PropTypes.string,
    isLarge: PropTypes.bool,
    isDisabled: PropTypes.bool
};
export default TextInput;
