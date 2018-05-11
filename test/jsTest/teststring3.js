function findDiffer(exWord, newWord){
  var resultObject = new Object();
  var exArray = new Array();
  var newArray = new Array();
  var lineChecker = 0;
  resultObject.resultEx = "";
  resultObject.resultNew = "";

  for(var i = 0 ; i < exWord.length ; i++){
    if(exWord.substring(i,(i+6))=='<br />'){
      exArray.push(exWord.substring(lineChecker,i));
      lineChecker = i+6
      i = i+6;
    }else if(i==exWord.length-1){
      exArray.push(exWord.substring(lineChecker,i+1));
      break;
    }
  }
  lineChecker = 0;
  for(var i = 0 ; i < newWord.length ; i++){
    if(newWord.substring(i,(i+6))=='<br />'){
      newArray.push(newWord.substring(lineChecker,i));
      lineChecker =i+6
      i = i+6;
    }else if(i==newWord.length-1){
      newArray.push(newWord.substring(lineChecker,i+1));
    }
  }
  console.log(exArray);
  console.log(newArray);

  lineChecker = 0;
  if(exArray.length==0){
    resultObject.resultNew+="<font color='#FF0000'>";
    for(var k = 0; k<newArray.length; k++){
      resultObject.resultNew+=newArray[k];
    }
    resultObject.resultNew+="</font>";
  }
  for(var i = 0; i<exArray.length; i++){
    for(var j = lineChecker; j<newArray.length; j++){
      if(exArray[i]==newArray[j]){
        resultObject.resultEx+=exArray[i];
        if(lineChecker!=j){
          console.log(i+"//"+j);
          resultObject.resultNew+="<font color='#FF0000'>";
          for(var k = lineChecker; k<j; k++){
            resultObject.resultNew+=newArray[k];
          }
          resultObject.resultNew+="</font>";
        }
        resultObject.resultNew+=newArray[j];
        lineChecker = j+1;
        break;
      }
      if(j==newArray.length-1){
        resultObject.resultEx+="<font color='#0000FF'>"+exArray[i]+"</font>";
      }
    }
    if(i==exArray.length-1&&lineChecker<newArray.length){
      resultObject.resultNew+="<font color='#FF0000'>";
      for(var k = lineChecker; k<newArray.length; k++){
        resultObject.resultNew+=newArray[k];
      }
      resultObject.resultNew+="</font>";
    }
  }
  return resultObject
}

var show = findDiffer("Hello!<br />My name is DK!<br />Who are you?<br />Who are you?", "Hello!<br />My name is DK!<br />Who are you?<br />Asshole!")
console.log(show.resultEx);
console.log(show.resultNew);
show = findDiffer("","Hello from the outsi~~de")
console.log(show.resultEx);
console.log(show.resultNew);
show = findDiffer("안녕하세요? 반갑습니다!<br />제 이름은 김병신이라고 합니다. 그대의 이름은 무엇이지 소년?<br />꿿뛣쀌쒫쮉","안녕하시오? 반갑소!<br />제 이름은 김병신이라고 합니다. 그대의 이름은 무엇이지 소년?<br />꿿뛣쀌쒫쮉")
console.log(show.resultEx);
console.log(show.resultNew);
