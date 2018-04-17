var excels = (function () {
    function excel() {
        if (this instanceof excel) {
        } else {
            return new excel();
        }
    };

    function model(dataa) {
        $(dataa).each(function (i, v) {
            $("#" + v).css('backgroundColor', 'rgba(0,0,0,.7)')
            $("#" + v).modal({
                keyboard: false,
                backdrop: false,
                show: false
            })
        })

    }

    //获取数据进行提醒
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

    function newForm(url, dataset, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(dataset),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.type === 0) {
                    //回调函数
                    callback;
                }
                /*请求成功*/
                excel.prototype.slide(data);
            }
        })

    }

    //上传监控
    function changeFile(e, name, sex, iphone, cshi, email) {
        var files = e.target.files;
        var fileReader = new FileReader();
        fileReader.onload = function (ev) {
            try {
                var data = ev.target.result,
                    workbook = XLSX.read(data, {
                        type: 'binary'
                    }), // 以二进制流方式读取得到整份excel表格对象
                    persons = []; // 存储获取到的数据
            } catch (e) {
                alert('文件类型不正确,重新上传');
                return;
            }

            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = '';
            // 遍历每张表读取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));

                    // break; // 如果只取第一张表，就取消注释这行
                }
            }
            $(persons).each(function (i, v) {
                for (var key in v) {
                    var bb = v[key];
                    //删除填写格式不规范的对象
                    console.log(v);
                    delete v[key];
                    //将填写出的对象进行清除空格处理
                    key = $.trim(key);
                    v['"' + key + '"'] = bb;
                }
            })
            excel.prototype.dataTables(persons, name, sex, iphone, cshi, email);
            //persons为传入的数据值
            // excel.prototype.newForm(url, persons);
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);
    };

    //对表格函数进行封装
    function dataTables(dataset, name, sex, iphone, cshi, email) {
        var table = $('.data-table').DataTable({
            "data": dataset,
            dom: 'Bfrtip',
            "columns": [
                {
                    "data": name,
                    "render": function (data, type, full, set) {
                        //对数据进行判断
                        var fll = full['"' + name + '"'];
                        if (fll === undefined) {
                            return '空';
                        } else {
                            return fll;
                        }
                    }
                },
                {
                    "data": sex,
                    "render": function (data, type, full, set) {
                        var fll = full['"' + sex + '"'];
                        if (fll === undefined) {
                            return '空';
                        } else {
                            return fll;
                        }
                    }
                },
                {
                    "data": iphone,
                    "render": function (data, type, full, set) {

                        var fll = full['"' + iphone + '"'];
                        if (fll === undefined) {
                            return '空';
                        } else {
                            return fll;
                        }
                    }
                },
                {
                    "data": cshi,
                    "render": function (data, type, full, set) {

                        var fll = full['"' + cshi + '"'];
                        if (fll === undefined) {
                            return '空';
                        } else {
                            return fll;
                        }
                    }
                },
                {
                    "data": email,
                    "render": function (data, type, full, set) {

                        var fll = full['"' + email + '"'];
                        if (fll === undefined) {
                            return '空';
                        } else {
                            return fll;
                        }
                    }
                },
                {
                    "data": "extn",
                    "render": function (data, type, full, set) {
                        var button = "<button type='button' class='btn btn-wide btn-info notazirez' data-toggle='modal' data-target='#info-modal'>修改</button><button type='button' class='btn btn-wide btn-danger removeShuju' data-toggle='modal' data-target='#error-modal'>删除</button>"
                        return button
                    }
                }
            ],
            buttons: [{
                extend: 'excelHtml5',
                customize: function (xlsx) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('row c[r^="C"]', sheet).attr('s', '2');
                }
            }],
            destroy: true,//清空数据
            ordering: false,
            iDisplayLength: 5,
            sProcessing: "正在获取数据，请稍后...",
            "retrieve": true,
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
                /*点击修改*/

            }
        });

        //再次加载数据,重新绘制表格数据
        var table = $('.data-table').dataTable();
        var oSettings = table.fnSettings(); //这里获取表格的配置
        table.fnClearTable(this); //动态刷新关键部分语句，先清空数据
        for (var i = 0, l = dataset.length; i < l; i++) {
            table.oApi._fnAddData(oSettings, dataset[i]); //这里添加一行数据
        }
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        table.fnDraw();//绘制表格

    }

    excel.prototype = {
        "modelS": model,
        "slide": slide,
        "newForm": newForm,
        "changeFile": changeFile,
        "dataTables": dataTables
    }
    return excel;
})();

var exc = new excels();
/*对模态框进行绘制*/
var modelS = ['md-modal', 'info-modal', 'error-modal'];
exc.modelS(modelS);
//加载dataTables数据
//对新增成员进行传数据

$('#addTo').on('click', function () {

})


//批量上传
$('#upload').on('click', function () {

    $('#files').click();

})
//上传传值
$('#files').change(function (e) {
    exc.changeFile(e, '姓名', '账号', '员工号', '处室', '手机');
});

//删除行
var trs = '';
$(document).on('click', '.removeShuju', function () {
    trs = $(this).parent().parent();
})
//删除数据
$('#remove').click(function () {
    var table = $('.data-table').DataTable();
    table.row(trs[0]).remove().draw();
    var dataset = {
        'name': trs.children('td').eq(0).text(),
        'sex': trs.children('td').eq(1).text(),
        'iphone': trs.children('td').eq(2).text(),
        'email': trs.children('td').eq(3).text(),
    }
    //传值
    exc.newForm(url, dataset);
})


var add = null;
$(document).on('click', '.notazirez', function () {
    /*点击添加按钮*/
    add = $(this).parent().parent();
    $('#name').val($(this).parent().parent().children().eq(0).text())
    var sexT = $(this).parent().parent().children().eq(1).text();
    if (sexT === '男') {
        $('#sex1').prop('checked', true)
    } else {
        $('#sex2').prop('checked', true)
    }
    $('#iphone').val($(this).parent().parent().children().eq(2).text())
    $('#email').val($(this).parent().parent().children().eq(3).text())
});

//确认修改
$('#notarize').on('click', function () {
    var data0 = add.children('td').eq(0);
    var data1 = add.children('td').eq(1);
    var data2 = add.children('td').eq(2);
    var data3 = add.children('td').eq(3);
    var sexx = $('#sex1').prop('checked');
    var sexx2 = '';
    if (sexx) {
        sexx2 = '男';
    } else {
        sexx2 = '女';
    }
    var dataset = {
        'name': $('#name').val(),
        'sex': sexx2,
        'iphone': $('#iphone').val(),
        'email': $('#email').val(),
    }
    data0.text($('#name').val());
    data1.text(sexx2);
    data2.text($('#iphone').val());
    data3.text($('#email').val());
    exc.newForm(url, dataset);
})