import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ClickOutside from "../utils/ClickOutside";
import Button from "../utils/Button";

export const keyCode = {
    ENTER: 13
};

const ClickOutsideWrapper = props => {
    if (props.enabled) {
        return (
            <ClickOutside clickEventName="mousedown" onClick={props.onClick}>
                {props.children}
            </ClickOutside>
        );
    }
    return props.children;
};

ClickOutsideWrapper.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    enabled: PropTypes.bool
};

class InlineEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue,
            isEditing: false
        };
        this.lastSavedValue = props.initialValue;

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.handleTextAreaChanged = this.handleTextAreaChanged.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.getInputProps = this.getInputProps.bind(this);
    }

    getInputProps() {
        let textInputProps = {
            ...this.props,
            onChange: this.handleTextAreaChanged,
            onKeyDown: this.onKeyDown,
            className: 'inline-edit__input inline-edit--grow',
            initialValue: this.state.value,
            autoFocus: true
        };

        //Avoiding unnecessary React warnings about unknown dom element props
        delete textInputProps.startEdit;
        delete textInputProps.isEditing;
        delete textInputProps.onConfirm;
        delete textInputProps.editLabel;
        delete textInputProps.addLabel;
        delete textInputProps.children;
        delete textInputProps.enableScroll;
        delete textInputProps.renderSidebar;

        return textInputProps;
    }

    startEdit() {
        if (!this.props.isDisabled) {
            this.setState({
                isEditing: true
            });
        }
    }

    stopEditing() {
        this.setState({
            isEditing: false
        });
    }

    onConfirm(event) {
        const value = this.state.value.trim();
        this.stopEditing();
        this.setState({ value });
        this.lastSavedValue = value;
        this.props.onConfirm && this.props.onConfirm(value, event);
    }

    onCancel() {
        this.stopEditing();
        this.setState({
            value: this.lastSavedValue
        });
        this.props.onCancel && this.props.onCancel();
    }

    onKeyDown(event) {
        /*
        * This prevents the Enter key from creating a new line on Edge 18, even at max length.
        * */
        if (event.target.value.length >= this.props.maxLength) {
            if (event.keyCode === keyCode.ENTER) {
                event.stopPropagation();
                event.preventDefault();
            }
        }

        return true;
    }

    handleTextAreaChanged(value) {
        /*
        * Ensures that no input that exceeds "maxLength" can be further saved to state.
        * "initialValue" will render as intended (and will bypass the browser's maxLength limitation)
        * but users will not be able to add any input until they are below "maxLength"
        * */
        if (value.length > this.props.maxLength) {
            return;
        }
        this.setState({
            value: value
        });
    }

    render() {
        const { children, className, isDisabled, sidebar } = this.props;
        const { value, isEditing } = this.state;

        let classes = classnames(className, 'inline-edit', {
            'inline-edit--editing': isEditing,
            'inline-edit--disabled': isDisabled,
            'inline-edit--placeholder': !isEditing && value.length === 0
        });

        return (
            <ClickOutsideWrapper enabled={isEditing} onClick={this.onConfirm}>
                <div className={classes}>
                    {children({
                        value,
                        isEditing,
                        startEdit: this.startEdit,
                        onConfirm: this.onConfirm,
                        inputProps: this.getInputProps()
                    })}
                    {isEditing && (
                        <>
                            <Button primary className="inline-edit__button" onClick={this.onConfirm}>
                                <i className="fo-icon fo-icon-Correct" />
                            </Button>
                            <Button secondary className="inline-edit__button" onClick={this.onCancel}>
                                <i className="fo-icon fo-icon-Incorrect" />
                            </Button>
                        </>
                    )}

                    {sidebar && !isEditing && <div className="inline-edit__sidebar">{sidebar}</div>}
                </div>
            </ClickOutsideWrapper>
        );
    }
}

InlineEdit.propTypes = {
    textField: PropTypes.node,
    className: PropTypes.string,
    sidebar: PropTypes.func,
    children: PropTypes.func,
    initialValue: PropTypes.string,
    isDisabled: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    editLabel: PropTypes.string,
    addLabel: PropTypes.string,
    maxLength: PropTypes.number
};

InlineEdit.defaultProps = {
    maxLength: Infinity
};

export default InlineEdit;
