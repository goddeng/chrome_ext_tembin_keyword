var totalPage;
var page = 0;

//注册前台页面监听事件
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		//totalPage = $("input[name=totalPage]").val();
		totalPage = getTotalPage();
		console.log("totalPage----------" + totalPage);
			   getListKeyword( sendResponse );
	});

//获取总页数
function getTotalPage(){	
	if($("ul.pagination li:last a").length>0){
		 urlArr=$("ul.pagination li:last a").attr('href').split("&");
		for(var i=0; i<urlArr.length; i++){
			if(urlArr[i].split('=')[0] == 'page'){
				return parseInt(urlArr[i].split('=')[1]);
			}
		}
	}else{
		return 0;
	}
}


//获取关键词列表
function getListKeyword( sendResponse ){
	searchtype=$("input[type='radio']:checked").val();
	searchkey=$('#keywords').val();
	listKeyword=[];
    splitstr = "@_@";
	$("#object tbody").find("tr").each(function(){
    var tdArr = $(this).children();
    listKeyword.push(
		searchtype+splitstr+searchkey+splitstr+tdArr.eq(0).find("div a").text().replace(/[\r\n]\ +/g,"")+splitstr+tdArr.eq(1).find("div").text().replace(/[\r\n]/g,"").replace(/\s+/g, ' ')+splitstr+tdArr.eq(2).text().replace(/[\r\n]\ +/g,"")+splitstr+tdArr.eq(3).text().replace(/[\r\n]\ +/g,"")+splitstr+tdArr.eq(4).text().replace(/[\r\n]\ +/g,"")+splitstr+tdArr.eq(5).text().replace(/[\r\n]\ +/g,"")+splitstr+tdArr.eq(6).text().replace(/[\r\n]\ +/g,"")+splitstr+tdArr.eq(7).text().replace(/[\r\n]\ +/g,"")+splitstr+tdArr.eq(8).text().replace(/[\r\n]\ +/g,""));
  });

	//chrome.extension.sendMessage({"orderInfo": orderInfo}, function(response) {});
	if($("li.paginate_button.active").lenght>0){
		page = parseInt($("li.paginate_button.active").text());
	}
	totalPage=getTotalPage();
	console.log(page + "--page-----------totalPage---" + totalPage);
	if(page < totalPage && page < 100){
		console.log("---------next-------");
		sendMsg( listKeyword, "next" );
			$("ul.pagination li").eq(5).find("a").append('<span id="next_page">next</span>');
			$("#next_page").click();
	}else{
		console.log("---------end-------");
		sendMsg( listKeyword, "end" );
		   alert("信息采集完成!");
		   window.open('http://edc.boxintheship.com/collect/tools/tembin/');
	}
}

//将获取内容传递给后台文件进行处理
function sendMsg( msg, cmd){
	chrome.extension.sendMessage({"msg": msg, "cmd": cmd}, function(response) {});
}