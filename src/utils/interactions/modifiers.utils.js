import interact from "interactjs";

export const parentRestriction = [
    interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
    })
];