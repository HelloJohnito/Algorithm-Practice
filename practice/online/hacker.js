//Lisa's Workbook

function processData(input) {
  let stdInput = input.split("\n");
  let n = stdInput[0].split(" ")[0];
  let k = stdInput[0].split(" ")[1];
  let problemsPerChapter = stdInput[1].split(" ").map(Number);

  let answer = 0;
  let page = 1;
  for(let i = 0; i < problemsPerChapter.length; i ++){
      let count = 1;
      let countPerPage = 1;

      while(count < problemsPerChapter[i] + 1){

          if(countPerPage > k){
              countPerPage = 1;
              page += 1;
          }
          if(count === page){
              answer += 1;
          }
          countPerPage += 1;
          count += 1;
      }

      page += 1;
  }
// console.log(answer)
}

//////////////////////////////////////////////////////
//Service Lane

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var t = parseInt(n_temp[1]);
    width = readLine().split(' ');
    width = width.map(Number);
    for(var a0 = 0; a0 < t; a0++){
        var i_temp = readLine().split(' ');
        var i = parseInt(i_temp[0]);
        var j = parseInt(i_temp[1]);

        let traveledLane = width.slice(i, j + 1);
        console.log(Math.min.apply(null,traveledLane));
    }

}

/////////////////////////////////////////////////////////////
//Flatland Space Stations

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);
    c = readLine().split(' ');
    c = c.map(Number);

    let answer = -Infinity;

    for(let i = 0; i < n; i++){
        let subAnswerMin = Infinity;
        for(let j = 0; j < c.length; j++){
            let distance = Math.abs(i - c[j])
            if(subAnswerMin > distance){
                subAnswerMin = distance;
            }
        }

        if(answer < subAnswerMin){
            answer = subAnswerMin;
        }
    }
    // console.log(answer)
}

//////////////////////////////////////////////////////////////
// substring in word

function stringSearch(fullString, subString) {
  let startingIndex = -1;
  let i = 0;
  let j = 0;

  while( i < fullString.length){
    if(fullString[i] === subString[j]){
      if(j === 0){
        startingIndex = i;
      }

      j++;
      i++;

      if(j === subString.length){
        return startingIndex;
      }

    } else {
      if(startingIndex === -1){
        i ++;
      } else {
        j = 0;
        i = startingIndex + 1;
        startingIndex = -1;
      }
    }
  }
  return -1;
}
