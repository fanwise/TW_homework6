var bookmarks = new Array();

$(document).ready(function(){
  	$.getJSON("bookmarks.json", function(data){
  		$.each(data,function(n,item){
  			bookmarks.push(item);
  		});
  		searchfor("");
  	});
});

$(document).ready(function(){
  	$(".search").on("input",function(){  
   		$("ul").html("");
   		searchfor($("input").val());
	});
 });



$(document).delegate(".button-delete","click",deletebookmark);

function deletebookmark () {
	$('.theme-popover-mask').fadeIn(100);
	$('.delete_dialog').slideDown(200);
}


$(document).ready(function($) {
	$('.close').click(function(){
		$('.theme-popover-mask').fadeOut(100);
		$('.delete_dialog').slideUp(200);
	});
});

function searchfor (keyword) {
	var reg = new RegExp("("+keyword+")","i");
	var resarray = new Array();
	$.each(bookmarks,function(n,item){
		if(item.title.match(reg))
		{
			var time = timeconvert(item.created);
			var title = item.title;
			title = title.replace(reg,"<span>$1</span>");
			resarray.push("<li><p class='title'>"+title+"<button class='button button-raised button-pill button-delete'>-</button></p><p class='address'>"+item.address+"</p><p class='time'><i>"+time+"</i></p></li>");
			//$("ul").append("<li><p class='title'>"+title+n+"<button class='button button-raised button-pill button-delete'>-</button></p><p class='address'>"+item.address+"</p><p class='time'><i>"+time+"</i></p></li>");
		}else if(item.address.match(reg)){
			var time = timeconvert(item.created);
			var address = item.address;
			address = address.replace(reg,"<span>$1</span>");
			resarray.push("<li><p class='title'>"+item.title+"<button class='button button-raised button-pill button-delete'>-</button></p><p class='address'>"+address+"</p><p class='time'><i>"+time+"</i></p></li>");
		}
	});
	if(resarray.length > 10)
	{
		
	}
	$("ul").append(resarray);
	console.log(resarray.length)
}

function timeconvert (timestamp) {
	var time = new Date();
	time.setTime(timestamp * 1000);
	var month = time.getMonth()+1;
	return "Created @ "+time.getFullYear()+"-"+month+"-"+time.getDate();
}