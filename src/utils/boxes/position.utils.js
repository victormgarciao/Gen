import store from "../../stores/MainStore";
import { getSelectedBoxElements, getAllBoxElementsList } from "../dom/dom.utils";

function getNewPosition(target){
    return function handleNewPosition(newPosition) {
        return (parseFloat(target) || 0) + newPosition;
    };
};

function getCoordinate(target) {
    return function handleCoordinate(position) {
        const targetX = target.getAttribute('data-x');
        const targetY = target.getAttribute('data-y');

        return {
            X: getNewPosition(targetX)(position.dx),
            Y: getNewPosition(targetY)(position.dy),
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
    return function handleTranslation(position) {
        const newCoordinate = getCoordinate(box)(position)
        translateElement(box)(newCoordinate)
        updatePositionAttributes(box)(newCoordinate);
    };
};

function translateBoxes(boxes) {
    return function handleBoxes(position) {
        for (const box of boxes) {
            translateBox(box)(position);
        }
    };
};

function setNewPositionToBox(box) {
    return function handleSetting(position) {
        const newCoordinate = getCoordinate(box)(position);
        store.setPositionToBox(box, newCoordinate);
    }
}

function setNewPositionToBoxes(boxes){
    return function handleBoxes(position) {
        for (const box of boxes) {
            setNewPositionToBox(box)(position);
        }
    };
};

export function updateAxisOfAllBoxes() {
    // LOADING START STATE
    const allBoxes = getAllBoxElementsList();
    // debugger;
    allBoxes.map((boxElement) => {
        const box = store.getBoxById(boxElement.id);
        return updatePositionAttributes(boxElement)({ X: box.left, Y: box.top })
    });
    // LOADING END STATE (when the map has been ended)
}

export function handleBoxTranslation(event) {
    const { target, dx, dy } = event;
    const currentBox = store.getBoxById(target.id);
    const position = { dx, dy };
    const moveTargetTo = translateBoxes([target]);

    if (currentBox.selected) {
        moveSelectedBoxesTo(position);
    } else {
        moveTargetTo(position);
    }
};

function moveSelectedBoxesTo(position) {
    const selectedBoxes = getSelectedBoxElements();
    const translateSelectedBoxesTo = translateBoxes(selectedBoxes);
    translateSelectedBoxesTo(position);
}

export function handleBoxPropsAfterDrag (event) {
    const { target, dx, dy } = event;
    const currentBox = store.getBoxById(target.id);
    const position = { dx, dy };
    const updateTargetPosition = setNewPositionToBoxes([target]);

    if(currentBox.selected) {
        updateSelectedBoxesPosition(position)
    } else {
        updateTargetPosition(position);
    }
};

function updateSelectedBoxesPosition(position) {
    const selectedBoxes = getSelectedBoxElements();
    const setNewPositionToSelectedBoxes = setNewPositionToBoxes(selectedBoxes);
    setNewPositionToSelectedBoxes(position);
};
