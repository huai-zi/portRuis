$(function () {
    /*实例化datatables*/
    //初始化页面加载的数据类型格式.如下
    var datasss = [
        {
            "id": 1,
            "name": "水冷泵的原型",
            "position": "images/model.jpg"
        },
        {
            "id": 1,
            "name": "水冷泵的原型",
            "position": "images/model.jpg"
        }
    ]
    //在下方的url中填写上请求的数据地址
    var table = $('.data-table').DataTable({
        "ajax": {
            'url': 'model.json',
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "type"},
            {
                "data": "position",
                "render": function (data, type, full, set) {
                    //加载多张图片
                    var a = "";
                    var imgs = full.position.split('#');
                    if (imgs.length >= 1) {
                        imgs.forEach(function (v, i) {
                            a += '<img src="' + v + '" alt="">';
                        })
                    } else {
                        a = '<img src="' + data + '" alt="">';
                    }
                    return a
                }
            },
            {"data": "file"},
            {
                "data": "extn",
                "render": function (data, type, full, set) {
                    /*返回的数据拼接*/
                    return "<button type='button' class='btn btn-wide btn-info notazirez' data-toggle='modal' data-target='#info-modal'>修改</button><button type='button' class='btn btn-wide btn-danger removeShuju' data-toggle='modal' data-target='#error-modal'>删除</button>"
                }
            }
        ],
        ordering: false,
        iDisplayLength: 5,
        sProcessing: "正在获取数据，请稍后...",
        "retrieve": true,
        "destroy": true,
        // bAutoWidth:true,
        "aLengthMenu": [
            [5, 15, 20, -1],
            [5, 15, 20, "全部"]
        ],// 显示条数设置
        language: {
            lengthMenu: "显示 _MENU_ 条数据",
            search: '<span class="" style=" font-size: 18px;vertical-align: middle;margin-right: 5px">搜索' +
            '</span>',//右上角的搜索文本，可以写html标签
            paginate: {//分页的样式内容。
                previous: "上一页",
                next: "下一页",
                first: "第一页",
                last: "最后"
            },
            info: "显示 _START_ 到 _END_ 条数据 共 _TOTAL_ 条数据", /*显示页面的数据条数*/
            zeroRecords: "<strong>没有您要的内容，输点其它关键字试试！！</strong>",//table tbody内容为空时，tbody的内容。
            //下面三者构成了总体的左下角的内容。
            infoEmpty: "0条记录",//筛选为空时左下角的显示。
            infoFiltered: ""//筛选之后的左下角筛选提示，

        },
        "fnDrawCallback": function () {
            var vul = '';

            $(document).on('click', '.tbodya > tr td img', function () {
                /*获取点击后的id值*/
                vul = $(this).children().eq(0).text();
                var stcImg = $(this).attr('src');
                $('.big_da').css("display", "flex");
                $('.big_da > img').attr('src', stcImg);
            });

            /*修改数*/
            var aa3 = '';
            var aa4 = '';
            var aa2 = '';
            var aa1 = '';
            $(document).on('click', '.notazirez', function () {


                /*点击修改按钮*/
                aa3 = $(this).parent().parent().children().eq(3).children('img').attr('src');
                aa4 = $(this).parent().parent().children().eq(4).text();
                aa1 = $(this).parent().parent().children().eq(0).text();
                window.aa1 = aa1;
                aa2 = $(this).parent().parent().children().eq(2).text();
                //获取数据节点信息
                $('#type1 option').each(function (i, v) {
                    if ($(v).text() === aa2) {
                        $(v).attr('selected', "selected");
                    }
                })

                $('.model_changeText2').text(aa4);
                $('#name1').val($(this).parent().parent().children().eq(1).text());
                $('.photo-box1 img').attr('src', aa3);
            });
        }

    });


    /*点击删除按钮传值*/
    var vul3 = '';
    $(document).on('click', '.tbodya > tr', function () {
        /*获取点击后的id值*/
        vul3 = $(this).children().eq(0).text();
    })

    /*确认删除*/
    $(document).on('click', '#remove', function () {
        var dataset = {
            "id": vul3
        };

        modelz.ajaxPost(url, dataset, function () {
            table.ajax.reload();
        });
    });

});


