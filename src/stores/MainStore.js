import { destroy, onPatch, types } from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box.model";
import getRandomColor from "../utils/getRandomColor";
import { values } from "mobx";
import { UndoManager } from "mst-middlewares";
import SelectionModel from "./models/Selection.model";
import MouseModel from "./models/Mouse.model";

function createBox() {
    return BoxModel.create({
        id: uuid(),
        color: getRandomColor(),
        left: 0,
        top: 0
    });
};

const MainStore = types
    .model("MainStore", {
        boxes: types.array(BoxModel),
        history: types.optional(UndoManager, {}),
        selection: SelectionModel,
    })
    .actions(self => {
        setUndoManager(self);

        return {
            addBoxToStore() {
                self.boxes.push(createBox());
            },

            removeBox(box) {
                destroy(box);
            },

            removeSelectedBoxes() {
                self.getSelectedBoxes()
                    .map((box) => destroy(box));
            },

            removeAllBoxes() {
                self.boxes.clear();
            },

            setColorToSelectedBoxes(event) {
                const newColor = event.target.value;
                self.getSelectedBoxes()
                    .map((box) => box.color = newColor);
            },

            setPositionToBox(boxToChange, coordinate) {
                const boxFound = self.getBoxById(boxToChange.id);
                boxFound.left = coordinate.X;
                boxFound.top = coordinate.Y;
            },

            init() {
                const boxesFromStorage = JSON.parse(localStorage.getItem('boxes'));
                if (boxesFromStorage) { self.boxes = boxesFromStorage; }
            },

            undo() { undoManager.canUndo && undoManager.undo() },
            redo() { undoManager.canRedo && undoManager.redo() },
        };
    })
    .views(self => {
        return {
            getSelectedBoxes() {
                return self.boxes.filter((box) => box.selected);
            },

            getSelectedBoxesLabel() {
                const selectedBoxes = self.getSelectedBoxes();
                const isNotEmpty = selectedBoxes.length;
                return isNotEmpty ? `Boxes selected: ${selectedBoxes.length}` : 'No boxes selected';
            },

            getBoxById(idToFind) {
                return self.boxes.find((box) => box.id === idToFind);
            },

            canUndo() { return undoManager.canUndo },
            canRedo() { return undoManager.canRedo },
        };
  })
;

export let undoManager = {}
export const setUndoManager = (targetStore) => {
    undoManager = targetStore.history
};


const store = MainStore.create({
    selection: SelectionModel.create({
        mouse: MouseModel.create(),
    }),
});
store.init();

onPatch(store, patch => {
    // console.log(patch);
    localStorage.setItem('boxes', JSON.stringify(values(store.boxes)));
});

export default store;
