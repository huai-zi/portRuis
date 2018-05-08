//将函数进行封装
var PE = (function () {
    function PE1() {
        if (this instanceof PE1) {
            this.old_img = $('.peinsder-imgas');//点击图片
            this.top_butt = $('.scroll-to-top');//点击顶部

        } else {
            return new PE1();
        }
    }

    //将分页插件打包
    function fen(data, num1, num2, zong, exx, id) {
        var options = {
            currentPage: 1, /*默认显示位置*/
            totalPages: zong, /*一共多少条*/
            itemTexts: function (type, page, current) {
                /*显示的是点击目前的位置*/
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            },
            onPageChanged: function (e, oldPage, newPage) {
                /*回调函数*/
                /*点击按钮页面显示页数的按钮值*/

                num2 = num2 * newPage;
                for (var i = 1; i < newPage; i++) {
                    num1 += 12
                }
                PE1.prototype.addPage(data, num1, num2, exx, id);

                num1 = 0;
                num2 = 12;
            }

        }

        $('#example').bootstrapPaginator(options);
    }

    //获取值并进行数据渲染
    function templates(url, json, id) {
        var fac = [];
        var fac1 = [];
        if (url !== "") {
            $.ajax({
                url: url,
                type: "get",
                success: function (data) {
                    //对特殊数据进行处理,双重身份
                    $(data).each(function (i, v) {
                        if (v.parentId !== 0) {
                            fac.push(v);//课程
                        }else{
                            //为0的是设备
                            fac1.push(v);

                        }
                    })
                    //将设备进行保存
                    localStorage.setItem("kecheng",JSON.stringify(fac));

                    //将数据进行渲染到页面上
                    var num1 = 0;
                    /*点击切换页数数据的更新*/
                    var num2 = 12;
                    var zong = '';
                    /*记录数据的总页数*/
                    PE1.prototype.addPage(fac1, num1, num2, 1, id);
                    zong = fac1.length;
                    zong = parseInt(zong / 12) + 1;
                    /*分页按钮*/
                    PE1.prototype.fen(fac1, num1, num2, zong, 1, id);

                }
            })
        } else {
            //将数据进行渲染到页面上
            var num1 = 0;
            /*点击切换页数数据的更新*/
            var num2 = 12;
            var zong = '';
            /*记录数据的总页数*/
            PE1.prototype.addPage(json, num1, num2, 2, id);
            zong = json.length;
            zong = parseInt(zong / 12) + 1;
            /*分页按钮*/
            PE1.prototype.fen(json, num1, num2, zong, 2, id);

        }
    }

    //向后台传值
    function ajaxPost(url, dataset, callback) {
        $.ajax({
            url: url,
            type: "post",
            data: JSON.stringify(dataset),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                callback(data);
            }
        })
    }

    //将每次数据进行分页处理
    function addPage(data, num1, num2, ex, id) {
        var bb = [];
        data.forEach(function (v, i) {
            if (i < num2 && i >= num1) {
                bb.push(data[i]);
            }
        })

        var mes = {
            'tem': bb,
            "ex": ex
        };
        bb = [];
        var htms = template('peinsders', mes);
        document.getElementById(id).innerHTML = htms;

        $('.peinsder-imgas').on("click", function () {
            var dataVal = $(this).attr('old');
            var dataset = [];
            //点击传送id,并接收返回的值
            //不需要传值,直接进行遍历筛选

            var kecheng = JSON.parse(localStorage.getItem("kecheng"));
            $(kecheng).each(function(i,v){
                if(+dataVal === v.parentId ){
                    dataset.push(v);
                }
            })

                //接收返回的json
            pe.templates("", dataset, id);

        })
        $('.peinsder-imgas1').on("click", function () {
            var hash = $(this).attr('zips');
            var url = 'peinsder.html' + "#" + hash;
            window.open(url,"_blank");
        })
    }


    //弹出警示窗
    function slide(data) {
        if (data.type === 0) {
            $('.shuju-tishi1').text(data.message)
            $('.shuju-tishi1').slideDown()
            var timeou = setTimeout(function () {
                $('.shuju-tishi1').slideUp()
            }, 2000)
            /*成功重新记载表格数据*/
            clearTimeout(timeout1);
        } else {
            clearTimeout(timeou);
            /*数据加载失败*/
            $('.shuju-tishi2').text(data.message);
            $('.shuju-tishi2').slideDown();
            var timeout1 = setTimeout(function () {
                $('.shuju-tishi2').slideUp()
            }, 2000)
        }
    }

    //显示向上按钮
    function scrollTop() {
        $(window).scroll(function () {
            var scrtop = $(window).scrollTop();
            if (scrtop >= 200) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        })
    }

    PE1.prototype = {
        constructor: PE1,
        "templates": templates,
        "addPage": addPage,
        "fen": fen,
        "ajaxPost": ajaxPost,
        "scrollTop": scrollTop
    }

    return PE1;
})()
//默认启动滚动条显示向上图标
var pes = new PE();
pes.scrollTop();