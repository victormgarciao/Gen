import store from "../../stores/MainStore";
import { getSelectedBoxElements } from "../dom/dom.utils";
import { translateBoxes, setNewPositionToBoxes } from './position.utils';

export function handleBoxTranslation(event) {
    const { target, dx, dy } = event;
    const currentBox = store.getBoxById(target.id);
    const coordinate = { dx, dy };
    const moveTargetTo = translateBoxes([target]);

    if (currentBox.selected) {
        moveSelectedBoxesTo(coordinate);
    } else {
        moveTargetTo(coordinate);
    }
};

function moveSelectedBoxesTo(coordinate) {
    const selectedBoxes = getSelectedBoxElements();
    const translateSelectedBoxesTo = translateBoxes(selectedBoxes);
    translateSelectedBoxesTo(coordinate);
}

export function handleBoxPropsAfterDrag (event) {
    const { target, dx, dy } = event;
    const currentBox = store.getBoxById(target.id);
    const coordinate = { dx, dy };
    const updateTargetPosition = setNewPositionToBoxes([target]);

    if(currentBox.selected) {
        updateSelectedBoxesPosition(coordinate)
    } else {
        updateTargetPosition(coordinate);
    }
};

function updateSelectedBoxesPosition(coordinate) {
    const selectedBoxes = getSelectedBoxElements();
    const setNewPositionToSelectedBoxes = setNewPositionToBoxes(selectedBoxes);
    setNewPositionToSelectedBoxes(coordinate);
};
