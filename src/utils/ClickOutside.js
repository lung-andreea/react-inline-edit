import React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';

class ClickOutside extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickOnBody = this.handleClickOnBody.bind(this);
    }

    componentDidMount() {
        document.addEventListener(this.props.clickEventName, this.handleClickOnBody);
    }

    componentWillUnmount() {
        document.removeEventListener(this.props.clickEventName, this.handleClickOnBody);
    }

    handleClickOnBody(event) {
        let domNode;
        try {
            domNode = ReactDOM.findDOMNode(this);
        } catch (e) {
            // Occasionally get React error "Unable to find node on an unmounted component." otherwise
        }
        if (domNode && !domNode.contains(event.target)) {
            this.props.onClick(event);
        }
    }

    render() {
        return this.props.children;
    }
}

ClickOutside.defaultProps = {
    clickEventName: 'click'
};

ClickOutside.propTypes = {
    clickEventName: PropTypes.oneOf(['click', 'mousedown', 'mouseup']),
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default ClickOutside;
