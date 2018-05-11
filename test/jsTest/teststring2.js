function findDiffer(exWord, newWord){
	var resultString = "";
	var exI = 0;

	var startLineNew = 0;
	var startLineEx = 0;

  if(exWord==""){
    resultString = "<font color='#0000FF'>"+newWord+"</font>";
  }
	for(var i = 0; i < newWord.length; i++){
		if(newWord.substring(i,(i+6))=='<br />'||i==newWord.length-1){
      var forLineEx = startLineEx;
			for(var j = startLineEx; j<exWord.length; j++){
				if(exWord.substring(j,(j+6))=='<br />'){
					if(newWord.substring(startLineNew,i)==exWord.substring(forLineEx,j)){
            resultString += "<font color='#FF0000'>"+exWord.substring(startLineEx,forLineEx)+"</font>";
						resultString += newWord.substring(startLineNew,i)+'<br />';
            break;
					}
          forLineEx = j+6;
    			j = forLineEx;
				}
        if(j==exWord.length-1){
          if(newWord.substring(startLineNew,i)==exWord.substring(forLineEx,j)){
						resultString += newWord.substring(startLineNew,i)+'<br />';
					}else{
            resultString += "<font color='#0000FF'>"+newWord.substring(startLineNew,i)+"</font>";
          }
        }
			}
      startLineNew = i+6;
			i = startLineNew;
		}
	}
  return resultString;
}


console.log(findDiffer('Hello!<br />My name is DK!<br />Who are you?','Hello!<br />My name is DK!<br />Who are you?<br />Asshole!'))
console.log(findDiffer(' ', 'Hello<br />How are you!'))
