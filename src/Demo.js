import React from 'react';
import InlineEditTextInput from "./components/InlineEditTextInput";
import InlineEditTextArea from "./components/InlineEditTextArea";
import './styles/_global.scss'
import Button from "./utils/Button";

const Demo = () => {
    return (
        <div className="app-container">
            <div className="demo-header__background" />

            <header className={"demo-header"}>
                <div className={"demo-header__content"}>
                    <h1>Demo</h1>
                    <p>Try out the different variations of the InlineEdit component</p>
                </div>
            </header>

            <div className="demo-content">
                <div className="demo-content__card">
                    <h3>Inline Text Input - with Initial Value</h3>
                    <InlineEditTextInput
                        initialValue="Initial text input"
                        name="inlineEditPlaceholder"
                        maxLength={50}
                        editLabel="Click here to edit description"
                        addLabel="Click here to add description"
                        onChange={() => null}
                        onConfirm={() => null}
                        onCancel={() => null}
                    />
                </div>

                <div className="demo-content__card">
                    <h3>Inline Text Input - with empty Initial Value</h3>
                    <InlineEditTextInput
                        initialValue=""
                        name="inlineEditPlaceholder"
                        maxLength={50}
                        editLabel="Click here to edit text input"
                        addLabel="Click here to add text"
                        onChange={() => null}
                        onConfirm={() => null}
                        onCancel={() => null}
                    />
                </div>

                <div className="demo-content__card">
                    <h3>Inline Text Input - disabled</h3>
                    <InlineEditTextInput
                        initialValue="Non-Editable Text Input"
                        isDisabled
                        name="inlineEditPlaceholder"
                        maxLength={50}
                        editLabel="Click here to edit text input"
                        addLabel="Click here to add text"
                        onChange={() => null}
                        onConfirm={() => null}
                        onCancel={() => null}
                    />
                </div>

                <div className="demo-content__card">
                    <h3>Inline Text Input - with actions sidebar (hide sidebar upon click)</h3>
                    <InlineEditTextInput
                        initialValue="Text input description"
                        name="inlineEditPlaceholder"
                        maxLength={50}
                        editLabel="Click here to edit description"
                        addLabel="Click to add description"
                        onChange={() => null}
                        onConfirm={() => null}
                        onCancel={() => null}
                        sidebar={
                            <div>
                                <a style={{ marginRight: '8px' }}>Actions Link</a>
                                <Button primary>Save</Button>
                            </div>
                        }
                    />
                </div>

                <div className="demo-content__card">
                    <h3>Inline Text Area - with Initial Value</h3>
                    <InlineEditTextArea
                        initialValue="A simple text description that will spread out over a couple of lines at the very least for this preview."
                        name="inlineEditPlaceholder"
                        maxLength={2000}
                        editLabel="Click here to edit"
                        addLabel="Click here to add"
                        onChange={() => null}
                        onConfirm={() => null}
                        onCancel={() => null}
                    />
                </div>

                <div className="demo-content__card">
                    <h3>Inline Text Area - with empty Initial Value</h3>
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

                <div className="demo-content__card">
                    <h3>Inline Text Area - disabled</h3>
                    <InlineEditTextArea
                        initialValue="When disabled the description will display but will be unable to be edited"
                        isDisabled
                        name="inlineEditPlaceholder"
                        maxLength={2000}
                        editLabel="Click here to edit"
                        addLabel="Click here to add"
                        onChange={() => null}
                        onConfirm={() => null}
                        onCancel={() => null}
                    />
                </div>

                <div className="demo-content__card">
                    <h3>Inline Text Area - with max-height</h3>
                    <InlineEditTextArea
                        initialValue="A simple text description that will spread out over a couple of lines at the very least for this preview.  It will become scrollable when it reaches max-height."
                        name="inlineEditPlaceholder"
                        maxLength={2000}
                        editLabel="Click here to edit"
                        addLabel="Click here to add"
                        onChange={() => null}
                        onConfirm={() => null}
                        onCancel={() => null}
                        enableScroll
                    />
                </div>
            </div>
        </div>
    );
};

export default Demo;
