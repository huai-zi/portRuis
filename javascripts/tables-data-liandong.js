window.onload = function () {
    var timu = null;
    $.ajax({
        url: './students-sanji.json',
        success: function (data) {
            /*两级联动*/
            timu = data.data

            var sheng = document.createElement("select");
            var sheng1 = document.createElement("select");
            var shi = document.createElement("select");
            var shi1 = document.createElement("select");
            var qu = document.createElement("select");
            var qu1 = document.createElement("select");
            var area = document.getElementById("area");
            var area1 = document.getElementById("area1");
            area1.appendChild(sheng1);
            area1.appendChild(shi1);
            area1.appendChild(qu1);

            area.appendChild(sheng);
            area.appendChild(shi);
            area.appendChild(qu);

            sheng.name = "section";
            sheng1.name = "section";
            shi.name = "major";
            shi1.name = "major";
            qu.name = "station";
            qu1.name = "station";
            sheng.options[0] = new Option("请选择部门", "");
            sheng1.options[0] = new Option("请选择部门", "");
            shi.options[0] = new Option("请选择专业", "");
            shi1.options[0] = new Option("请选择专业", "");
            qu.options[0] = new Option("请选择岗位", "");
            qu1.options[0] = new Option("请选择岗位", "");

            // 循环第一步,把省循环进select
            for (var i = 0; i < timu.length; i++) {
                sheng.options[sheng.length] = new Option(timu[i].name, timu[i].id);
                // 循环第二步,把所有的市都循环进select
                sheng.onchange = function () {
                    shi.options.length = 0;
                    shi.options[shi.length] = new Option("请选择专业","");
                    for (var j = 0; j < timu[sheng.selectedIndex - 1].timu.length; j++) {
                        shi.options[shi.length] = new Option(timu[sheng.selectedIndex - 1].timu[j].name, timu[sheng.selectedIndex - 1].timu[j].id)
                    }

                }
                shi.onchange = function () {
                    qu.options.length = 0;
                    qu.options[qu.length] = new Option("请选择岗位","");
                    for (var k = 0; k < timu[sheng.selectedIndex - 1].timu[shi.selectedIndex - 1].gangwei.length; k++) {
                        qu.options[qu.length] = new Option(timu[sheng.selectedIndex - 1].timu[shi.selectedIndex - 1].gangwei[k].name,timu[sheng.selectedIndex - 1].timu[shi.selectedIndex - 1].gangwei[k].id);
                    }
                    ;
                }
            }
            ;
            // 循环第一步,把省循环进select
            for (var i = 0; i < timu.length; i++) {
                sheng1.options[sheng1.length] = new Option(timu[i].name, timu[i].id);
                // 循环第二步,把所有的市都循环进select
                sheng1.onchange = function () {
                    shi1.options.length = 0;
                    shi1.options[shi1.length] = new Option("请选择专业","");
                    for (var j = 0; j < timu[sheng1.selectedIndex - 1].timu.length; j++) {
                        shi1.options[shi1.length] = new Option(timu[sheng1.selectedIndex - 1].timu[j].name, timu[sheng1.selectedIndex - 1].timu[j].id)
                    }

                }
                shi1.onchange = function () {
                    qu1.options.length = 0;
                    qu1.options[qu1.length] = new Option("请选择岗位","");
                    for (var k = 0; k < timu[sheng1.selectedIndex - 1].timu[shi1.selectedIndex - 1].gangwei.length; k++) {
                        qu1.options[qu1.length] = new Option(timu[sheng1.selectedIndex - 1].timu[shi1.selectedIndex - 1].gangwei[k].name,timu[sheng1.selectedIndex - 1].timu[shi1.selectedIndex - 1].gangwei[k].id);
                    }
                    ;
                }
            }
            ;

        }
    })


}