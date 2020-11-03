import store from "../../stores/MainStore";
import { getSelectedBoxElements, getAllBoxElementsList } from "../dom/dom.utils";

function getNewPosition(target){
    return function handleNewPosition(newPosition) {
        return (parseFloat(target) || 0) + newPosition;
    };
};

function getCoordinate(target) {
    return function handleCoordinate(event) {
        const targetX = target.getAttribute('data-x');
        const targetY = target.getAttribute('data-y');

        return {
            X: getNewPosition(targetX)(event.dx),
            Y: getNewPosition(targetY)(event.dy),
        }
    };
};

function translateElement({ style }) {
    return function setNewCoordinate(coordinate) {
        const newTransform = `translate(${coordinate.X}px, ${coordinate.Y}px)`;
        style.webkitTransform = style.transform = newTransform;
    };
};

function updatePositionAttributes(target) {
    return function setNewDataAxis(coordinate) {
        target.setAttribute('data-x', coordinate.X);
        target.setAttribute('data-y', coordinate.Y);
    };
};

function translateBox(box) {
    return function handleTranslation(event) {
        const newCoordinate = getCoordinate(box)(event)
        translateElement(box)(newCoordinate)
        updatePositionAttributes(box)(newCoordinate);
    };
};

function setNewPositionToBox(box) {
    return function handleSetting(event) {
        const newCoordinate = getCoordinate(box)(event);
        store.setPositionToBox(box, newCoordinate);
    }
}

function translateBoxes(boxes) {
    return function handleBoxes(event) {
        for (const box of boxes) {
            translateBox(box)(event);
        }
    };
};

function setNewPositionToBoxes(boxes){
    return function handleBoxes(event) {
        for (const box of boxes) {
            setNewPositionToBox(box)(event);
        }
    };
};

export function handleBoxBeforeDrag() {
    function updateAxisOfAllBoxes() {
        const allBoxes = getAllBoxElementsList();
        allBoxes.map((boxElement) => {
            const box = store.getBoxById(boxElement.id);
            return updatePositionAttributes(boxElement)({ X: box.left, Y: box.top })
        });
    }

    updateAxisOfAllBoxes();
}

export function handleBoxTranslation(event) {
    const target = event.target;
    const box = store.getBoxById(target.id);

    if (box.selected) {
        const selectedBoxes = getSelectedBoxElements();
        translateBoxes(selectedBoxes)(event);
    } else {
        translateBoxes([target])(event);
    }
};

export function handleBoxPropsAfterDrag (event) {
    const target = event.target;
    const currentBox = store.getBoxById(target.id);

    if(currentBox.selected) {
        const selectedBoxes = getSelectedBoxElements();
        setNewPositionToBoxes(selectedBoxes)(event);   
    } else {
        setNewPositionToBoxes([target])(event);
    }
};
