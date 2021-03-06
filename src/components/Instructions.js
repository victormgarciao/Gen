import React from 'react';

function Instructions() {
    return(
        <ul style={{ color: "white", textAlign: 'left', width: '1150px' }}>
            <h1>How it works</h1>
            <li>You can add boxes with the button "Add Box" with a random color</li>
            <li>You can delete all boxes with button "Remove All Boxes"</li>
            <li>You can delete only selected boxes with button "Remove Selected Boxes"</li>
            <li>You can select one box by clicking on it</li>
            <li>You can select several boxes keeping pressed the mouse on the white area</li>
            <li>Each selected box will be highlighted and it will have a "x" button on the corner"</li>
            <li>You can delete that box with that "x" button"</li>

            <li>You can drag and move boxes</li>
            <li>If you move one selected box, you will move all selected boxes as well"</li>
            <li>If you move one non selected box, you only move that one"</li>
            <li>You can change the color of the selected boxes by clicking on the color selector</li>
            <li>It keeps the state in the localStorage</li>
            <li>And also, if you make a mistake, you can undo or redo your actions with buttons "undo" and "redo"</li>

            <h2>NEW</h2>
            <li>Now you you select with the selection area, dont toggle it</li>
            <li>Now you you can deselect everything just by clicking in an empty area</li>
            <h2>Enjoy!!</h2>
        </ul>
    );
} 

export default Instructions;