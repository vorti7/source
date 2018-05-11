//js file for test
var firebase = require('./firebase');


var insertArray = new Array();

//firebase.registerUrl('b2f2Kqt_KcE')

/*intel subtitle(RQ_GiVoT1M0)*/
/*
arrMake(1, 2.5, "", "잠깐 슈발 내컴퓨터! 잠깐! 잠깐!!", "")
arrMake(3, 5, "", "님 왜뜀?", "")
arrMake(5, 6.5, "", "내 멍청한 낡은 컴퓨터 때문에;", "")
arrMake(7, 9.5, "", "그거 개오래됬는데 왜 쫓아감", "")
arrMake(10, 13, "", "그거 느리고 무겁고 니도 알잖아", "")
arrMake(14, 16, "", "알아 요새 PC 가볍고 빠른거 나도 안다고;", "")
arrMake(16, 18, "", "근데 왜 계속 뛰는 건데", "")
arrMake(18, 19, "", "나도 몰러", "")
arrMake(19.5, 23, "", "니도 알고 있잖아? 이제 행동하세요! 컴퓨터를 업글하세요", "")
arrMake(23.5, 26, "","망할 다리 쥐남;; 구급차 불러", "")
*/

/*b2f2Kqt_KcE*/
/*
arrMake(6, 7, "", "누구시죠?", "")
arrMake(8.5, 9.8, "Andy: Uh, my name is Andy Sachs.", "저기, 제 이름은 앤디 삭스이에요.", "설명 영어에서 소유격 my는 My name is..라고 자신의 이름을 이야기할 때 처럼 “나의 00” 라는 소유를 나타낼 때 쓰는 것이다. 그런데 우리말에서 ‘우리가족 우리엄마’를 표현할 때는 영어 그대로 our family, our mother로 쓰지 않고my family, my mother 로 표현한다.\\n#grammar")
arrMake(10, 12.5, "I recently graduated from Northwestern University.", "최근에 노스웨스턴 대학을 갓 졸업했어요.", "설명 recently를 사용할 경우 무엇인가를 ‘갓 끝낸,  막 끝낸’ 느낌을 준다. 예를 들어 “최근에 막 나온 신상품이에요” 라고 말 할 경우 “It recently came out”이라고 표현한다.\\nNorthwestern University는 일리노이주에 시카고에 위치하고있다. 사립 학교이자 연구 학교인데 일반적으로 미국에서 사립학교이면서 연구 학교인 경우에는 높은 명문대로 알려지는 경우가 많다.\\n미국의 대학은 크게 teaching university와 research university로 나뉘는데, research university를 교수들이 선호하기도 하고, 좋은 곳을 나왔다고 인정받는 편이다. 그렇다고 teaching university가 나쁘다는 것은 아니다. 일반적으로는 연구를 하는 학교가 재정적으로 튼튼한 경향이 있어서 캠퍼스도 더 크고 학생수도 많고 좋은 대학이라고 평가받는다. 즉, 이 장면에서 앤디가 “저 노스웨스턴 대학 나왔어요” 라는 말의 의미는 “명문대를 나왔으니 내 이야기를 좀 잘 들어달라”는 뜻이 내포되어 있다고 할 수 있다. 미국에서는 면접시에 본인의 강점을 강하게 어필하는 것이 필요하다. 따라서 자신이 내세울 수 있는 무기를 잘 드러내는 것이 중요하다.\\n#technical term #culture")
arrMake(13, 14.5, "Miranda: And what are you doing here?", "그래서 여긴 왜 온 거예요?", "설명 한국어 번역만으로도 미란다의 뉘앙스가 조금 공격적으로 들린다. 영어에서도 이와 같은 문장은 윗사람의 권력을 제대로 보여준다고 할 수 있다. 이 말을 통해 미란다는 앤디의 기를 한번 눌러주려는 의도이다.")
arrMake(15, 20.5, "Andy: Well, I think I could do a good job as your assistant.", "왜냐면, 제가 당신의 조수로 꽤 잘 할 자신이 있어서 그래요", "설명 “well”은 “ah, uh, um, like, you know”와 함께 영어에서 필러(filler)라고 부른다. 특별한 의미는 없지만 기능은 가지고 있다. 여기서 사용된 “well”은, 특히 문장을 시작할 때 갖는 기능은 말할 시간을 버는 기능이다. 즉, 내가 아직 말을 끝낸 것이 아니고 무엇을 말할지 고민하는 중이니 끼어들지 말라는 신호를 보내는 것이다. 동시에 당신의 말이 맞긴 하지만 나도 내 나름대로 할말이 있다라는 느낌을 준다.\\n#grammar #filler")
arrMake(21, 24, "And, um-", "그리고 흠..", "")
arrMake(24.5, 27.8, "Yeah, I came to New York to be a journalist and sent letters out everywhere...", "맞아요, 내가 뉴욕에 와서 기자가 되기 위해 여기저기 이력서를 넣었습니다.", "설명 letters는 편지 라기 보다는 이력서로 의역하는 것이 자연스럽다. 원래 이력서는 영어로 resume나 CV 내지 Vita 를 쓴다. 그런데 미국에서는 구직자들의 cover letter(우리나라에서는 자기소개서)를 중요하게 여겨서, CV를 여러 군데 넣었다는 말 보다는 letter를 넣었다고 말하는 것다.\\n#business")
arrMake(28, 29.8, "and then finally got a call from Elias-Clarke...", "일라이스 클락 출판사에서 연락을 받긴 했어요", "")
arrMake(30.2, 33, "and met with Sherry up at Human Resources.", "그리고 인사과의 쉐리랑 만났지요.", "설명 대학 학과에 department를 사용하는 것처럼 회사 부서명도 department를 사용한다. 인사과는 영어로 Human Resources Department로 HR로 줄여서 쓰기도 한다. 참고로 고객서비스를 담당하는 팀은 Customer Service Department, CS부서라고 한다. \\n#business")
arrMake(34.5, 36.7, "Basically, its this or Auto Universe.", "하지만 결국 여기 아니면 자동차회사로 가야했지요.", "설명 basically는 의미 그대로 ‘기본적으로’로 쓰이지 않고 대화 할 때는 “결국은, 결과적으로는”이라는 뜻으로 사용된다. 우리나라 사람들이 미국사람처럼 이야기 하고 싶다고 말할 때 이런 표현의 차이들이 종종 나타난다. ")
*/

