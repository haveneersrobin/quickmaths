/**
 * Grid generator
 */

function createEmptyGrid(nbCols, levelLength) {

    // Create empty grid, given nbCols (x-axis) and levelLength (y-axis)
    var grid = new Array(nbCols);
    for (var i = 0; i < nbCols; i++) {
        grid[i] = new Array(levelLength);
    }
    return grid;
}

/**
 * 
 * @param {*} nbCols - The width of the grid
 * @param {*} levelLength - The height of the grid
 * @param {*} solution - The solution of the level
 * @param {*} maxNumber - The heighest possible number to be generated
 */
/* function createSumGridOLD(nbCols, levelLength, solution, maxNumber) {

    const fillRate = 0.75; // The ratio of filled tiles to total tiles
    const correctRate = 0.33 // The ratio of correct tiles to filled tiles

    // Init solution map
    var resultMap = new Array(nbCols);
    for (var i = 0; i < nbCols; i++) {
        resultMap[i] = new Array(levelLength);
    }

    // Fill solutionMap as false
    for (var i = 0; i < nbCols; i++) {
        for (var j = 0; j < levelLength; j++) {
            resultMap[i][j] = -1; // -1 is the result for empty tiles
        }
    }

    // Init grid
    var grid = new Array(nbCols);
    for (var i = 0; i < nbCols; i++) {
        grid[i] = new Array(levelLength);
    }

    // Fill grid with one space
    for (var i = 0; i < nbCols; i++) {
        for (var j = 0; j < levelLength; j++) {
            grid[i][j] = '';
        }
    }

    // Init result
    var result = {
        objective: solution,
        grid: {}
    }

    // First, generate all random answers
    var randNums = new Array(nbCols * levelLength);
    for (var i = 0; i < randNums.length; i++) {
        // Test wheter a tile needs to be filled (config: fillRate)
        if (Math.random() <= fillRate) {
            // Generate random integer
            randNums[i] = getRandomInt(0, maxNumber);
        }
    }

    var hasCorrectTile = false; // Denotes whether a row already has a correct tile
    // Iterate over each row
    for (var i = 0; i < levelLength; i++) {
        // Reset hasCorrectTile flag
        hasCorrectTile = false;
        for (var j = 0; j < nbCols; j++) {
            var currentNum = randNums[i * nbCols + j]; // Contains entry for random number
            if (Number.isInteger(currentNum) && !hasCorrectTile && currentNum != solution) {
                // Test whether to fill with correct number or not
                if (Math.random() <= correctRate) {
                    // Set flag and generate parts of sum
                    hasCorrectTile = true;
                    var randPart = getRandomInt(0, solution);
                    var counterPart = solution - randPart;
                    // Parse to string and save to grid
                    grid[j][i] = randPart + '+' + counterPart;
                    // Fill in the resultMap
                    resultMap[j][i] = solution;
                }

                // Edge case: randomly generated number is equal to the solution
                else if (currentNum === solution) {
                    // Set flag and generate parts of sum
                    hasCorrectTile = true;
                    var randPart = getRandomInt(0, currentNum);
                    var counterPart = currentNum - randPart;
                    // Parse to string and save to grid
                    grid[j][i] = randPart + '+' + counterPart;
                    // Fill in the resultMap
                    resultMap[j][i] = currentNum; // === solution
                }

                // Else generate parts of sum of wrong tile
                else if (Number.isInteger(currentNum)) {
                    var randPart = getRandomInt(0, currentNum);
                    var counterPart = currentNum - randPart;
                    // Parse to string and save to grid
                    grid[j][i] = randPart + '+' + counterPart;
                    // Fill in the resultMap
                    resultMap[j][i] = currentNum; // Random number as wrong solution

                }
                // else leave tile blank, no parsing needed
            }
        }
    }

    // Init resultArray: result[0] = grid, result[1] = solutionMap
    var result = new Array(2);
    result[0] = grid;
    result[1] = resultMap;
    return result;
} */

// General Helper Functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {*} nbCols - The width of the grid
 * @param {*} levelLength - The height of the grid
 * @param {*} solution - The solution of the level
 * @param {*} maxNumber - The heighest possible number to be generated
 */
