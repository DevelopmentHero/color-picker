"use strict";
/**
 * Static class that provides utility methods that perform common tasks involving nodes in a visual tree.
 */
let TreeHelper = {

    /**
     * Gets the offset of a specified DOMNode relative to the window.
     * @param {HTMLElement} Node The node whose offset is returned.
     * @returns {Object} An object that represents the offset of the specified node. {top: Number, left: Number}.
     */
    GetOffset: function (Node) {
        let iLeftOffset = Node.offsetLeft;
        let iTopOffset = Node.offsetTop;
        for (let Parent of this.OffsetParents(Node)) {
            iTopOffset += Parent.offsetTop;
            iLeftOffset += Parent.offsetLeft;
        }
        return {left: iLeftOffset, top: iTopOffset};
    },

    /**
     * Gets the left offset of a specified DOMNode relative to the window.
     * @param {HTMLElement} Node The node whose left offset is returned.
     * @returns {Number} The left offset off the specified node in pixels. 
     */
    GetLeftOffset: function (Node) {
        let iOffset = Node.offsetLeft;
        for (let Parent of this.OffsetParents(Node)) {
            iOffset += Parent.offsetLeft;
        }
        return iOffset;
    },

    /**
     * Gets the top offset of a specified DOMNode relative to the window.
     * @param {HTMLElement} Node The node whose top offset is returned.
     * @returns {Number} The top offset off the specified node in pixels. 
     */
    GetTopOffset: function (Node) {
        let iOffset = Node.offsetTop;
        for (let Parent of this.OffsetParents(Node)) {
            iOffset += Parent.offsetTop;
        }
        return iOffset;
    },

    /**
     * Determines whether two elements visually collide/overlap.
     * @param {HTMLElement} First The first element to check.
     * @param {HTMLElement} Second The second element to check.
     * @returns {Boolean} True if the specified elements visually collide/overlap; otherwise, false.
     */
    HitTest: function (First, Second) {
        //Cache values to reduce reflows on every access.
        let iFirstOffsetTop = First.offsetTop;
        let iFirstOffsetLeft = First.offsetLeft;
        let iSecondOffsetTop = Second.offsetTop;
        let iSecondOffsetLeft = Second.offsetLeft;

        //Perform hittest.
        return !(((iFirstOffsetTop + First.offsetHeight) < (iSecondOffsetTop)) ||
                (iFirstOffsetTop > (iSecondOffsetTop + Second.offsetHeight)) ||
                ((iFirstOffsetLeft + First.offsetWidth) < iSecondOffsetLeft) ||
                (iFirstOffsetLeft > (iSecondOffsetLeft + Second.offsetWidth)));
    },

    /**
     * Generator that iterates over the offset-parents of a DOMNode until it reaches the top-most DOMNode within the document.
     * @param {HTMLElement} Node The node off which the offset-parents will get fetched.
     * @returns {Generator} A generator that returns the offset-parents of the specified DOMNode.
     */
    OffsetParents: function* (Node) {
        for (Node = Node.offsetParent; Node !== null; Node = Node.offsetParent) {
            yield Node;
        }
    }
};