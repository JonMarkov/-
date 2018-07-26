// var utils = (function () {
//     var  a =10;
//     function toArray(likeAry) {
//         var  ary = [];
//         try{
//             ary = Array.prototype.slice.call(likeAry);
//         }catch(e){
//             for(var i=0;i<likeAry.length;i++){
// //                ary.push(likeAry[i])
//                 ary[ary.length] = likeAry[i];
//             }
//         };
//         return ary;
//     };
//     return {
//         toArray:toArray
//     }
// })();

//单例模式
// var  a =10
console.log(1);
var utils = {
    toArray : function (likeAry) {
        var  ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
//                ary.push(likeAry[i])
                ary[ary.length] = likeAry[i];
            }
        };
        return ary;
    },
    // 把JSON格式的字符串转换成JSON格式的对象
    toJSON:function (str) {
        return  "JSON" in window ? JSON.parse(str):eval("("+str+")");
    }
}


//
//
//
//
//
// var list = document.getElementById("list");
// var navS = document.getElementsByTagName("a");
// var oLis = document.getElementsByName("li");
// var data;
// // 1.ajax获取json文件中的数据
// var xhr = new XMLHttpRequest();// 创建一个ajax对象；
// // 打开路径
// xhr.open("get",'json/product.json',false);// 同步；
// // 监听
// xhr.onreadystatechange = function () {
//     if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
//         // 如果上面的条件成立，前端接收到后端发来的数据;
//         // 通过ajax请求到的数据是一个JSON格式的字符串；
//         data = utils.toJSON(xhr.responseText);
//     }
// };
// // 发送请求；
// xhr.send();
// console.log(data);
//
//
// //绑定数据
// function dataBinding() {
//     var str = ``;
//     for(var i = 0;i<data.length;i++){
//         var cur = data[i];
//         str += `<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
//                     <img src="${cur.img}">
//                     <span>${cur.title}</span>
//                     <span>${cur.time}</span>
//                     <span>${cur.hot}</span>
//                     <span>${cur.price}</span>
//                 </li>`
//     }
//     list.innerHTML = str;
// }dataBinding();
//
//
// //给每一个a标签绑定一个事件；点击a，能让商品进行排序；
// for(var i = 0;i<navS.length;i++){
//     var cur = navS[i];
//     cur.onclick = function () {
//         sortList()
//     }
// }
// //排序
// function sortList() {
//     var ary = utils.toArray(oLis);
//     ary.sort(function (a,b) {
//         //getAttribute:获取行业自定义属性
//
//     })
// }
//
//
//
//

