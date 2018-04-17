$(function () {
    /*实例化datatables*/
    $('.data-table').DataTable({
        "ajax": "./section1.json",
        "columns": [
            {"data": "id"},
            {"data": "uid"},
            {"data": "name"},
            {"data": "position"},
            {
                "data": "",
                "render": function (data, type, full, set) {
                    /*返回的数据拼接*/
                    return "<button class='btn btn-wide btn-info1'>职位管理</button><button type='button' class='btn btn-wide btn-info notazirez' data-toggle='modal' data-target='#info-modal'>修改</button><button type='button' class='btn btn-wide btn-danger removeShuju' data-toggle='modal' data-target='#error-modal'>删除</button>"
                }
            }

        ],
        ordering: false,
        iDisplayLength: 5,
        sProcessing: "正在获取数据，请稍后...",
        "retrieve": true,
        "destroy": true,
        "aLengthMenu":  [
            [5, 15, 20, -1],
            [5, 15, 20, "全部"] // 显示多少条数据
        ], // 显示条数设置
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
        }


    });


    $(document).ready(function () {
        //高亮删除
        var table = $('.data-table').DataTable();

        var clearObj;
        $('.data-table tbody').on('click', '.btn-danger', function () {
            clearObj = $(this).parent().parent('tr');
            return clearObj;
        });
        /*点击删除按钮传值*/
        var vul = '';
        $(document).on('click', '.tbodya > tr', function () {
            /*获取点击后的id值*/
            vul = $(this).children().eq(0).text()

        })


        /*确认删除*/
        $(document).on('click', '#remove', function () {
            // table.row(clearObj).remove().draw();
            /*点击确认删除,记下id值传送给后台*/

            var dataset = {
                "id": vul
            }
            $.ajax({
                type: "POST",
                url: '',
                data: dataset,
                success: function (data) {
                    /*成功后执行的函数*/
                    table.ajax.reload();
                    slide(data)

                }
            })
        });


        /*点击添加专业将部门信息加载上去*/
        var bumen = ''
        $(document).on('click', '#zhangjie', function () {
            $.ajax({
                url: "./section1.json",
                type: 'get',
                success: function (data) {
                    data.data.forEach(function (v, i) {
                        bumen += "<option value='" + v.id + "'>" + v.name + "</option>"
                    })
                    /*将章节信息加载上去*/
                    if (data.message) {
                        /*要是有数据的话*/
                        $('#kecheng').html(bumen)
                        bumen = ''
                    } else {
                        $('.modal-zhangjie').html("您没有相关的部门信息,专业不能添加...")
                    }
                }
            })
        })
        /*专业确认添加*/
        $('#major-addto').on('click', function () {
            if ($('.modal-zhangjie').text() === "您没有相关的部门信息,专业不能添加...") {
                return false
            } else {
                var vul1 = $('#kecheng1').val();
                var vul2 =  $('#kecheng2').val();
                var dataset = {
                    "id": $('#kecheng').val(),
                    "majorName": vul1,
                    "majorBz":vul2
                }
                if(vul1 === '' || vul2 === ''){
                    $('.warm-xinxi1').show();
                    return false
                }
                $.ajax({
                    url: '',
                    type: "post",
                    data: dataset,
                    success: function (data) {
                        $('#kecheng1').val("")
                        $('#kecheng2').val("")
                        slide(data.message)
                        $('.warm-xinxi1').hide();

                    }
                })
            }
        })


        /*岗位确认添加*/
        $('#station').on('click', function () {
            if ($('.modal-zhangjie').text() === "您没有相关的专业信息,岗位不能添加...") {
                return false
            } else {
                var val1 = $('#station1').val();
                var val2 = $('#station2').val();
                if($('#area select').eq(1).val() === ''){
                    $('.warm-xinxi2').show();
                    return false
                }
                if(val1 === '' || val2 === ''){
                    $('.warm-xinxi2').show();
                    return false
                }
                var dataset = {
                    "tid": $('#area select').eq(1).val(),
                    "stationName": val1,
                    "stationBz": val2
                }


                $.ajax({
                    url: '',
                    type: "POST",
                    data: JSON.stringify(dataset),
                    dataType:"json",
                    contentType:"application/json",
                    success: function (data) {
                        /*数据成功清空数据*/
                        $('#station1').val("")
                        $('#station2').val("")
                        $('.warm-xinxi2').hide();
                        slide(data.message)


                    }
                })
            }
        })

        /*点击确认修改*/
        $('#notarize').on('click', function () {
            var dataset = {
                "id": vul,
                "stationName": $('#name1').val(),
                "stationBz": $('#message-text1').val()
            }

            $.ajax({
                url: '',
                type: "POST",
                data: JSON.stringify(dataset),
                dataType:"json",
                contentType:"application/json",
                success: function (data) {
                    /*成功后执行的函数*/
                    table.ajax.reload();
                    slide(data.message)
                }
            })

        });

    });
});

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
