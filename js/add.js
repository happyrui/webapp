// 初始化
mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false
	}
});


// 所有方法都放到这里
mui.plusReady(function(){
	resetPage();
	rui.on('.addItemBtn', 'tap', addItem);
});

// 重置页面
function resetPage(){
	$('#addContent').val('');
	$('#addTitle').val('');
}

// 添加待办事项
function addItem(){
	var title = $.trim($('#addTitle').val());
	var content = $.trim($('#addContent').val()).replace(/\n/g, '<br/>');
	
	if(!title){
		rui.h.alert('请填写待办事项标题！');		
	}else{
		rui.h.getPage('add').hide();
		resetPage();
		rui.h.fire('list', 'addItem', {title:title, content:content});
	}
}