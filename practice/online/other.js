//given an object with q1,q2,q3 data create a function that will return an array of object with only the last number of each week.

//4 8 12

function convertReport(report){
  var answer = {};
  var setRange = {4: 0, 8: 1, 12: 2};

  Object.keys(report).forEach(function(quarter){
    var answerArray = [0,0,0];

    report[quarter].forEach(function(obj){
      if(obj.day <= 4){
        answerArray[setRange[4]] = obj.num;
      }else if(obj.day <= 8){
        answerArray[setRange[8]] = obj.num;
      }else if(obj.day <= 12){
        answerArray[setRange[12]] = obj.num;
      }
    });
    answer[quarter] = answerArray;
  });

 return answer;
}

// var report = {
//   'q1': [{day: 1, num: 200}, {day: 4, num: 400}, {day: 7, num: 700}, {day: 10, num: 1000}],
//   'q2': [{day: 5, num: 500}, {day: 6, num: 600}, {day: 9, num: 800}, {day: 10, num: 1000}],
//   'q3': [{day: 2, num: 200}, {day: 4, num: 400}, {day: 10, num: 1000}, {day: 12, num: 1200}]
// }
