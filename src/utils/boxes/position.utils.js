import store from "../../stores/MainStore";
import { getAllBoxElementsList } from "../dom/dom.utils";

function updatePosition(oldPosition){
    return function handleNewPosition(newPosition) {
        return (parseFloat(oldPosition) || 0) + newPosition;
    };
};

// function getNewCoordinate(target) {
//     return function handleCoordinate(coordinate) {
//         const box = store.getBoxById(target.id);
//         const { left, top } = box;
//         console.log()

//         // const targetX = target.getAttribute('data-x');
//         // const targetY = target.getAttribute('data-y');
//         const updateLeftPosition = updatePosition(left);
//         const updateTopPosition = updatePosition(top);

//         return {
//             X: updateLeftPosition(coordinate.dx),
//             Y: updateTopPosition(coordinate.dy),
//         }
//     };
// };

function getNewCoordinate(target) {
    return function handleCoordinate(coordinate) {
        const targetX = target.getAttribute('data-x');
        const targetY = target.getAttribute('data-y');
        const updateXPosition = updatePosition(targetX);
        const updateYPosition = updatePosition(targetY);

        return {
            X: updateXPosition(coordinate.dx),
            Y: updateYPosition(coordinate.dy),
        }
    };
};

function moveElement({ style }) {
    return function moveTo(coordinate) {
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
    return function handleTranslation(coordinate) {
        const getBoxNewCoordinateWith = getNewCoordinate(box);
        const newCoordinate = getBoxNewCoordinateWith(coordinate)
        const moveBoxTo = moveElement(box);
        const updatePositionBoxElement = updatePositionAttributes(box);

        moveBoxTo(newCoordinate)
        updatePositionBoxElement(newCoordinate);
    };
};

export function translateBoxes(boxes) {
    return function handleBoxes(coordinate) {
        for (const box of boxes) {
            translateBox(box)(coordinate);
        }
    };
};

function setNewPositionToBox(box) {
    return function handleSetting(coordinate) {
        const getBoxNewCoordinateWith = getNewCoordinate(box);
        const newCoordinate = getBoxNewCoordinateWith(coordinate);
        store.setPositionToBox(box, newCoordinate);
    }
}

export function setNewPositionToBoxes(boxes){
    return function handleBoxes(coordinate) {
        for (const box of boxes) {
            setNewPositionToBox(box)(coordinate);
        }
    };
};

export function updateAxisOfAllBoxes() {
    // LOADING START STATE
    const allBoxes = getAllBoxElementsList();

    allBoxes.map((boxElement) => {
        const box = store.getBoxById(boxElement.id);
        return updatePositionAttributes(boxElement)({ X: box.left, Y: box.top })
    });
    // LOADING END STATE (when the map has been ended)
}

export function getPositionFormated(position) {
    return `${position}px`;
};
