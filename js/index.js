//初始化
mui.init({
	subpages:[rui.h.normalPage('list')]    
});

var main=null;
var showMenu=false;
var show=null;
var add=null;
var detail=null;

 //所有方法都放在这里
 mui.plusReady(function(){
 	setColor('#f7f7f7');
 	//初始化数据库
 	initDb();
 	//侧滑菜单
 	main=rui.h.indexPage();
 	var menuoptions=rui.h.page('menu',{
 		styles:{
 			left:0,
 			width:'70%',
 			zindex:-1
 		}
 	});
 	menu=mui.preload(menuoptions);
 	rui.on('.mui-icon-bars','tap',opMenu);
 	main.addEventlistener('maskClick',opMenu);
 	mui.menu=opMenu;
 	//添加
 	add = mui.preload(rui.h.normalPage('add', {popGesture:'none'}));
	rui.on('.adda', 'tap', showAdd);
	rui.on('.mui-icon-back', 'tap', hideAdd);
	//详情
	detail=mui.preload(rui.h.normalPage('detail',{popGesture:'none'}));
 	//退出
 	 mui.back = function(){
        if($('.adda').is(':hidden')){
            hideAdd();    
        }else if(showMenu){
            closeMenu();
        }else{
            rui.h.exit();
        }
    };
 });
 // menu
function opMenu(){
	if(showMenu){
		closeMenu();
	}else{
		openMenu();
	}
}
function openMenu(){
	if($('.adda').is(':visible')){
		setColor("#333333");
		menu.show('none', 0, function() {
			main.setStyle({
				mask: 'rgba(0,0,0,0.4)',
				left: '70%',
				transition: {
					duration: 150
				}
			});
	
			showMenu = true;
		});
	}
}
function closeMenu(){
	setColor("#f7f7f7");
	main.setStyle({
		mask: 'none',
		left: '0',
		transition: {
			duration: 100
		}
	});
	
	showMenu = false;
	setTimeout(function() {
		menu.hide();
	}, 300);
}

// showAdd
function showAdd(){
	showBackBtn();
	qiao.h.show('add', 'slide-in-bottom', 300);
}
function hideAdd(){
	hideBackBtn();
	qiao.h.getPage('add').hide();
	qiao.h.getPage('detail').hide();
}
function showBackBtn(){
	$('.menua').removeClass('mui-icon-bars').addClass('mui-icon-back');
	$('.adda').hide();
}
function hideBackBtn(){
	$('.menua').removeClass('mui-icon-back').addClass('mui-icon-bars');
	$('.adda').show();
}

// set color
function setColor(color){
	if(mui.os.ios && color) plus.navigator.setStatusBarBackground(color);
}
/* //初始化数据库
 function initDb(){
 	var db=rui.h.db();
 	rui.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
    rui.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
    
    var help=rui.h.getItem('help');
    if(!help){
    	rui.h.insertItem('help','first');
    }
 }

var gallery = mui('#lunbo');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});*/