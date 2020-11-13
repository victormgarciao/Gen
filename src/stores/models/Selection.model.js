import { getParent, types } from "mobx-state-tree";
import MouseModel from "./Mouse.model";
import { getPositionFormated } from '../../utils/boxes/position.utils';
import { isObject2InsideObject1 } from "../../utils/selection/selection.utils";

const SelectionModel = types
    .model("Selection", {
        isSelectionOn: false,
        width: 0,
        height: 0,
        left: '0px',
        top: '0px',
        mouse: MouseModel
    })
    .actions(self => {
        return {
            setIsSelectionOn(state) { self.isSelectionOn = state },
            setWidth(width) { self.width = width },
            setHeight(height) { self.height = height },
            setLeft(left) { self.left = getPositionFormated(left) },
            setTop(top) { self.top = getPositionFormated(top) },


            onStartSelection(event) {
                const { target : { id: targetId } } = event;

                if (self.isThisTargetCanvas(targetId)) {
                    self.initiateSelection(event);
                }
            },


            initiateSelection({ pageX, pageY }) {
                self.setIsSelectionOn(true);
                self.mouse.setCoordinates(pageX, pageY);
                self.mouse.setStartCoordinates(pageX, pageY);
                self.setLeft(pageX);
                self.setTop(pageY);
            },


            onMoveSelection(event) {
                if (self.isSelectionOn) {
                    self.mouse.setMousePosition(event);
                    self.setWidth(Math.abs(self.mouse.diffMouseX));
                    self.setHeight(Math.abs(self.mouse.diffMouseY));
                    self.setLeft(self.leftPositionFormated);
                    self.setTop(self.topPositionFormated);
                }
            },


            onEndSelection() {
                const canvas = document.getElementById('canvas');
                const selectionSquare = canvas.querySelector(".selection");
                const allBoxesElements = [...canvas.querySelectorAll(".box")];
                const isInsideSelection = isObject2InsideObject1(selectionSquare);

                if (selectionSquare) { 
                    for (const boxElement of allBoxesElements) {
                        const mainStore = getParent(self, 1);
                        const box = mainStore.getBoxById(boxElement.id);
                        box.unselect();
                        if (isInsideSelection(boxElement)) { box.select(); }
                    }
                }
                self.resetSelection();
            },

            
            resetSelection() {
                self.setIsSelectionOn(false);
                self.setWidth(0);
                self.setHeight(0);
                self.setLeft(0);
                self.setTop(0);
                self.mouse.reset();
            }
        }
    })
    .views(self => {
        return {
            isThisTargetCanvas(id) { return id === 'canvas' },
            get leftPositionFormated() {
                return self.mouse.isOnLeft
                    ? self.mouse.x
                    : self.mouse.startX;
            },
            get topPositionFormated() {
                return self.mouse.isOnTop
                    ? self.mouse.y
                    : self.mouse.startY
            },
        }
    });

export default SelectionModel;