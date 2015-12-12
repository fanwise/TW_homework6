var bookmarks = new Array();
var pageIndex = 0;
var totalPages = 0;   
var pageSize = 10; 
var resarray = new Array();
var deleteIndex = 0;

$(document).ready(function(){
	$.ajax({
       	url:'getdata.php',
       	type:'get',       
       	success:function(data){
       		bookmarks = eval(data);
       		searchfor("");
       	}
    });
});

$(document).ready(function(){
  	$(".search").on("input",function(){  
  		$("ul").html("");
   		searchfor($("input").val());
	});
});

$(document).delegate(".button-delete","click",deletebookmark);
$(document).delegate(".pagination","click",jumppage);

function deletebookmark () {
	$('.theme-popover-mask').fadeIn(100);
	$('.delete_dialog').slideDown(200);
	deleteIndex = $(this).attr("id").substring(1);
}

$(document).ready(function(){
	$("#delete_yes").on("click",function(){
		bookmarks.splice(deleteIndex,1);
		$.ajax({
       		url:'delete.php',
       		type:'POST',
       		data:{trans_data:JSON.stringify(bookmarks)},    
       		success:function(data){
       		}
    	});
    	$('.theme-popover-mask').fadeOut(100);
		$('.delete_dialog').slideUp(200);
		$("ul").html("");
   		searchfor($("input").val());
	});
});

$(document).ready(function(){
	$("#delete_no").on("click",function(){
    	$('.theme-popover-mask').fadeOut(100);
		$('.delete_dialog').slideUp(200);
	});
});

function jumppage () {
	var id = $(this).attr("id"); 
	pageIndex = id;
	$("ul").html("");
	for(var i = 0; i < pageSize; i++)
		$("ul").append(resarray[pageIndex*pageSize+i]);
}


$(document).ready(function($) {
	$('.close').click(function(){
		$('.theme-popover-mask').fadeOut(100);
		$('.delete_dialog').slideUp(200);
	});
});

function searchfor (keyword) {
	resarray = [];
	var reg = new RegExp("("+keyword+")","i");
	$.each(bookmarks,function(n,item){
		if(item.title.match(reg))
		{
			var time = timeconvert(item.created);
			var title = item.title;
			title = title.replace(reg,"<span>$1</span>");
			resarray.push("<li><p class='title'>"+title+n+"<button id = 'b"+n+"' class='button button-raised button-pill button-delete'>-</button></p><p class='address'>"+item.address+"</p><p class='time'><i>"+time+"</i></p></li>");
		}else if(item.address.match(reg)){
			var time = timeconvert(item.created);
			var address = item.address;
			address = address.replace(reg,"<span>$1</span>");
			resarray.push("<li><p class='title'>"+item.title+n+"<button id = 'b"+n+"' class='button button-raised button-pill button-delete'>-</button></p><p class='address'>"+address+"</p><p class='time'><i>"+time+"</i></p></li>");
		}
	});
	$("p.reslength").html("");
	$("p.reslength").append("搜索到个"+resarray.length+"结果");
	$("div.pages").html("");
	for(var i = 0; i < pageSize; i++)
		$("ul").append(resarray[i]);
	if(resarray.length > 10){
		totalPages = resarray.length/10;
		for(var i = 0; i < totalPages; i++)
			$("div.pages").append("<a class='pagination' id="+i+">"+(i+1)+"</a>");
	}
}

function timeconvert (timestamp) {
	var time = new Date();
	time.setTime(timestamp * 1000);
	var month = time.getMonth()+1;
	return "Created @ "+time.getFullYear()+"-"+month+"-"+time.getDate();
}