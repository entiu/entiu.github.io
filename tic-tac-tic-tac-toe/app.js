'use strict'

const mainBoard_elm = document.querySelector('.main-board');
const blockers_elm = document.querySelector('.blockers');
const blockerTop_elm = document.querySelector('.blocker.top');
const blockerRight_elm = document.querySelector('.blocker.right');
const blockerBottom_elm = document.querySelector('.blocker.bottom');
const blockerLeft_elm = document.querySelector('.blocker.left');
const innerBoards_points = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],  // the 9 inner boxes of the first outer box
  [0, 0, 0, 0, 0, 0, 0, 0, 0],  // the 9 inner boxes of the second outer box
  [0, 0, 0, 0, 0, 0, 0, 0, 0],  // so on...
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const mainBoard_points = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var matchEnded = false;
var sign = 'X'; // will alternate between 'X' and 'O'

// build the 9 outer boxes, plus the 9 inner boxes for each of them
function buildBoard() {
  mainBoard_elm.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    var outerBox = document.createElement('div');
    outerBox.classList.add('box', 'outer-box');
    outerBox.dataset.index = i;
    outerBox.dataset.point = 0;
    outerBox.id = `outerBox-${i}`;
  
    var innerBoard = document.createElement('div');
    innerBoard.classList.add('board', 'inner-board');
    innerBoard.id = `innerBoard-${i}`;
  
    for (let j = 0; j < 9; j++) {
      var innerBox = document.createElement('div');
      innerBox.classList.add('box', 'inner-box');
      innerBox.dataset.index = j;
      innerBox.dataset.point = 0;
      innerBox.id = `innerBox-${i}${j}`;
      
      innerBoard.appendChild(innerBox);
    }
  
    outerBox.appendChild(innerBoard);
    mainBoard_elm.appendChild(outerBox);
  }
}

// mark a box
function markBox(box) {
  box.classList.add('marked');
  box.dataset.point = sign === 'X' ? -1 : 1;

  if (box.classList.contains('inner-box')) {
    var outerBox = box.parentNode.parentNode;
    var i = parseInt(outerBox.dataset.index);
    innerBoards_points[i][box.dataset.index] = parseInt(box.dataset.point);
    if (checkBoard(i) === sign) {
      markBox(outerBox, sign);
    } else if (checkBoard(i) === 'draw') {
      blockBox(outerBox);
    }
  } else {
    if (arguments.length > 1) {
      blockBox(box, arguments[1]); 
      var i = parseInt(box.dataset.index);
      mainBoard_points[i] = parseInt(box.dataset.point);
      checkBoard() && endMatch();
    } else {
      blockBox(box); // to do: restartBox(box)
    }
  }
}

// change between X/O
function changeSign() {
  mainBoard_elm.classList.toggle('x-up');
  mainBoard_elm.classList.toggle('o-up');
  sign = sign === 'X' ? 'O' : 'X';
}

// adjust box blockers width/height
function resizeBlockers(i) {
  if (arguments.length === 0 || mainBoard_elm.querySelector(`.outer-box[data-index="${arguments[0]}"]`).classList.contains('blocked')) {
    blockerTop_elm.style.height = '0%';
    blockerRight_elm.style.width = '0%';
    blockerBottom_elm.style.height = '0%';
    blockerLeft_elm.style.width = '0%';
  } else {
    blockerTop_elm.style.height = `${Math.floor(i / 3) * 100 / 3}%`;
    blockerRight_elm.style.width = `${(2 - i % 3) * 100 / 3}%`;
    blockerBottom_elm.style.height = `${Math.floor((8 - i) / 3) * 100 / 3}%`;
    blockerLeft_elm.style.width = `${(i % 3) * 100 / 3}%`;
  }
}

// make an outer box unaccessible once completed
function blockBox(box) {
  var i = parseInt(box.dataset.index);
  var blocker_elm = document.createElement('div');
  blocker_elm.classList.add('blocker', 'cell-blocker', Math.floor(Math.random() * 2) === 0 ? 'scaleX' : 'scaleY');
  blocker_elm.style.top = `${Math.floor(i / 3) * 100 / 3}%`;
  blocker_elm.style.left = `${(i % 3) * 100 / 3}%`;
  blockers_elm.appendChild(blocker_elm);
  box.classList.add('blocked');

  if (arguments.length > 1) {
    var lineProps = getLineProps(box);
    var crossline = document.createElement('div');
    crossline.classList.add('crossline', lineProps.direction, lineProps.level);
    box.appendChild(crossline);
    
    var outerSign = document.createElement('div');
    outerSign.classList.add('outer-sign', sign);
    box.appendChild(outerSign);
  }
}

