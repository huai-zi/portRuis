window.onload = function () {

    var scation = null;
    $.ajax({
        url: './zhangjie2.json',
        success: function (data) {
            /*两级联动*/
            scation = data.data

            if (data.message) {

            } else {
                $('.modal-timu').html("您没有相关的专业信息,岗位不能添加...")
                return false
            }
            var sheng = document.createElement("select");
            var shi = document.createElement("select");
            var area = document.getElementById("area");
            area.appendChild(sheng);
            area.appendChild(shi);
            sheng.options[0] = new Option("请选择部门","");
            shi.options[0] = new Option("请选择专业","");

// 循环第一步,把省循环进select

            for (var i = 0; i < scation.length; i++) {

                sheng.options[sheng.length] = new Option(scation[i].name,scation[i].id);



                // 循环第二步,把所有的市都循环进select
                sheng.onchange = function () {
                    shi.options.length = 0;
                    shi.options[shi.length] = new Option("请选择专业","");
                    for (var j = 0; j < scation[sheng.selectedIndex - 1].scation.length; j++) {
                        shi.options[shi.length] = new Option(scation[sheng.selectedIndex - 1].scation[j].name,scation[sheng.selectedIndex - 1].scation[j].id)
                    }
                }
            }
            ;
            ;
        }
    })


}