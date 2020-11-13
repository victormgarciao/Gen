import { types } from "mobx-state-tree";

const MouseModel = types
    .model("Mouse", {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
    })
    .actions(self => {
        return {
            setX(position) { self.x = position },
            setY(position) { self.y = position },
            setstartX(position) { self.startX = position },
            setstartY(position) { self.startY = position },


            setCoordinates(x, y) { 
                self.setX(x);
                self.setY(y);
            },


            setStartCoordinates(x, y) { 
                self.setstartX(x);
                self.setstartY(y);
            },


            setMousePosition(event) {
                const { pageX, pageY } = event || window.event;
                self.setCoordinates(pageX, pageY);
            },

            reset() {
                self.setStartCoordinates(0 , 0);
                self.setCoordinates(0, 0);
            }
        }
    })
    .views(self => {
        return {
            get diffMouseX() { return self.x - self.startX },
            get diffMouseY() { return self.y - self.startY },
            get isOnLeft() { return self.diffMouseX < 0 },
            get isOnTop() { return self.diffMouseY < 0 },
        }
    });

export default MouseModel