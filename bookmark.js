var bookmarks = new Array();

$(document).ready(function(){
  	$.getJSON("bookmarks.json", function(data){
  		$.each(data,function(n,item){
  			bookmarks.push(item);
  			var time = timeconvert(item.created);
  			$("ul").append("<li><p class='title'>"+item.title+"</p><p class='time'><i>"+time+"</i></p></li>");
  		});
  	});
});

$(document).ready(function(){
  	$(".search").on("input",function(){  
   		$("ul").html("");
   		searchfor($("input").val());
	});
 });

function searchfor (keyword) {
	var reg = new RegExp("("+keyword+")","i");
	$.each(bookmarks,function(n,item){
		if(item.title.match(reg))
		{
			var time = timeconvert(item.created);
			var title = item.title;
			title = title.replace(reg,"<span>$1</span>");
			$("ul").append("<li><p class='title'>"+title+"</p><p class='time'><i>"+time+"</i></p></li>");
		}
	});

}

function timeconvert (timestamp) {
	var time = new Date();
	time.setTime(timestamp * 1000);
	var month = time.getMonth()+1;
	return "Created @ "+time.getFullYear()+"-"+month+"-"+time.getDate();
}