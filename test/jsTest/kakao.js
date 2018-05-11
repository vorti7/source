function solution(n, arr1, arr2) {
	var answer = [];

	for(var i = 0; i<n; i++){
			var num1 = (arr1[i]*1).toString(2);
			var num2 = (arr2[i]*1).toString(2);
			console.log(num1+"/"+num2)
			var pushMap = "";
			for(var j = 1; j<=n; j++){
					var checkW1 = 0;
					var checkW2 = 0;
					if(num1.length-j>=0){
							checkW1 = num1.charAt(num1.length-j);
					}
					if(num2.length-j>=0){
							checkW2 = num2.charAt(num2.length-j);
					}
					if((checkW1+checkW2)!=0){
							pushMap+="#";
					}else{
							pushMap+=" ";
					}
			}
			answer.push(pushMap);
	}

	return answer;
}
console.log(solution(5, ["9", "20", "28", "18", "11"], ["30", "1", "21", "17", "28"]));
