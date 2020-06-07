import React from 'react';
import PropTypes from 'prop-types';
import InlineEdit from './InlineEdit';
import classnames from 'classnames';
import AutoresizeInput from "../utils/AutoresizeInput";
import Link from "../utils/Link";
import Scrollable from "../utils/Scrollable";

const InlineEditTextArea = props => {
    const { isDisabled, className, editLabel, addLabel, enableScroll } = props;
    let classes = classnames(className, 'inline-edit-text-area');

    return (
        <InlineEdit {...props} className={classes}>
            {renderProps => {
                const { value, isEditing, startEdit, inputProps } = renderProps;
                let ScrollWrapper = enableScroll ? Scrollable : React.Fragment;
                let containerClasses = classnames('inline-edit-text-area__container', {
                    'inline-edit--grow': isEditing
                });
                return (
                    <div className={containerClasses}>
                        <ScrollWrapper>
                            <div className="inline-edit__display-text">{value}</div>
                        </ScrollWrapper>
                        {!isDisabled && (
                            <Link onClick={startEdit} className="inline-edit-text-area__edit-link">
                                {value && value.length ? editLabel : addLabel}
                            </Link>
                        )}
                        {isEditing && <AutoresizeInput {...inputProps} />}
                    </div>
                );
            }}
        </InlineEdit>
    );
};

InlineEditTextArea.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    initialValue: PropTypes.string,
    isDisabled: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    editLabel: PropTypes.string,
    addLabel: PropTypes.string,
    enableScroll: PropTypes.bool
};

export default InlineEditTextArea;
