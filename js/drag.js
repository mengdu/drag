/*
*	drag Object
*	var m=new drag(moveObj,targetObj,[callback]);
*	editor: bluemoon
*	2015-3-21 10:23
*
*/
function drag(obj,target,callback){
	var that=this;
	this.move=false;
	this.call=false;
	this.x=null;
	this.y=null;
	this.objx=null;
	this.objy=null;
	this.Top=null;
	this.Left=null;
	this.bodyX=null;
	this.bodyY=null;
	this.objWidth=null;
	this.objHeight=null;
	this.opacity=attrStyle(target,"opacity")||1;
	that.copacity=0.8;
	that.zIndex=attrStyle(target,"z-index")||1;
	that.maxzIndex=3000;
	console.log(that.zIndex);
	//that.czIndex=1;
	obj.onmousedown=function(e){
		 e.preventDefault();
	     e.stopPropagation();
	     that.objWidth=obj.offsetWidth;
	     that.objHeight=obj.offsetHeight;
	     
	     that.move=true;
	     that.call=true;
	     that.x=e.clientX;
	     that.y=e.clientY;
	     that.objx=target.offsetLeft;
	     that.objy=target.offsetTop;
	     that.bodyX=document.documentElement.clientWidth;
	     that.bodyY=document.documentElement.clientHeight;
		if(e.button==0){
			target.style.opacity=that.copacity;
			target.style.zIndex=that.maxzIndex;
			document.onmousemove=function(m){
				if(that.move){
					 
					that.Top=(m.clientY-(that.y-that.objy));
					that.Left=(m.clientX-(that.x-that.objx));
					that.Top=(that.Top<0?0:(that.Top>(that.bodyY-target.offsetHeight)?(that.bodyY-target.offsetHeight):that.Top));
					that.Left=(that.Left<0?0:(that.Left>(that.bodyX-target.offsetWidth)?(that.bodyX-target.offsetWidth):that.Left));
					target.style.left=that.Left+"px";
					target.style.top=that.Top+"px";
				}else{
					return;
				}
			}
		}
	}
	obj.onmouseup=function(e){
		 e.preventDefault();
	     e.stopPropagation();
	     target.style.opacity=that.opacity;
	     target.style.zIndex=that.zIndex;
	     that.move=false;
	     if(callback&&that.call){
	     	that.call=false;
	     	callback();
	     }
	}
	/*obj.onmouseleave=function(e){
		e.preventDefault();
	     e.stopPropagation();
	     target.style.opacity=that.opacity;
	     that.move=false;
	     console.log(that.move);
	     if(callback&&that.call){
	     	that.call=false;
	     	callback();
	     }
	}*/
	//以下选择css属性函数来自网络
	function attrStyle(elem,attr){ 
		if(elem.attr){ 
			//若样式存在于html中,优先获取 
			return elem.style[attr]; 
		}else if(elem.currentStyle){ 
			//IE下获取CSS属性最终样式(同于CSS优先级) 
			return elem.currentStyle[attr]; 
		}else if(document.defaultView && document.defaultView.getComputedStyle){ 
			//W3C标准方法获取CSS属性最终样式(同于CSS优先级) 
			//注意,此法属性原格式(text-align)获取的,故要转换一下 
			attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase(); 
			//获取样式对象并获取属性值 
			return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr); 
		}else{ 
			return null; 
		} 
	}
	

}