/*Fggm4ZyCYtE*/
/*
arrMake(24, 26, "We appreciate your service", "어이구 감사합니다.", "")
arrMake(27, 29.5, "Enjoy this selfie free of charge", "공짜 셀카를 즐겨주세요.", "")
arrMake(30.5, 31.5, "Stay in school", "학교로 돌아가.", "")
arrMake(32.5, 35, "Education is important.", "공부는 중요하다구.", "")
arrMake(42.5, 43.5, "I like your car", "차 마음에 드네요.", "")
arrMake(45.5, 46.5, "Nicely done.", "잘만들었군요", "")
arrMake(47.5, 48.5, "That’s pathetic.", "이거 슬프구만!", "")
arrMake(50, 50.5, "Halt.", "정지", "")
arrMake(50.8, 51.5, "Halt Woman", "멈추세오, 거기 여성분", "")
arrMake(52, 53.3, "In the purple dress.", "보라 드레스 입고 있는 분", "")
arrMake(53.8, 55.8, "Who is this guy?", "저 남자 누구에요?", "")
arrMake(55.5, 56.6, "That’s your husband?\\nCome with me.", "남편인가? 저랑가죠?", "")
arrMake(57, 57.8, "Come get in the car.", "와서 차이타세요", "")
arrMake(58.3, 59.5, "Goodbye husband.", "굿바이 남편", "")
arrMake(60, 61.2, "She’s mine now.", "이제 그녀는 내꺼야.", "")
arrMake(92, 93.5, "I want a ride.", "태워달라고", "")
arrMake(104, 105.2, "What the hell was that?", "저거 봤어?", "")
arrMake(107.8, 109.3, "I literally had like five people.", "대략 다섯명정도 본거 같은데", "")
arrMake(109.5, 110.6, "I had my thumb out; and they had plenty of room", "내 엄지는 올라가 있었고, 자리도 있었어.", "")
arrMake(110.8, 114, "And they would just high five me and keep on going.", "그런데 그냥 하이파이브하고 지나가 버리더라구.", "")
*/

