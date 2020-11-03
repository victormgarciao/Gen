export function isObject2InsideObject1(obj1) {
    return function(obj2) {
        const firstObject = obj1.getBoundingClientRect();
        const secondObject = obj2.getBoundingClientRect();

        const isSecondObjectInsideFirst =
            firstObject.x < secondObject.x + secondObject.width &&
            firstObject.x + firstObject.width > secondObject.x &&
            firstObject.y < secondObject.y + secondObject.height &&
            firstObject.y + firstObject.height > secondObject.y;

        return isSecondObjectInsideFirst;
    };
};
