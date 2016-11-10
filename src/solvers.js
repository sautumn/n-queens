/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRookSolution = function (startingRow, startingCol, n) {
  var newBoard = new Board({n: n});
  var board = newBoard.rows();
  //add 1 to position
  newBoard.togglePiece(startingRow, startingCol);
  var rookCount = 1;
  
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i !== startingRow || j !== startingCol) {
        newBoard.togglePiece(i, j);
        if (newBoard.hasAnyRooksConflicts()) {
          newBoard.togglePiece(i, j);
        } else {
          rookCount++;
        }
      }
      if (rookCount === n) {
        return newBoard;
      }
    }

  }
};

window.findNRooksSolution = function(n) {

  var solutionArr = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solutionArr.push(findNRookSolution(i, j, n).rows());
    }
  }
  
  solutionArr = _.uniq(solutionArr);
  var solutionArrString = _.map(solutionArr, function(boardArr) {
    return JSON.stringify(boardArr);
  });
  var uniqSolutionArrString = _.uniq(solutionArrString);

  solutionArr = _.map(uniqSolutionArrString, function (arr) {
    return JSON.parse(arr);
  });

  console.log(solutionArr);
  return solutionArr[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  var solutionArr = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solutionArr.push(findNRookSolution(i, j, n).rows());
    }
  }

  var solutionArrString = _.map(solutionArr, function(boardArr) {
    return JSON.stringify(boardArr);
  });
  var uniqSolutionArrString = _.uniq(solutionArrString);
  solutionArr = _.map(uniqSolutionArrString, function (arr) {
    return JSON.parse(arr);
  });

  solutionCount = solutionArr.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
