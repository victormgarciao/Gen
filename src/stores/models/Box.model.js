import { types, getParent } from "mobx-state-tree";

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: 200,
    height: 100,
    color: "#FFF000",
    left: 200,
    top: 100,
    selected: false,
  })
  .views(self => ({}))
  .actions(self => {
    return {
      toggle() {
        self.selected = !self.selected;
      },

      remove() {
        getParent(self, 1).removeItem(self);
      }
    }
  });

export default BoxModel;