function createSumGrid(nbCols, levelLength, solution, maxNumber) {

    const fillRate = 0.7; // The ratio of filled tiles to total tiles
    const correctRate = 0.45; // The ratio of correct tiles to filled tiles

    // Init result
    var result = {
        objective: 'Welke uitkomst is ' + solution + '?',
        numericSolution: solution,
        grid: []
    }

    var hasCorrectTile = false; // Denotes whether a row already has a correct tile
    // currentRow will be added to the grid elem of result
    var currentRow = [];
    // currentNum is the randomly generated integer
    var currentNum = -1; // Default number

    // Iterate over each row
    var i = 0;
    while (i < levelLength) {
        // Reset hasCorrectTile flag
        hasCorrectTile = false;
        // Clear temp var currentRow
        currentRow = [];
        for (var j = 0; j < nbCols; j++) {

            // Init columnElem
            // string = string representation on grid
            // numResult = result of given string (int)
            var currentElem = {
                string: '',
                numResult: -1,
                correct: false
            }

            // Generate random number
            if (Math.random() <= fillRate) {
                // Generate random integer
                currentNum = getRandomInt(0, maxNumber);
            }
            else {
                // Else fill in -1.
                currentNum = -1;
            }

            // Edge case: randomly generated number is equal to the solution
            if (!hasCorrectTile && currentNum === solution) {
                // Set flag and generate parts of sum
                hasCorrectTile = true;
                var randPart = getRandomInt(0, currentNum);
                var counterPart = currentNum - randPart;

                currentElem.string = randPart + '+' + counterPart;
                currentElem.numResult = currentNum; // === solution
                currentElem.correct = true;
            }

            // Logic about tile filling
            else if (!hasCorrectTile && currentNum != -1) {
                // Test whether to fill with correct number or not
                if (Math.random() <= correctRate) {
                    // Add correct tile
                    // Set flag and generate parts of sum
                    hasCorrectTile = true;
                    var randPart = getRandomInt(0, solution);
                    var counterPart = solution - randPart;

                    currentElem.string = randPart + '+' + counterPart;
                    currentElem.numResult = solution;
                    currentElem.correct = true;
                }
                else {
                    // Else generate parts of sum of wrong tile
                    var randPart = getRandomInt(0, currentNum);
                    var counterPart = currentNum - randPart;

                    currentElem.string = randPart + '+' + counterPart;
                    currentElem.numResult = currentNum
                }
            }

            else if (currentNum != -1) {
                // Else generate parts of sum of wrong tile
                var randPart = getRandomInt(0, currentNum);
                var counterPart = currentNum - randPart;

                currentElem.string = randPart + '+' + counterPart;
                currentElem.numResult = currentNum
            }
            // Else leave elem as default, no action needed

            // Push new elemenent into row
            currentRow.push(currentElem);
        }

        // Check if row is empty
        var filled = false;
        for (var k = 0; k < nbCols; k++) {
            if (currentRow[k].numResult !== -1) {
                filled = true;
            }
        }

        // if row is empty, try again (don't increment i)
        // if row is not empty, write to grid and increment i
        if (filled) {
            result.grid.push(currentRow);
            i++; // Increment row counter
        }
    }
    return result;
}

/**
 * 
 * @param {*} nbCols - The width of the grid
 * @param {*} levelLength - The height of the grid
 * @param {*} divider - The number by what the numbers in the grid have to be dividable
 * @param {*} maxNumber - The heighest possible number to be generated
 */
function createModuloGrid(nbCols, levelLength, divider, maxNumber) {

    const fillRate = 0.7; // The ratio of filled tiles to total tiles
    const correctRate = 0.45; // The ratio of correct tiles to filled tiles

    // Init result
    // grid contains the numbers, and a boolean if a tile is a correct answer
    var result = {
        objective: 'Welk getal is deelbaar door ' + divider + '?',
        grid: []
    }

    var hasCorrectTile = false; // Denotes whether a row already has a correct tile
    // currentRow will be added to the grid elem of result
    var currentRow = [];
    // denotes whether a tile will be filled
    var fillTile = false;
    // Temp var to generate new number into
    var currentNum = 0;

    // Iterate over each row
    var i = 0;
    while (i < levelLength) {
        // Reset hasCorrectTile flag
        hasCorrectTile = false;
        // Clear temp var currentRow
        currentRow = [];
        for (var j = 0; j < nbCols; j++) {

            // Clear temp var currentNum
            currentNum = 0;

            // Init columnElem
            // string = string representation on grid
            // correct = denotes whether a tile is correct or not (bool)
            var currentElem = {
                string: '',
                correct: false
            }

            // Calculate whether to fill tile
            if (Math.random() <= fillRate) {
                fillTile = true;
            }
            else {
                // Else don't fill tile
                fillTile = false;
            }

            // Logic about tile filling
            if (!hasCorrectTile && fillTile) {
                // Test whether to fill with correct number or not
                if (Math.random() <= correctRate) {
                    // Add correct tile
                    // Set flag
                    hasCorrectTile = true;
                    // Fill tile
                    // Get random number to multiply with
                    currentNum = getRandomInt(1, 10) * divider;
                    currentElem.string = currentNum;
                    currentElem.correct = true;
                }
                else {
                    // Add wrong tile
                    // Get random number to fill tile
                    // Make sure the random number is not dividable by divider
                    while (currentNum % divider === 0) {
                        currentNum = getRandomInt(1, maxNumber)
                    }
                    currentElem.string = currentNum
                    currentElem.correct = false;
                }
            }

            else if (fillTile) {
                // Get random number to fill tile
                // Make sure the random number is not dividable by divider
                while (currentNum % divider === 0) {
                    currentNum = getRandomInt(1, maxNumber)
                }
                currentElem.string = currentNum
                currentElem.correct = false;
            }
            // Else leave elem as default, no action needed

            // Push new elemenent into row
            currentRow.push(currentElem);
        }

        // Check if row is empty
        var filled = false;
        for (var k = 0; k < nbCols; k++) {
            if (currentRow[k].string !== -1) {
                filled = true;
            }
        }

        // if row is empty, try again (don't increment i)
        // if row is not empty, write to grid and increment i
        if (filled) {
            result.grid.push(currentRow);
            i++; // Increment row counter
        }
    }
    return result;
}