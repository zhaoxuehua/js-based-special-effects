/**
 * Created by andy on 2015/12/8.
 */
function scroll() {  // 开始封装自己的scrollTop scrollLeft
    if(window.pageYOffset !== undefined) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

//缓动动画封装
function animate(ele,target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = (target-ele.offsetLeft)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        ele.style.left = ele.offsetLeft + step + "px";
        console.log(1);
        if(Math.abs(target-ele.offsetLeft)<Math.abs(step)){
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },25);
}

//匀速动画封装
function yanimate(ele,target){
    clearInterval(ele.timer);
    var speed = target>ele.offsetLeft?10:-10;
    ele.timer = setInterval(function () {
        var val = target - ele.offsetLeft;
        ele.style.left = ele.offsetLeft + speed + "px";
        if(Math.abs(val)<Math.abs(speed)){
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },30)
}

//通过传递不同的参数获取不同的节点元素
function $(str){
    var str1 = str.charAt(0);
    if(str1==="#"){
        return document.getElementById(str.slice(1));
    }else if(str1 === "."){
        return document.getElementsByClassName(str.slice(1));
    }else{
        return document.getElementsByTagName(str);
    }
}



//功能：给定元素查找他的(第一个元素子节点)，并返回
function getFirstNode(ele){
    var node = ele.firstElementChild || ele.firstChild;
    return node;
}
//功能：给定元素查找他的下一个元素兄弟节点，并返回
function getNextNode(ele){
    return ele.nextElementSibling || ele.nextSibling;
}
//功能：给定元素查找他的上一个兄弟元素节点，并返回
function getPrevNode(ele){
    return ele.previousElementSibling || ele.previousSibling;
}

//功能：给定元素和索引值查找指定索引值的兄弟元素节点，并返回
function getEleOfIndex(ele,index){
    return ele.parentNode.children[index];
}
//功能：给定元素查找他的所有兄弟元素，并返回数组
function getAllSiblings(ele){
    //定义一个新数组，装所有的兄弟元素，将来返回
    var newArr = [];
    var arr = ele.parentNode.children;
    for(var i=0;i<arr.length;i++){
        //判断，如果不是传递过来的元素本身，那么添加到新数组中。
        if(arr[i]!==ele){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}