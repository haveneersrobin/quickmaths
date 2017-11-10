/**
 * Grid generator
 */

// General Helper Functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates a row with sum questions
 * @param {*} solution - The desired solution
 * @param {*} maxNumber - The upper bound of results to be generated
 * @param {*} nbCols - The amount of columns on the grid, default: 3
 */
function getSumRow(solution, maxNumber, nbCols = 3) {

    // Init constants
    const fillRate = 0.7; // The ratio of filled tiles to total tiles
    const correctRate = 0.45; // The ratio of correct tiles to filled tiles

    var hasCorrectTile = false; // Denotes whether a row already has a correct tile
    // currentRow will be added to the grid elem of result
    var currentRow = [];
    // currentNum is the randomly generated integer
    var currentNum = -1; // Default number

    // Generate only one row
    var i = 0;
    while (i < 1) {
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

                // Reset temp var currentNum
                currentNum = solution; // Init with illegal number
                // Make sure that the random number is not equal to the solution
                while(currentNum === solution){
                    currentNum = getRandomInt(0, maxNumber);
                }
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
        // if row is not empty, increment i => end loop
        if (filled) {
            i++; // Increment row counter, row is OK
        }
    }
    return currentRow;
}

/**
 * Creates a grid (levelLength x nbCols) with sum questions
 * @param {*} solution - The number by what the numbers in the grid have to be dividable
 * @param {*} maxNumber - The heighest possible number to be generated
 * @param {*} levelLength - The height of the grid
 * @param {*} nbCols - The width of the grid, default: 3
 */
function createSumGrid(solution, maxNumber, levelLength, nbCols = 3) {

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

    // Fill levelLength amount of rows
    for (var i = 0; i < levelLength; i++) {
        result.grid.push(getSumRow(solution, maxNumber, nbCols));
    }
    return result;
}

/**
 * Creates a row with modulo questions
 * @param {*} divider - The desired divider
 * @param {*} maxNumber - The upper bound of results to be generated
 * @param {*} nbCols - The amount of columns on the grid, default: 3
 */
function getModuloRow(divider, maxNumber, nbCols = 3) {
    // Init const values
    const fillRate = 0.7; // The ratio of filled tiles to total tiles
    const correctRate = 0.45; // The ratio of correct tiles to filled tiles

    var hasCorrectTile = false; // Denotes whether a row already has a correct tile
    // currentRow will be added to the grid elem of result
    var currentRow = [];
    // denotes whether a tile will be filled
    var fillTile = false;
    // Temp var to generate new number into
    var currentNum = 0;

    // Only one row to be generated
    var i = 0;
    while (i < 1) {
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
            if (currentRow[k].string !== '') {
                // String is not empty => Tile is not empty
                filled = true;
            }
        }

        // if row is empty, try again (don't increment i)
        // if row is not empty, increment i => end loop
        if (filled) {
            i++; // Increment row counter
        }
    }
    return currentRow;
}

/**
 * Creates a grid (levelLength x nbCols) with modulo questions.
 * @param {*} divider - The number by what the numbers in the grid have to be dividable
 * @param {*} maxNumber - The heighest possible number to be generated
 * @param {*} levelLength - The height of the grid
 * @param {*} nbCols - The width of the grid, default: 3
 */
function createModuloGrid(divider, maxNumber, levelLength, nbCols = 3) {
    // Init result
    // grid contains the numbers, and a boolean if a tile is a correct answer
    var result = {
        objective: 'Welk getal is deelbaar door ' + divider + '?',
        grid: []
    }

    for (var i = 0; i < levelLength; i++) {
        result.grid.push(getModuloRow(divider, maxNumber, nbCols));
    }
    return result;
}

/**
 * Returns a grid of a random type, given a specified difficulty
 * @param {*} difficulty - A number between 1 and 10, denoting how large the numbers get
 * @param {*} levelLength - The height of the grid
 * @param {*} nbCols - The width of the grid, default: 3
 */
function getRandomGridByDiff(difficulty, levelLength, nbCols =3){
    // First, generate the kind of level
    const levelKinds = 2;
    switch(getRandomInt(1,levelKinds)){

        // Generate Sum Grid
        case 1:
            // Set solution, Upperbound fixed: solution * 2
            var solution = getRandomInt(difficulty*5,difficulty*10);
            return createSumGrid(solution,solution*2,levelLength,nbCols);

        // Generate Modulo Grid
        case 2:
            // Set divider, Upperbound is defined by difficulty
            var divider = getRandomInt(2,10);
            var upperBound = difficulty * divider * 3; // Arbitrary, might need tweaking
            return createModuloGrid(divider,upperBound,levelLength,nbCols);

        default:
            console.log('Oops, this kind of level does not exist, yet');
    }
}