/*EgZI5ZY3dmU*/
/*
arrMake(0.1, 1,"","","");
arrMake(1.1, 4.5,"","","");
arrMake(4.7, 9,"","","");
arrMake(9.8, 10.3,"","","");
arrMake(11, 11.5,"","","");
arrMake(11.7, 12.5,"","","");
arrMake(12.8, 13.8,"","","");
arrMake(15, 17.5,"","","");
arrMake(17.8, 19,"","","");
arrMake(19.3, 19.7,"","","");
arrMake(19.9, 23.2,"","","");
arrMake(23.5, 23.8,"","","");
arrMake(24, 24.2,"","","");
arrMake(24.5, 27.9,"","","");
arrMake(28, 28.2,"","","");
arrMake(28.3, 28.5,"","","");
arrMake(28.8, 30,"","","");
arrMake(30.2, 32.2,"","","");
arrMake(32.4, 32.6,"","","");
arrMake(33.5, 34,"","","");
arrMake(34.2, 34.6,"","","");
arrMake(36, 37.3,"","","");
arrMake(37.5, 38.8,"","","");
arrMake(39, 40.5,"","","");
arrMake(41, 42.8,"","","");
arrMake(46, 47.5,"","","");
arrMake(48, 49.5,"","","");
arrMake(50, 51.6,"","","");
arrMake(52.5, 53.2,"","","");
arrMake(53.4, 56,"","","");
arrMake(56.4, 59.5,"","","");
arrMake(60,  61.7,"","","");
arrMake(62, 64.5,"","","");
arrMake(65.8, 67,"","","");
arrMake(68, 69.8,"","","");
arrMake(70.6, 71.2,"","","");
arrMake(74.5, 76,"","","");
arrMake(76.2, 76.6,"","","");
arrMake(79, 79.6,"","","");
arrMake(80, 83,"","","");
arrMake(83.2, 84.2,"","","");
arrMake(85, 86.6,"","","");
arrMake(87.2, 88.8,"","","");
arrMake(89, 90,"","","");
arrMake(90.2, 91,"","","");
arrMake(92.7, 93,"","","");
arrMake(93.2, 94,"","","");
arrMake(94.2, 95,"","","");
arrMake(95.5, 98,"","","");



firebase.registerEmpty('EgZI5ZY3dmU', insertArray);
*/
/*
function arrMake(start, finish, contentE, contentK, contentX){
  var objForArr = new Object();
  objForArr.start = start;
  objForArr.finish = finish;
  objForArr.contentE = contentE;
  objForArr.contentK = contentK;
  objForArr.contentX = contentX;
  objForArr.time = (new Date()).toISOString();
  insertArray.push(objForArr);
}

insertContent(insertArray);

function insertContent(contentArray){
  firebase.registerDefault('b2f2Kqt_KcE', contentArray);
}
*/
/*
firebase.registerUrl('Fggm4ZyCYtE');
firebase.registerUrl('qUZRfSvL3HU')
firebase.registerUrl('u8S0X8U-6no')
firebase.registerUrl('DblEwHkde8U')
firebase.registerUrl('weeI1G46q0o')
firebase.registerUrl('JGwWNGJdvx8')
firebase.registerUrl('Y2VF8tmLFHw')
//firebase.registerUrl('A0DzG99iimc')
firebase.registerUrl('b2f2Kqt_KcE')
firebase.registerUrl('zgsPnoefLl4')
firebase.registerUrl('9fyQsIhQIRY')
firebase.registerUrl('EgZI5ZY3dmU')
*/

/*firebase.addTag('#Grammar', 'b2f2Kqt_KcE', '', function(){

})*/
/*
firebase.loadDefault('b2f2Kqt_KcE', function(returnValue){
  console.log(returnValue);
});
*/
/*
var testOb = new Object();
testOb.dataYoutube = "b2f2Kqt_KcE";
testOb.dataId = "-KsSX2Dc3k5v8lPftPI-";
firebase.getContentList(testOb, function(data){
  console.log(data)
})
*/

/*
var detailData = new Object;
detailData.dataYoutube = 'b2f2Kqt_KcE';
detailData.title = '악마는 프라다를 입는다.';
detailData.subTitle = '명문대학을 졸업한 앤드리아(앤 해서웨이)는 저널리스트를 꿈꾸는 취준생. 하지만 그녀가 입사하게 된 곳은 패션 매거진 런웨이였다. 모두가 선망하는 자리였지만 패션 바보 트랜드 바보였던 그녀에겐 별 감흥이 없다 거기다 지옥에서 온 상사, 전설적인 런웨이의 편집장 마린다(메릴 스트립)를 보좌하는 일은 좀처럼 쉽지가 않다. 스테이크 셔틀에서 쌍둥이 방학숙제까지, 시간과 종류를 가리지 않는 업무지시에 마린다의 풀타임 비서가 된 앤디. 가족, 남자친구, 친구들.. 소중한 사람들이 멀어져 가지만 저널리스트의 꿈을 이루기 위해 이곳에서 좀 더 버텨내야 한다.';
firebase.addDetail(detailData)
*/
firebase.loadUrl(function (urlArray, titleArray){
  console.log(urlArray);
  console.log(titleArray);
})
