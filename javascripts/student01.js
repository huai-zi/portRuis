window.onload = function () {

    var timu = null;
    $.ajax({
        url: './students-sanji.json',
        success: function (data) {
            /*两级联动*/
            timu = data.data
            var sheng1 = document.createElement("select");
            var shi1 = document.createElement("select");
            var area1 = document.getElementById("areae");
            area1.appendChild(sheng1);
            area1.appendChild(shi1);
            sheng1.name = "kecheng";
            shi1.name = "zhangjie";
            sheng1.options[0] = new Option("请选择课程","");
            shi1.options[0] = new Option("请选择章节","");

// 循环第一步,把省循环进select

            for (var i = 0; i < timu.length; i++) {

                sheng1.options[sheng1.length] = new Option(timu[i].name,timu[i].id);



                // 循环第二步,把所有的市都循环进select
                sheng1.onchange = function () {
                    shi1.options.length = 0;
                    shi1.options[shi1.length] = new Option("请选择章节","");
                    for (var j = 0; j < timu[sheng1.selectedIndex - 1].timu.length; j++) {
                        shi1.options[shi1.length] = new Option(timu[sheng1.selectedIndex - 1].timu[j].name,timu[sheng1.selectedIndex - 1].timu[j].id)
                    }
                }
            }
            ;
            ;
        }
    })


}