function getLineProps(box) {
  var direction, level;
  var pts = innerBoards_points[parseInt(box.dataset.index)];
  for (var i = -3; i <= 3; i += 6) {
    switch (i) {
      case pts[0] + pts[1] + pts[2]: { direction = 'horizontal'; level = 'level-1'; break; }
      case pts[3] + pts[4] + pts[5]: { direction = 'horizontal'; level = 'level-2'; break; }
      case pts[6] + pts[7] + pts[8]: { direction = 'horizontal'; level = 'level-3'; break; }
      case pts[0] + pts[3] + pts[6]: { direction = 'vertical'; level = 'level-1'; break; }
      case pts[1] + pts[4] + pts[7]: { direction = 'vertical'; level = 'level-2'; break; }
      case pts[2] + pts[5] + pts[8]: { direction = 'vertical'; level = 'level-3'; break; }
      case pts[0] + pts[4] + pts[8]: { direction = 'diagonal'; level = 'primary'; break; }
      case pts[2] + pts[4] + pts[6]: { direction = 'diagonal'; level = 'secondary'; break; }
    }
  }
  return {direction: direction, level: level};
}

// check for board completion
function checkBoard() {
  var pts = arguments.length > 0 ? innerBoards_points[arguments[0]] : mainBoard_points;
  for (var i = -3; i <= 3; i += 6) {
    if (
      pts[0] + pts[1] + pts[2] === i ||
      pts[3] + pts[4] + pts[5] === i ||
      pts[6] + pts[7] + pts[8] === i ||
      pts[0] + pts[3] + pts[6] === i ||
      pts[1] + pts[4] + pts[7] === i ||
      pts[2] + pts[5] + pts[8] === i ||
      pts[0] + pts[4] + pts[8] === i ||
      pts[2] + pts[4] + pts[6] === i
    ) {
      return sign;
    } else if (!pts.includes(0)) {
      return 'draw';
    }
  }
  return false;
}

function endMatch() {
  matchEnded = true;
  blockerTop_elm.style.height = '100%';

  var winnerTag_elm = document.createElement('p');
  winnerTag_elm.textContent = 'Winner';
  winnerTag_elm.classList.add('winner-tag', `winner-${sign}`);
  document.querySelector('.container').appendChild(winnerTag_elm);
  document.querySelector('.container').classList.add('match-ended');

  var winnerPoint = sign === 'X' ? -1 : 1;
  Array.from(mainBoard_elm.querySelectorAll(`.outer-box[data-point="${winnerPoint}"] .outer-sign`)).forEach(node => node.classList.add('winner'));
}

function restartInnerBoard(i) {
  document.querySelector(`.inner-board[data-index="${i}"]`).classList.add('restart-match');
  setTimeout(() => {
    Array.from(blockers_elm.querySelectorAll('.cell-blocker')).forEach(node => node.remove());
    innerBoards_points.forEach(board_points => board_points.fill(0));
    mainBoard_points.fill(0);
    resizeBlockers();
    buildBoard();
    sign === 'O' && changeSign();
  }, 1560);
  setTimeout(() => {
    document.querySelector('.container').classList.remove('restart-match');
  }, 3000);
}

function restartMatch() {
  document.querySelector('.container').classList.add('restart-match');
  setTimeout(() => {
    matchEnded = false;
    var winnerTag_elm = document.querySelector('.winner-tag');
    winnerTag_elm && winnerTag_elm.remove();
    document.querySelector('.container').classList.remove('match-ended');
    Array.from(blockers_elm.querySelectorAll('.cell-blocker')).forEach(node => node.remove());
    innerBoards_points.forEach(board_points => board_points.fill(0));
    mainBoard_points.fill(0);
    resizeBlockers();
    buildBoard();
    sign === 'O' && changeSign();
  }, 1560);
  setTimeout(() => {
    document.querySelector('.container').classList.remove('restart-match');
  }, 3000);
}

buildBoard();

document.querySelector('.main-board').addEventListener('click', (e) => {
  var target = e.target;
  if (!target.classList.contains('inner-box') || target.classList.contains('marked')) return;
  if (matchEnded) return;

  markBox(target);
  if (matchEnded) return;

  resizeBlockers(parseInt(target.dataset.index));
  changeSign();
})