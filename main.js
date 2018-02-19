var chessBox = document.querySelector(".chess-board-container");
var goBtn = document.querySelector('.go');
var message = document.querySelector('.message');

var rowCount = 8;
var colCount = 8;

var startPoint, endPoint;
var startPointFound, endPointFound;

var rows = new Array(rowCount);
rows.fill(new Array(colCount));

rows = rows.map((row, rowNum) => {
  row.fill(1);
  return row.map((col, colNum) => {

    return `${String.fromCharCode(65+rowNum)}${colNum+1}`;
  })
})

rowStr = rows.reduce((fr, r) => {
  let colStr = r.reduce((fc, c) => {
    return `${fc}<div class="col">${c}</div>`;
  }, '');
  return `${fr}<div class="row">${colStr}</div>`;
}, '');
// console.log(rows);
chessBox.innerHTML = rowStr;

var figure = () => {
  startPoint = document.querySelector('.startPoint').value;
  endPoint = document.querySelector('.endPoint').value;

  if((startPoint != "") && (endPoint != "")){
    if(startPoint != endPoint){
      checkValueExistance(startPoint);
    } else{
      message.classList.add('error');
      message.innerHTML ="Both field can not have the same value.";
    }
  } else{
    message.classList.add('error');
    message.innerHTML = "Both the fields should be filled.";
  }
}

var clearPath = () => {
  var allCols = document.querySelectorAll('.chess-board-container .col.path');

  for(var i=0; i<allCols.length;i++){
      allCols[i].classList.remove("path");
  }
}

var paintPath = (path) => {
  // console.log(path);
  var allCols = document.querySelectorAll('.chess-board-container .col');

  for(var i=0; i<path.length; i++){
    for(var j=0; j<allCols.length;j++){
      if(allCols[j].innerHTML == rows[path[i][0]][path[i][1]]){
        allCols[j].classList.add("path");
      }
    }
  }
}

var checkValueExistance = (val) => {
  startPointFound = endPointFound = false;
  rows.map((row) => {
    row.map((col) => {
      if(col == startPoint){
        startPointFound = true;
        indexStartPoint = (rows.indexOf(row)+","+row.indexOf(col)).split(',');
      }
      if(col == endPoint){
        endPointFound = true;
        indexEndPoint = (rows.indexOf(row)+","+row.indexOf(col)).split(',');
      }
    });
  });

  if((startPointFound == true) && (endPointFound == true)){
    var pathQueue = new Array();

    if(indexStartPoint[0] < indexEndPoint[0]){
      for(var i=indexStartPoint[0]; i<=indexEndPoint[0]; i++){
        path = (i+","+indexStartPoint[1]).split(',');
        pathQueue.push(path);

        if(i == indexEndPoint[0]){
          if(indexStartPoint[1] < indexEndPoint[1]){
            for(var j=indexStartPoint[1]; j<=indexEndPoint[1]; j++){
              path = (path[0]+","+j).split(',');
              pathQueue.push(path);
            }
          } else{
            for(var j=indexStartPoint[1]; j>=indexEndPoint[1]; j--){
              path = (path[0]+","+j).split(',');
              pathQueue.push(path);
            }
          }
        }
      }
    } else{
      for(var i=indexStartPoint[0]; i>=indexEndPoint[0]; i--){
        path = (i+","+indexStartPoint[1]).split(',');
        pathQueue.push(path);

        if(i == indexEndPoint[0]){
          if(indexStartPoint[1] < indexEndPoint[1]){
            for(var j=indexStartPoint[1]; j<=indexEndPoint[1]; j++){
              path = (path[0]+","+j).split(',');
              pathQueue.push(path);
            }
          } else{
            for(var j=indexStartPoint[1]; j>=indexEndPoint[1]; j--){
              path = (path[0]+","+j).split(',');
              pathQueue.push(path);
            }
          }
        }
      }
    }
    clearPath();
    paintPath(pathQueue);
  } else{
    message.classList.add('error');
    message.innerHTML = "start point or end point is invalid.";

    clearPath();
  }
}

goBtn.onclick = figure;
