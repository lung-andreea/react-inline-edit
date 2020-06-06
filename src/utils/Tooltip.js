import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import { createPopper } from '@popperjs/core';

const getTooltipsContainer = () => {
    let container = document.querySelector('.newsdesk-tooltip');
    if (container) {
        return container;
    }
    container = document.createElement('div');
    container.setAttribute('class', 'newsdesk-tooltip');
    document.body.appendChild(container);

    return container;
};

function withTooltip(referenceElement, config) {
    let popperInstance = null;
    let tooltip = null;

    function create() {
        if (tooltip) {
            return;
        }
        tooltip = document.createElement('div');
        tooltip.setAttribute('class', 'tooltip');
        let tooltipArrow = document.createElement('div');
        tooltipArrow.setAttribute('class', 'tooltip__arrow');
        tooltip.appendChild(tooltipArrow);
        let tooltipContent = document.createElement('div');
        tooltipContent.setAttribute('class', 'tooltip__content');
        tooltipContent.appendChild(document.createTextNode(config.title));
        tooltip.appendChild(tooltipContent);

        getTooltipsContainer().appendChild(tooltip);

        popperInstance = createPopper(referenceElement, tooltip, {
            placement: config.placement,
            modifiers: [{ name: 'offset', options: { offset: [0, 13] } }] // eslint-disable-line no-magic-numbers
        });
    }

    function destroy() {
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
        if (tooltip) {
            getTooltipsContainer().removeChild(tooltip);
            tooltip = null;
        }
    }

    referenceElement.addEventListener('mouseenter', create);
    referenceElement.addEventListener('mouseleave', destroy);
    referenceElement.addEventListener('focus', create);
    referenceElement.addEventListener('blur', destroy);

    return {
        dispose: () => {
            destroy();
            referenceElement.removeEventListener('mouseenter', create);
            referenceElement.removeEventListener('mouseleave', destroy);
            referenceElement.removeEventListener('focus', create);
            referenceElement.removeEventListener('blur', destroy);
        }
    };
}

const TooltipOverlay = ({ targetRef, title, placement, container }) => {
    const overlayRef = useRef();
    const arrowRef = useRef();

    useLayoutEffect(() => {
        const popperInstance = createPopper(targetRef.current, overlayRef.current, {
            placement: placement,
            modifiers: [
                { name: 'arrow', options: { element: arrowRef.current } },
                { name: 'offset', options: { offset: [0, 13] } } // eslint-disable-line no-magic-numbers
            ]
        });

        return () => {
            popperInstance.destroy();
        };
    }, []);

    return ReactDOM.createPortal(
        <div ref={overlayRef} className="tooltip" role="tooltip">
            <div ref={arrowRef} className="tooltip__arrow" />
            <div className="tooltip__content">{title}</div>
        </div>,
        container
    );
};

TooltipOverlay.propTypes = {
    targetRef: PropTypes.object.isRequired,
    title: PropTypes.node,
    placement: PropTypes.string,
    container: PropTypes.object
};

TooltipOverlay.defaultProps = {
    container: document.body
};

const Tooltip = ({ children, title, placement }) => {
    const targetRef = useRef();
    const [visible, setVisible] = useState(false);

    const handleShow = () => setVisible(true);
    const handleHide = () => setVisible(false);

    if (!title) {
        return children;
    }

    return (
        <>
            {React.cloneElement(children, {
                ref: targetRef,
                onMouseEnter: handleShow,
                onMouseLeave: handleHide,
                onFocus: handleShow,
                onBlur: handleHide
            })}
            {visible && <TooltipOverlay title={title} placement={placement} targetRef={targetRef} />}
        </>
    );
};

Tooltip.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.node,
    placement: PropTypes.oneOf([
        'top-start',
        'top',
        'top-end',
        'left-start',
        'left',
        'left-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'right-start',
        'right',
        'right-end'
    ])
};

Tooltip.defaultProps = {
    placement: 'bottom'
};

export default Tooltip;
export { withTooltip };
