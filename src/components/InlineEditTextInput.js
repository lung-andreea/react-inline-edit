import React from 'react';
import PropTypes from 'prop-types';
import InlineEdit from './InlineEdit';
import classnames from 'classnames';
import TextInput from "../utils/TextInput";
import Tooltip from "../utils/Tooltip";

const InlineEditTextInput = props => {
    const { isDisabled, className, editLabel, addLabel } = props;
    let classes = classnames(className, 'inline-edit-text-input');

    return (
        <InlineEdit {...props} className={classes}>
            {renderProps => {
                const { value, isEditing, startEdit, onConfirm, inputProps } = renderProps;
                let OptionalTooltip = tooltipProps => <Tooltip {...tooltipProps} title={editLabel} />;
                let TooltipWrapper = value.length && !isDisabled ? OptionalTooltip : React.Fragment;
                let displayTextClasses = classnames('inline-edit__display-text', {
                    'inline-edit__display-text--enabled': !isDisabled
                });
                return (
                    <>
                        {isEditing ? (
                            <TextInput onEnterPressed={onConfirm} {...inputProps} />
                        ) : (
                            <TooltipWrapper>
                                <div className={displayTextClasses} onClick={startEdit}>
                                    <span>{value.length ? value : addLabel}</span>
                                </div>
                            </TooltipWrapper>
                        )}
                    </>
                );
            }}
        </InlineEdit>
    );
};

InlineEditTextInput.propTypes = {
    sidebar: PropTypes.element,
    className: PropTypes.string,
    initialValue: PropTypes.string,
    isDisabled: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    editLabel: PropTypes.string,
    addLabel: PropTypes.string
};

export default InlineEditTextInput;
