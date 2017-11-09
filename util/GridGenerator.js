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
function createSumGridOLD(nbCols, levelLength, solution, maxNumber) {

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
}

// General Helper Functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Tweede versie
/**
 * 
 * @param {*} nbCols - The width of the grid
 * @param {*} levelLength - The height of the grid
 * @param {*} solution - The solution of the level
 * @param {*} maxNumber - The heighest possible number to be generated
 */
function createSumGrid(nbCols, levelLength, solution, maxNumber) {

    const fillRate = 0.8; // The ratio of filled tiles to total tiles
    const correctRate = 0.33 // The ratio of correct tiles to filled tiles

    // Init result
    var result = {
        objective: solution,
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
        for (var j = 0; j < nbCols; j++) {

            // Init columnElem
            // string = string representation on grid
            // numResult = result of given string (int)
            var currentElem = {
                string: '',
                numResult: -1
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

            // Logic about tile filling
            if (!hasCorrectTile && currentNum != -1) {
                // Test whether to fill with correct number or not
                if (Math.random() <= correctRate) {
                    // Set flag and generate parts of sum
                    hasCorrectTile = true;
                    var randPart = getRandomInt(0, solution);
                    var counterPart = solution - randPart;

                    currentElem.string = randPart + '+' + counterPart;
                    currentElem.numResult = solution;
                }
            }

            // Edge case: randomly generated number is equal to the solution
            else if (!hasCorrectTile && currentNum === solution) {
                // Set flag and generate parts of sum
                hasCorrectTile = true;
                var randPart = getRandomInt(0, currentNum);
                var counterPart = currentNum - randPart;

                currentElem.string = randPart + '+' + counterPart;
                currentElem.numResult = currentNum; // === solution
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
        var empty = true;
        for (elem in currentRow) {
            if (elem.numResult !== -1) {
                empty = false;
            }
        }

        // if row is empty, try again (don't increment i)
        // if row is not empty, write to grid and increment i
        if (!empty) {
            result.grid.push(currentRow);
            currentRow = []; // Clear temp var currentRow
            i++; // Increment row counter
        }
    }
    return result;
}