var models = (function () {
    function model() {
        if (this instanceof model) {

            this.midel_add = $('.addTo');//添加设备信息
            this.midel_addAffirm = $('#addAffirm');//确认添加设备信息
            this.midel_type = $('#type');//类型下拉框
            this.midel_type1 = $('#type1');//类型下拉框
        } else {
            return new model();
        }
    }

    //向后台传值
    function ajaxPost(url, dataset, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(dataset),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.type === 0) {
                    callback();
                }
                slide(data);
            }
        })
    }

    //获取值
    function ajaxGet(url, callback) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        })
    }

    /*js检查是否全部输入*/
    function selectJc(namee, wrong) {
        /*form表单*/
        var model = document[namee];
        /*设备名称*/
        var modelName = model.modelName.value;
        /*设备图片*/
        var modelImg = model.files.value;
        //设备类型
        var modelType = model.type.value;

        if (namee === 'model_xxx') {
            if (modelName === "") {
                $('.' + wrong).show();
                return false
            } else {
                $('.' + wrong).hide();
                return true
            }
        } else {
            if (modelName === "" || modelType === "") {
                $('.' + wrong).show();
                return false
            } else {
                $('.' + wrong).hide();
                return true
            }
        }

    }

    //传递图片信息
    function numcs(url, forms, cid,callback) {
        var formData = new FormData($("#" + forms)[0]);
        formData.append("id",cid);
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.type === 0) {
                    callback()
                }
                slide(data);
            }
        });
    }

    //将模态框设置点击空白处不取消地址
    function modtal(dataa) {
        $(dataa).each(function (i, v) {
            $("#" + v).css('backgroundColor', 'rgba(0,0,0,.7)')
            $("#" + v).modal({
                keyboard: false,
                backdrop: false,
                show: false
            })
        })

    }

    function slide(data) {
        if (data.type === 0) {
            $('.shuju-tishi1').text(data.message)
            $('.shuju-tishi1').slideDown()
            var timeou = setTimeout(function () {
                $('.shuju-tishi1').slideUp()
            }, 2000)
            /*成功重新记载表格数据*/
            clearTimeout(timeout1)
        } else {
            clearTimeout(timeou)
            /*数据加载失败*/
            $('.shuju-tishi2').text(data.message)
            $('.shuju-tishi2').slideDown()
            var timeout1 = setTimeout(function () {
                $('.shuju-tishi2').slideUp()
            }, 2000)
        }
    }

    //提交数据数据成功，成功请求数据加载页面
    function tablesAjax() {
        var table = $('.data-table').DataTable();
        table.ajax.reload();
        return table;
    }

    model.prototype = {
        "constructor": model,
        "slide": slide,
        "ajaxPost": ajaxPost,
        "selectJc": selectJc,
        "modtal": modtal,
        "numcs": numcs,
        "tables": tablesAjax,
        "ajaxGet": ajaxGet
    };
    return model;
})();

var modelz = new models();
//将模态框进行处理
var modals = ['lg-modal1', 'info-modal', 'error-modal'];
modelz.modtal(modals);


//设备点击添加设备信息
modelz.midel_addAffirm.click(function () {
    if (!modelz.selectJc('model_xx', 'warm-xinxi')) {
        //进行数据交互的界面
        return false
    } else {
        //成功的情况，进行数据传递，格式name=XX&files=xx
        modelz.numcs(url, "form01", function () {
            $('#name').val('');
            modelz.tables();
        })
    }
});
modelz.ajaxGet("models.json", function (data) {
    for (var i = 0, let; let = data[i++];) {
        modelz.midel_type1[0].options[i] = new Option(let.name, let.id);
        modelz.midel_type[0].options[i] = new Option(let.name, let.id);
    }
})
//点击确认修改
$('#qren').on('click', function () {

    if (!modelz.selectJc('model_xxx', 'warm-xinxi1')) {
        //进行数据交互的界面
        return false
    } else {
        //成功的情况，进行数据传递，格式name=XX&files=xx
        modelz.numcs(url, "form02",window.aa1, function () {
            modelz.tables();
        })
    }
})
