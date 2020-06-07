import React from 'react';
import PropTypes from 'prop-types';
import { createSandbox, expect } from 'testStack';
import { $r, renderComponent, unmountComponent } from 'src/utils/ReactTestUtilsWrapper';
import InlineEdit, {keyCode} from './InlineEdit';
import Link from "../utils/Link";

const InlineEditLink = ({ startEdit }) => <Link onClick={startEdit} className="inline-edit-start-editing" />;

InlineEditLink.propTypes = {
    startEdit: PropTypes.func
};

describe('InlineEditTextArea', () => {
    let component;
    const sandbox = createSandbox();
    const mockProps = {
        initialValue: 'test',
        isDisabled: false,
        onConfirm: sandbox.spy(),
        onCancel: sandbox.spy(),
        maxLength: 26,
        enableScroll: true,
        children: InlineEditLink
    };
    const clickStartEditing = () => $r('.inline-edit-start-editing')[0].click();
    const clickCancel = () => $r('.inline-edit__button.button--secondary')[0].click();
    const clickConfirm = () => $r('.inline-edit__button.button--primary')[0].click();

    const renderMockComponent = props => renderComponent(InlineEdit, props);

    beforeEach(() => {
        component = renderMockComponent(mockProps);
    });

    afterEach(() => {
        unmountComponent();
        sandbox.reset();
    });

    describe('when created', () => {
        it('should store initial value', () => {
            expect(component.state.value).to.equal(mockProps.initialValue);
        });

        it('should store last saved value', () => {
            expect(component.lastSavedValue).to.equal(mockProps.initialValue);
        });
    });

    describe('start / stop editing', () => {
        it('should start editing', () => {
            expect(component.state.isEditing).to.equal(false);
            clickStartEditing();
            expect(component.state.isEditing).to.equal(true);
        });

        it('should not start editing if disabled', () => {
            const disabledProps = { ...mockProps, isDisabled: true };
            component = renderMockComponent(disabledProps);
            expect(component.state.isEditing).to.equal(false);
            clickStartEditing();
            expect(component.state.isEditing).to.equal(false);
        });

        it('should stop editing', () => {
            clickStartEditing();
            expect(component.state.isEditing).to.equal(true);
            clickCancel();
            expect(component.state.isEditing).to.equal(false);
        });
    });

    describe('when confirming', () => {
        it('call the onConfirm prop', () => {
            clickStartEditing();
            clickConfirm();
            expect(mockProps.onConfirm).to.have.been.calledWith('test');
        });

        it('trims the value', () => {
            const initialValueProps = { ...mockProps, initialValue: '   test   ' };
            component = renderMockComponent(initialValueProps);
            clickStartEditing();
            clickConfirm();
            expect(mockProps.onConfirm).to.have.been.calledWith('test');
        });

        it('stops editing', () => {
            clickStartEditing();
            clickConfirm();
            expect(component.state.isEditing).to.equal(false);
        });
    });

    describe('when cancelling', () => {
        it('stops editing', () => {
            clickStartEditing();
            expect(component.state.isEditing).to.equal(true);
            clickCancel();
            expect(component.state.isEditing).to.equal(false);
        });

        it('call the onCancel prop', () => {
            clickStartEditing();
            clickCancel();
            expect(mockProps.onCancel).to.have.been.calledOnce();
        });
    });

    describe('when changing input', () => {
        const allowedLengthValue = 'Lorem ipsum dolor sit ame';
        const excessiveLengthValue = `${allowedLengthValue} Lorem ipsum dolor sit amet`;

        it('sets state value equal to value', () => {
            component.handleTextAreaChanged(allowedLengthValue);
            expect(component.state.value).to.equal(allowedLengthValue);
        });

        it('does not set state value equal to value if it exceeds maxLength', () => {
            component.handleTextAreaChanged(allowedLengthValue);
            component.handleTextAreaChanged(excessiveLengthValue);
            expect(component.state.value).to.equal(allowedLengthValue);
        });

        it('calls preventDefault to disallow a new line', () => {
            /*
            * Using the maxlength attribute for <textarea /> and typing more characters then defined limit
            * is properly handled by the browser.
            * However on Edge, after pressing the enter key, users are able to type more characters than defined
            * maxlength limit.
            * */
            const event = {
                target: {
                    value: excessiveLengthValue
                },
                preventDefault: sandbox.spy(),
                stopPropagation: sandbox.spy(),
                keyCode: keyCode.ENTER
            };
            component.onKeyDown(event);
            expect(event.preventDefault).to.have.been.calledOnce();
            expect(event.stopPropagation).to.have.been.calledOnce();
        });
    });
});
