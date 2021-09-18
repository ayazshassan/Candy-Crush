document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;
  let score = 0;
  const candyColors = [
    "url(images/red-candy.png)",
    "url(images/yellow-candy.png)",
    "url(images/orange-candy.png)",
    "url(images/purple-candy.png)",
    "url(images/green-candy.png)",
    "url(images/blue-candy.png)",
  ];
  (function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      const randomNumber = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomNumber];
      square.setAttribute("id", i);
      square.setAttribute("draggable", true);
      grid.appendChild(square);
      squares.push(square);
    }
  })();

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));

  squares.forEach((square) => square.addEventListener("dragend", dragEnd));

  squares.forEach((square) => square.addEventListener("dragover", dragOver));

  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));

  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));

  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    console.log(this.id, colorBeingDragged);
  }
  function dragEnd() {
    //console.log(this.id, ">>dragEnd");

    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
      squareIdBeingDragged - width,
    ];

    let validMove = validMoves.includes(parseInt(squareIdBeingReplaced));
    if (validMove && squareIdBeingReplaced) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }
  function dragOver(e) {
    e.preventDefault();
    // console.log(this.id, ">>dragOver");
  }
  function dragEnter(e) {
    e.preventDefault();
    //console.log(this.id, "****dragEnter");
  }
  function dragLeave() {
    //console.log(this.id, "!!!dragLeave");
  }
  function dragDrop() {
    //console.log(this.id, "~~~~dragDrop");
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    console.log(this.id, colorBeingReplaced);
  }

  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowofthree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) {
        continue;
      }
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        rowofthree.every(
          (index) => squares[index].style.backgroundImage === decidedColor
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowofthree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  function checkRowForFour() {
    // check this 60, it has to be 61.
    for (let i = 0; i < 60; i++) {
      let rowofFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];
      if (notValid.includes(i)) {
        continue;
      }
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        rowofFour.every(
          (index) => squares[index].style.backgroundImage === decidedColor
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowofFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnofthree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        columnofthree.every(
          (index) => squares[index].style.backgroundImage === decidedColor
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnofthree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  function checkColumnForFour() {
    for (let i = 0; i < 47; i++) {
      let columnofFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        columnofFour.every(
          (index) => squares[index].style.backgroundImage === decidedColor
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnofFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  function moveCandiesDown() {
    //check this, it has to be till 56
    for (let i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomNumber = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomNumber];
        }
      }
    }
  }
  window.setInterval(function () {
    moveCandiesDown();
    checkRowForThree();
    checkColumnForThree();
    checkRowForFour();
    checkColumnForFour();
  }, 100);
});
