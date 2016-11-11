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
  var solutionBoard = [];

  var getNextCoordinate = function (board, currentRow, currentColumn) {
    var n = board.get('n');
    var firstFlag = true;
    for (var i = currentRow; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (firstFlag) {
          j = currentColumn;
          firstFlag = false;
        }
        if (board.rows()[i][j] !== 1) {
          return [i, j];
        }
      } 
    }
    return false;
  };


  var decisionTree = function(i, j, rookCount) {
    if (i !== startingRow || j !== startingCol) {
      newBoard.togglePiece(i, j);  
    } 
    if (rookCount === n) {
      solutionBoard.push(newBoard);
      rookCount = 0;
      return null;
    } else if (newBoard.hasAnyRooksConflicts()) {
      //has a rook conflict, need to get next x,y
      var nextCoordinate = getNextCoordinate(newBoard, i, j, rookCount);
      newBoard.togglePiece(i, j);
      if (nextCoordinate !== false) {
        decisionTree(nextCoordinate[0], nextCoordinate[1], rookCount);
      }
      if (rookCount === n) {
        solutionBoard.push(newBoard);
        rookCount = 0;
        return null;
      }
    } else {
      //no rook conflict, increment counter
      rookCount++;
      var nextCoordinate = getNextCoordinate(newBoard, i, j);
      if (nextCoordinate !== false) {
        decisionTree(nextCoordinate[0], nextCoordinate[1], rookCount);
      }
      if (rookCount === n) {
        solutionBoard.push(newBoard);
        rookCount = 0;
        return null;
      }

    }
    if (nextCoordinate !== false) {
      decisionTree(nextCoordinate[0], nextCoordinate[1], rookCount);
    }
  };


  var decisionTree = function(i, j, rookCount) {

    for (var x = 0; x < n; x++) {
      for (var y = 0; y < n; y++) {
        if (i !== startingRow || j !== startingCol) {
          newBoard.togglePiece(i, j);
        }
        if (newBoard.hasAnyRooksConflicts()) {
          newBoard.togglePiece(i, j);
        } else {
          rookCount++;
          var nextCoordinate = getNextCoordinate(newBoard, i, j);
          if (nextCoordinate !== false) {
            decisionTree(nextCoordinate[0], nextCoordinate[1], rookCount);
          }
          if (rookCount === n) {
            solutionBoard.push(newBoard);
          }
        }
        var nextCoordinate = getNextCoordinate(newBoard, i, j);
        if (nextCoordinate !== false) {
          decisionTree(nextCoordinate[0], nextCoordinate[1], rookCount);
        }
      }
    }
  };

  var rookCount = 0;
  debugger;
  decisionTree(0, 0, rookCount);
  return solutionBoard;
  /*
  var solutionBoard = []; 
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
        solutionBoard.push(newBoard);
      }
    }
*/ 
};



window.findNRooksSolution = function(n) {
/*
  var solutionArr = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solutionArr.push(findNRookSolution(i, j, n).rows());
    }
  }
  */
  //debugger;
  var solution = findNRookSolution(0, 0, 2);
  console.log(solution[0].rows()); 
  /*
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
  */
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
