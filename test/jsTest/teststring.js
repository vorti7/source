
function stringDiffer(exWord, newWord){
		  var resultString = "";
		  var wrdStart = 0;
		  var exWordArray = new Array();
		//  exWordArray[0] = new Array();
		  var exWordNum = 0;

		  for(var i = 0; i < exWord.length; i++){
		    if(exWord.substring(i, (i+5))=='<br />'){
		      var aWord = exWord.substring(wrdStart, i);
		//      exWordArray[arrayNum].push(aWord);
		      exWordArray.push(aWord);
		      exWordArray.push(" ");
		      wrdStart = -1;
		//      exWordArray[exWordArray.length] = new Array();
		//      exWordNum++;
		      i = i+5;
		    }else if(exWord[i]==" "){
		      if(wrdStart==-1){
		      }else{
		        var aWord = exWord.substring(wrdStart, i);
		        exWordArray.push(aWord);
		//        exWordArray[arrayNum].push(aWord);
		        wrdStart = -1;
		      }
		    }else{
		      if(wrdStart ==-1){
		        wrdStart = i;
		      }else if(i==(exWord.length-1)){
		        var aWord = exWord.substring(wrdStart, i);
		        exWordArray.push(aWord);
		//        exWordArray[arrayNum].push(aWord);
		      }
		    }
		  }

		  if(exWordArray.length){
		    var wrdStart = 0;
		    var newWordNum = 0;
		    var findArrayNum = 0;
//		    var resultArray = new Array();
		    for(var i = 0; i < newWord.length; i++){
		      if(newWord.substring(i,(i+5))=='<br />'){
		        var aWord = newWord.substring(wrdStart, i);
		        i = i+5;
		        for(var j = findArrayNum; j<exWordArray.length; j++){
		          if(exWordArray[j]==aWord){
		            findArrayNum = j;
		            resultString += aWord+'<br />';
		            break;
		          }
		          if(j==(exWordArray.length-1)){
		            resultString += "<font color='#FF0000'>"+aWord+"</font><br />";
		          }
		        }
		        wrdStart = -1;
		      }else if(newWord[i]==" "){
		        if(wrdStart==-1){

		        }else{
		          var aWord = newWord.substring(wrdStart, i);
			        for(var j = findArrayNum; j<exWordArray.length; j++){
			          if(exWordArray[j]==aWord){
		              findArrayNum = j;
		              resultString += aWord+" ";
		              break;
		            }
		            if(j==(exWordArray.length-1)){
		              resultString += "<font color='#FF0000'>"+aWord+"</font> ";
		            }
			        }
		          wrdStart = -1;
		        }
		      }else{
		        if(wrdStart ==-1){
		          wrdStart = i;
		        }else if(i==(exWord.length-1)){
		          var aWord = exWord.substring(wrdStart, i);
		          for(var j = findArrayNum; j<exWordArray.length; j++){
		            if(exWordArray[j]==aWord){
		              findArrayNum = j;
		              resultString += aWord;
		              break;
		            }
		            if(j==(exWordArray.length-1)){
		              resultString += "<font color='#FF0000'>"+aWord+"</font>";
		            }
  		       }
  		      }
  		    }
  		  }

			}else{
				resultString = "<font color='#FF0000'>"+newWord+"</font>"
			}
		  return resultString;
		}

console.log(stringDiffer("You son of bitch!<br /> asshole!! mother fucker!!<br />Hello it's me","You son of bitch!<br /> asshole!! fother fucker!!"));
