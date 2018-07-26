//0.获取DOM
var data;//定义一个date
var list =document.getElementById("list");//获取最外层id
var navs = document.getElementsByTagName("a");//获取每一个a标签元素
var oLis = document.getElementsByTagName("li");//获取每一个li元素

// 1.ajax获取json文件中的数据
var xhr = new XMLHttpRequest();// 创建一个ajax对象；
// 打开路径
xhr.open("get",'json/product.json',false);// 同步；   get提交   路径   控制的是同步异步：false代表同步  ture代表异步
//true,(默认)，异步方式，$.Ajax执行后，会继续执行ajax后面的脚本，直到服务器端返回数据后，触发$.Ajax里的success（请求成功）方法，这时候执行的是两个线程。
//false，同步方式，所有的请求均为同步请求，在没有返回值之前，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。


// 监听
xhr.onreadystatechange = function () {//监听是否获取到数据
    if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){//如果code值是2**   则执行
        // 如果上面的条件成立，前端接收到后端发来的数据;
        // 通过ajax请求到的数据是一个JSON格式的字符串；
        data = utils.toJSON(xhr.responseText);//把获取到的数据转换成json格式赋值给data
    }
}
// 发送请求；
xhr.send();//发送请求


// 2.绑定数据；
function bindHtml() {
    var  str = ``;//定义一个str
    for(var i=0;i<data.length;i++){//遍历json数据的每一项
        var cur = data[i]; //把每一项逐个赋值给cur
        str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
              <img src="${cur.img}" alt="">
              <span>${cur.title}</span>//
              <span>${cur.time}</span>
              <span>${cur.hot}</span>
              <span>${cur.price}</span>
          </li>`//添加到DOM

    }
    list.innerHTML = str;//显示到页面
}
bindHtml();



// 3.给每一个a标签绑定一个点击事件；点击a,能让商品进行排序；
for(var i=0;i<navs.length;i++){
    var  cur = navs[i];//获取每一个a元素
    cur.index = i;//给每个a元素自定义增加一个index属性 index ="i"
    cur.flag = -1;// 初始化都是-1；//给每个a元素都增加一个属性flag = "-1"
    cur.onclick = function () {//点击a元素
        //this---> cur
        this.flag*=-1;// 每点击一次，让当前的flag*=-1；//此时this指向是a元素  使a元素的自定义属性*-1
        sortList.call(this);//改变函数sortList的this指向为cur
        addArrow.call(this);//改变函数addArrow的this指向为cur
        removeArrow.call(this);//改变函数removeArrow的this指向cur
    }
}
// 排序
function sortList() {
    var that = this;//把指向window的this赋值给that
    var ary = utils.toArray(oLis);//类数组转换为数组
    var newAry = ["data-time","data-hot","data-price"];//定义个新数组
    ary.sort(function (a,b) {
        // getAttribute : 获取行内的自定义属性值；
        var curLi = a.getAttribute(newAry[that.index]);//that指向的是cur（因为上面call转变了this指向） that.index获取到每个a元素标签的index值（0、1、2）
        var nextLi = b.getAttribute(newAry[that.index]);//newAry[that.index]获取到新数组中的某一项（"data-time","data-hot","data-price"）
        if(that.index===0){//如果条件成立 就是对时间排序（第一个标签元素）
            curLi = curLi.replace("-","").replace("-","");//用""来替换"-"
            nextLi = nextLi.replace("-","").replace("-","");//用""来替换"-"
        }
        return (curLi-nextLi)*that.flag;//排序之后的结果 如果flag为1  则是curLi-nextLi  如果flag为1  则是nextLi-curLi
    });//获得排序
    for(var i=0;i<ary.length;i++){//遍历DOM
        list.appendChild(ary[i]);//逐个插入
    }
}


// 4.上下箭头切换颜色
function addArrow() {
    console.log(this);//因为此函数是点击事件（cur.onclick）下执行的，所有this的指向是cur（也就是点击的那个a标签元素）；
    var up  = this.children[0];//获取第一个子元素
    var down  = this.children[1];//获取第二个子元素
    if(this.flag>0){//初始化是-1  点击一次是（-1*-1=1）大于0，也就是从高到低（降序）排序；点击第二次是（1*-1=-1）小于0，也就是从低到高（升序）排序
        up.classList.add("bg");//增加一个名字为bg的class
        down.classList.remove("bg");//删除一个名字为bg的class
    }else{
        up.classList.remove("bg");//删除一个名字为bg的class
        down.classList.add("bg");//增加一个名字为bg的class
    }
}
function removeArrow() {
    for(var i=0;i<navs.length;i++){
        if(this!=navs[i]){//如果点击的this不是这个a标签元素  则执行
            // 点击不是这个a的所有的子元素清掉class :bg;
            navs[i].children[0].classList.remove("bg");//删除第一个子元素的bg
            navs[i].children[1].classList.remove("bg");//删除第二个子元素的bg
            navs[i].flag = -1;//把-1赋值给flag（保持初始状态）
        }
    }
}








