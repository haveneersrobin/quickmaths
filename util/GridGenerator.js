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
function createSumGrid(nbCols, levelLength, solution, maxNumber) {

    const fillRate = 0.75; // The ratio of filled tiles to total tiles
    const correctRate = 0.33 // The ratio of correct tiles to filled tiles

    // Init solution map
    var solutionMap = new Array(nbCols);
    for (var i = 0; i < nbCols; i++) {
        solutionMap[i] = new Array(levelLength);
    }

    // Fill solutionMap as false
    for (var i = 0; i < nbCols; i++) {
        for (var j = 0; j < levelLength; j++) {
            solutionMap[i][j] = false;
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

    // First, generate all wrong answers
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
                    // Set tile as correct in solutionMap
                    solutionMap[j][i] = true;
                }

                // Edge case: randomly generated number is equal to the solution
                else if (currentNum === solution) {
                    // Set flag and generate parts of sum
                    hasCorrectTile = true;
                    var randPart = getRandomInt(0, currentNum);
                    var counterPart = currentNum - randPart;
                    // Parse to string and save to grid
                    grid[j][i] = randPart + '+' + counterPart;
                    // Set tile as correct in solutionMap
                    solutionMap[j][i] = true;
                }

                // Else generate parts of sum of wrong tile
                else if (Number.isInteger(currentNum)) {
                    var randPart = getRandomInt(0, currentNum);
                    var counterPart = currentNum - randPart;
                    // Parse to string and save to grid
                    grid[j][i] = randPart + '+' + counterPart;
                }
                // else leave tile blank, no parsing needed
            }
        }
    }

    // Init resultArray: result[0] = grid, result[1] = solutionMap
    var result = new Array(2);
    result[0] = grid;
    result[1] = solutionMap;
    return result;
}

// General Helper Functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}