import React from 'react';
import InlineEditTextInput from "./components/InlineEditTextInput";
import InlineEditTextArea from "./components/InlineEditTextArea";
import './styles/_global.scss'

const Demo = () => {
    return (
        <div className="app-container">
            <div>
                <InlineEditTextInput
                    initialValue="My Dashboard"
                    name="inlineEditPlaceholder"
                    maxLength={50}
                    editLabel="Click here to edit dashboard name"
                    addLabel="Click here to add dashboard name"
                    onChange={() => null}
                    onConfirm={() => null}
                    onCancel={() => null}
                />
            </div>

            <div>
                <InlineEditTextArea
                    initialValue=""
                    name="inlineEditPlaceholder"
                    maxLength={2000}
                    editLabel="Click here to edit description"
                    addLabel="Click here to add description"
                    onChange={() => null}
                    onConfirm={() => null}
                    onCancel={() => null}
                />
            </div>
        </div>
    );
};

export default Demo;
