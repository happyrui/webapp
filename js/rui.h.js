var rui = {};
rui.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};
rui.juicer = function(el, data, callback){
	if(el){
		var $tpl = $(el);
		$tpl.after(juicer($tpl.html(), data));
		if(callback) callback();
	}
};

rui.h = {};
// page相关
rui.h.normalStyle = {top:'45px',bottom:0};
rui.h.centerStyle = {top:'45px',bottom:'50px'};
rui.h.normalPage = function(id, options){
	var opt = $.extend({}, options, rui.h.normalStyle);
	return rui.h.page(id, {styles : opt});
};
rui.h.centerPage = function(id, options){
	var opt = $.extend({}, options, rui.h.normalStyle);
	return rui.h.page(id, {styles : opt});
};
rui.h.page = function(id, options){
	var url = id + '.html';
	
	options.id = id;
	options.url = url;
	return options;
};
rui.h.indexPage = function(){
	return plus.webview.getWebviewById(plus.runtime.appid);
};
rui.h.currentPage = function(){
	return plus.webview.currentWebview();
};
rui.h.getPage = function(id){
	return id ? plus.webview.getWebviewById(id) : null;
};
rui.h.show = function(id, ani, time, func){
	if(id) plus.webview.show(id, ani, time, func);
};
rui.h.hide = function(id, ani, time){
	if(id) plus.webview.hide(id, ani, time);
};
rui.h.fire = function(id, name, values){
	mui.fire(rui.h.getPage(id), name, values);
};

// 以下为UI封装------------------------------------------------------------------------------
// rui.h.tip
rui.h.tip = function(msg, options){
	plus.nativeUI.toast(msg,options);
};

// rui.h.waiting
rui.h.waiting = function(titile, options){
	plus.nativeUI.showWaiting(titile, options);
};
rui.h.closeWaiting = function(){
	plus.nativeUI.closeWaiting();
};

// popover
rui.h.pop = function(){
	mui('.mui-popover').popover('toggle');
};

// actionsheet
rui.h.sheet = function(title, btns,func){
	if(title && btns && btns.length > 0){
		var btnArray = [];
		for(var i=0; i<btns.length; i++){
			btnArray.push({title:btns[i]});
		}
		
		plus.nativeUI.actionSheet({
			title : title,
			cancel : '取消',
			buttons : btnArray
		}, function(e){
			if(func) func(e);
		});
	}
};

// 提示框相关
rui.h.modaloptions = {
	title 	: 'title',
	abtn	: '确定',
	cbtn	: ['确定','取消'],
	content	: 'content'
};
rui.h.alert = function(options, ok){
	var opt = $.extend({}, rui.h.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.alert(opt.content, function(e){
		if(ok) ok();
	}, opt.title, opt.abtn);
};
rui.h.confirm = function(options, ok, cancel){
	var opt = $.extend({}, rui.h.modaloptions);
	
	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.confirm(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok();
		if(i == 1 && cancel) cancel();
	}, opt.title, opt.cbtn);
};
rui.h.prompt = function(options, ok, cancel){
	var opt = $.extend({}, rui.h.modaloptions);
	
	opt.title = '输入内容';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.prompt(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok(e.value);
		if(i == 1 && cancel) cancel(e.value);
	}, opt.title, opt.content, opt.cbtn);
};

// 以下为插件封装------------------------------------------------------------------------------
// 本地存储相关
rui.h.length = function(){
	return plus.storage.getLength();
};
rui.h.key = function(i){
	return plus.storage.key(i);
};
rui.h.getItem = function(key){
	if(key){
		for(var i=0; i<rui.h.length(); i++) {
			if(key == plus.storage.key(i)){
				return plus.storage.getItem(key);
			}
		};
	}
	
	return null;
};
rui.h.insertItem = function(key, value){
	plus.storage.setItem(key, value);
};
rui.h.delItem = function(key){
	plus.storage.removeItem(key);
};
rui.h.clear = function(){
	plus.storage.clear();
};

// web sql
rui.h.db = function(name, size){
	var db_name = name ? name : 'db_test';
	var db_size = size ? size : 2;
	
	return openDatabase(db_name, '1.0', 'db_test', db_size * 1024 * 1024);
};
rui.h.update = function(db, sql){
	if(db &&sql){
		db.transaction(function(tx){tx.executeSql(sql);});	
	}
};
rui.h.query = function(db, sql, func){
	if(db && sql){
		db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
};

// 以下为功能封装------------------------------------------------------------------------------
// 退出
rui.h.exit = function(){
	rui.h.confirm('确定要退出吗？', function(){
		plus.runtime.quit();
	});
};
// 刷新
rui.h.endDown = function(selector){
	var sel = selector ? selector : '#refreshContainer';
	mui(sel).pullRefresh().endPulldownToRefresh();
};

// init
var db = rui.h.db();