var urlArray = JSON.parse('<%-JSON.stringify(url)%>');

var date_start = '2017-09-17';
var date_end = '2017-09-20';

var selectNum = -1;
var selectedNum = -1;

function selectYoutube(num){
  selectNum = num;
  var footer = document.getElementById('footerMenu');
  for(var i=0; i<8; i++)
  {
    if(selectNum == i)
    {
      if(selectedNum == selectNum)
      {
        selectedNum = -1;
        footer.style.visibility = 'hidden';
        document.getElementById('youtubeImage' + i).style.backgroundColor = "";
      }
      else {
        footer.style.visibility = '';
        selectedNum = selectNum;
        document.getElementById('youtubeImage' + i).style.backgroundColor = "#2FBDF3";
      }
    }
    else {
      document.getElementById('youtubeImage' + i).style.backgroundColor = "";
    }
  }


}

function watchYoutube(){
  console.log('#'+selectNum+' watch')
  if(selectNum){
    location.href = "/show?url="+urlArray[selectNum];
  }
}
function registerYoutube(){
  console.log('#'+selectNum+' register')
  if(selectNum){
    location.href = "/register?url="+urlArray[selectNum];
  }
}

$(function() {
  $('input[name="daterange"]').daterangepicker(
    {
      locale: {
        format: 'YYYY-MM-DD'
      },
      startDate: '2017-09-17',
      endDate: '2017-09-20'
    },
    function(start, end, label) {
      date_start = start.format('YYYY-MM-DD');
      date_end = end.format('YYYY-MM-DD');
    });
  });

  $(document).on("click", ".open-ModalTaskConfirm", function () {
    var title = document.getElementById("task_title");
    var clip = document.getElementById("task_clip");
    var clipUrl = document.getElementById("task_clip_url");
    var group = document.getElementById("task_group");
    var content = document.getElementById("task_content");
    var date = document.getElementById("task_date");
    var message = document.getElementById("task_message");
    $(".modal-body #confirm_clip").val( clip.options[clip.selectedIndex].text );
    $(".modal-body #confirm_clip_url").val( urlArray[clip.selectedIndex] );
    $(".modal-body #confirm_title").val( title.value );
    $(".modal-body #confirm_group").val( group.options[group.selectedIndex].text );
    $(".modal-body #confirm_content").val( content.options[content.selectedIndex].text );
    $(".modal-body #confirm_message").val( message.value );
    $(".modal-body #confirm_date_start").val( date_start );
    $(".modal-body #confirm_date_end").val( date_end );

    $('#modalTaskConfirm').modal('show');
  });
