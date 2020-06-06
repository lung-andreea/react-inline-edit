/**
 * Based on the React-Perfect-Scrollbar component at https://github.com/goldenyz/react-perfect-scrollbar
 */

import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';

const SCROLLABLE_AREA_ADJUSTMENT = 5;

class Scrollable extends React.Component {
    constructor(props) {
        super(props);

        this.scrollbarOptions = {
            suppressScrollY: !props.enableYAxis,
            suppressScrollX: !props.enableXAxis,
            wheelPropagation: props.propagateScrollToParent,
            minScrollbarLength: 40
        };

        this.updateScrollbar = this.updateScrollbar.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.perfectScrollbarInstance = new PerfectScrollbar(this.scrollbarContainer, this.scrollbarOptions);
        window.addEventListener('resize', this.updateScrollbar);

        if (this.props.registerScroll) {
            this.registerScrollListener();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.registerScroll && this.props.registerScroll) {
            // Example: prevProps.registerScroll=true when a feed is updated in search page increasing the total number of articles to more than 10
            // => we need to register a scroll listener in order to support infinite scrolling (bringing more articles on scroll to bottom)
            this.registerScrollListener();
        } else if (prevProps.registerScroll && !this.props.registerScroll) {
            // Example: prevProps.registerScroll=false when a feed is updated in search page decreasing the total number of articles to less than 10
            // => we need to unregister the scroll listener if it was previously added in order not to waste memory
            this.unregisterScrollListener();
        }

        this.updateScrollbar();
    }

    componentWillUnmount() {
        this.unregisterScrollListener();
        window.removeEventListener('resize', this.updateScrollbar);
        this.perfectScrollbarInstance.destroy();
    }

    registerScrollListener() {
        this.scrollbarContainer.addEventListener('scroll', this.handleScroll);
    }

    unregisterScrollListener() {
        this.scrollbarContainer.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (this.isScrolledToBottom()) {
            this.props.onScrollBottom && this.props.onScrollBottom();
        }
    }

    updateScrollbar() {
        this.perfectScrollbarInstance.update();

        if (this.props.onScrollBottom && this.isScrolledToBottom()) {
            // we have to supply a smaller value then maximum value possible
            this.scrollbarContainer.scrollTop = this.scrollbarContainer.scrollTop - 1;
        }
    }

    isScrolledToBottom() {
        const container = this.scrollbarContainer;
        return container.scrollTop + container.offsetHeight >= container.scrollHeight - SCROLLABLE_AREA_ADJUSTMENT;
    }

    resetsScrollingToTheTop() {
        this.scrollbarContainer.scrollTop = 0;
    }

    render() {
        const scrollableChildren = React.Children.map(
            this.props.children,
            child => (child ? React.cloneElement(child) : null)
        );

        return (
            <div
                className="scrollbar-container"
                ref={ref => {
                    this.scrollbarContainer = ref;
                }}
            >
                {scrollableChildren}
            </div>
        );
    }
}

const scrollablePropTypes = {
    enableYAxis: PropTypes.bool,
    enableXAxis: PropTypes.bool,
    registerScroll: PropTypes.bool,
    propagateScrollToParent: PropTypes.bool,
    children: PropTypes.node,
    onScrollBottom: PropTypes.func
};

Scrollable.propTypes = scrollablePropTypes;

Scrollable.defaultProps = {
    enableYAxis: true,
    enableXAxis: false,
    registerScroll: false,
    propagateScrollToParent: true
};

export default Scrollable;
export { scrollablePropTypes };
