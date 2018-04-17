$(function () {
    /*实例化datatables*/
    var table = $('.data-table').DataTable({
        "ajax": "./students.json",
        "columns": [
            {"data": "id"},
            {"data": "uid"},
            {"data": "name"},
            {"data": "position"},
            {"data": "extn"},
            {
                "data": "extn",
                "render": function (data, type, full, set) {
                    /*返回的数据拼接*/
                    if (data === "已发布") {
                        return "<button class='btn btn-wide btn-info1'>课程详情</button><button type='button' class='btn btn-wide btn-danger removeShuju' data-toggle='modal' data-target='#error-modal'>删除</button>"
                    } else {
                        return "<button class='btn btn-wide btn-info1'>课程编辑</button><button type='button' class='btn btn-wide btn-success' data-toggle='modal' data-target='#success-modal'>发布</button><button type='button' class='btn btn-wide btn-info notazirez' data-toggle='modal' data-target='#info-modal'>修改</button><button type='button' class='btn btn-wide btn-danger removeShuju' data-toggle='modal' data-target='#error-modal'>删除</button>"
                    }
                }
            }
        ],
        ordering: false,
        iDisplayLength: 5,
        sProcessing: "正在获取数据，请稍后...",
        "retrieve": true,
        "destroy": true,
        // bAutoWidth:true,
        "aLengthMenu":[
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
            $(document).on('click', '.tbodya > tr', function () {
                /*获取点击后的id值*/
                vul = $(this).children().eq(0).text()
            })
            $('#publish').on('click', function () {
                /*点击确认发布,重新获取一遍数据渲染页面*/

                var dataset = {
                    "id": vul
                }
                console.log(dataset);
                table.ajax.reload();

                $.ajax({
                    url: '',
                    type: "POST",
                    data: JSON.stringify(dataset),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        /*数据加载成功*/
                        slide(data)
                        table.ajax.reload();
                    }

                })
            });
        }


    });
    /*添加数据*/
    var fabu = '';
    $('#addTo').on('click', function () {
        var val1 = $('#name').val();
        var val2 = $('#message-text').val();
        if (val1 === '' || val2 === '') {
            $('.warm-xinxi').show();
            return false
        }
        var radios = $('.radio-inline1').children('input');
        for (var i = 0; i <= radios.length; i++) {
            if (radios.eq(i).prop('checked')) {
                /*判断数据的发布状态*/
                fabu = radios.eq(i).val();
            }
        }


        var dataset = {
            "kechengName": val1,
            "kechengBz": val2,
            "status": fabu
        }

        /*点击添加按钮*/
        $.ajax({
            url: '',
            type: "POST",
            data: JSON.stringify(dataset),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                /*成功后执行的函数*/
                table.ajax.reload();
                $('#name').val("")
                $('#message-text').val("")
                slide(data)
                $('.warm-xinxi').hide();

            }
        })
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
                url: '',
                type: "POST",
                data: JSON.stringify(dataset),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    /*成功后执行的函数*/
                    slide(data)

                    if (data.type === 0) {
                        table.ajax.reload();
                    }
                }
            })
        });

        //    点击确认发布


        /*章节确认添加*/
        $('#major-addto').on('click', function () {
            var val1 = $('#kecheng1').val();
            var val2 = '';
            /*获取章节状态*/
            var radios = $('.radio-inline2').children('input');
            for (var i = 0; i <= radios.length; i++) {
                if (radios.eq(i).prop('checked')) {
                    /*判断数据的发布状态*/
                    val2 = radios.eq(i).val();
                }
            }
            var dataset = {
                "id": $('#zjidz').val(),
                "majorName": val1,
                "majorBz": val2
            }

            if (val1 === '') {
                $('.warm-xinxi1').show();
                return false
            }


            $.ajax({
                url: '',
                type: "POST",
                data: JSON.stringify(dataset),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {

                    $('#kecheng1').val("")
                    slide(data)
                    $('.warm-xinxi1').hide();

                }
            })
            /*
             var aa = '';
             /!*传值成功在加载页面渲染上去*!/
             $.ajax({
             url: './index.json',
             dataType: 'JSON',
             type: 'get',
             success: function (data) {
             console.log(data);
             $('#zjidz').val(data.id)

             $('.modal-title1').text('课程:' + data.kecheng)
             data.neirong.forEach(function (v, i) {
             /!*渲染数据*!/
             console.log(i);
             var ace = "";
             var ace1 = "";
             if (data['neirong'][i]['extn'] === "未发布") {
             ace = "<button type='button' style='float:right;' class='btn btn-bb123' data-aaa='" + data['neirong'][i]['id'] + "'>发布 </button>";
             ace1 =  "<button type='button' style='margin-bottom:35px;' class='btn btn11' data-toggle='modal' data-target='#primary-modal'>查看当前页面详细试题 </button><button type='button' class='btn btn-mm ' style='margin-bottom:" +
             "35px;' data-toggle='modal' data-target='#sm-modal' data-value='"+v['id']+"'>添加对应题目</button><input type='hidden' value='" + v['id'] + "'>";
             } else {
             ace = "<b style='display:inline-block;float:right;font-weight:100;'>" + data['neirong'][i]['extn'] + "</b>";
             ace1 =  "<button type='button' style='margin-bottom:35px;' class='btn btn11' data-toggle='modal' data-target='#primary-modal'>查看当前页面详细试题 </button>";
             }

             $('#fBtns > li').eq(i).css('display','block')
             $('#fBtns > li').eq(i).children('a').html(data['neirong'][i]['name'] + ace)

             for (var g = 0; g < v['timu'].length; g++) {

             var xinxin = null;

             if (v['timu'][g]['star'] === 1) {
             xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2"  title="简单"></li><li rel="3" title="中等"></li><li rel="4"  title="困难"></li><li rel="5" title="很困难"></li></ul></div>';
             } else if (v['timu'][g]['star'] === 2) {
             xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2" class="on" title="简单"></li><li rel="3" title="中等"></li><li rel="4"  title="困难"></li><li rel="5" title="很困难"></li></ul></div>';

             } else if (v['timu'][g]['star'] === 3) {
             xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2" class="on" title="简单"></li><li rel="3" class="on" title="中等"></li><li rel="4"  title="困难"></li><li rel="5"  title="很困难"></li></ul></div>';

             } else if (v['timu'][g]['star'] === 4) {
             xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2" class="on" title="简单"></li><li rel="3" class="on" title="中等"></li><li rel="4" class="on" title="困难"><li rel="5"  title="很困难"></li></ul></div>';

             } else if (v['timu'][g]['star'] === 5) {
             xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on"  title="很简单"></li><li rel="2" class="on"  title="简单"></li><li rel="3" class="on"  title="中等"></li><li rel="4" class="on"  title="困难"></li><li rel="5"  class="on" title="很困难"></li></ul></div>';
             }

             var butt = '';
             butt = "<button type='button' class='btn btn-wide btn-info xiu-station' data-toggle='modal' >修改数据</button><button type='button' class=' btn btn-wide btn-danger remove-station' data-toggle='modal' data-target='#erroe-modal' aria-hidden='true' >删除</button>";

             aa += "<div>" + '<input disabled class="form-control" type=text name="' + v['timu'][g]['id'] + '" value="' + v['timu'][g]['name'] + '">' + xinxin + butt + "</div><input type='hidden' value='" + v['id'] + "'>";
             }

             aa = ace1 + aa;
             $('#fPics > a').eq(i).html(aa);
             aa = '';
             butt = '';
             })

             }

             })*/
        })

        /*考试课题确认添加*/
        $('#station').on('click', function () {
            /*将html添加在页面上*/

            for (var i = 0; i < $('#neirong .xianshi input').length; i++) {
                if ($('#neirong .xianshi input')[i].value === '') {
                    $('.warm-xinxi2').show()
                    return false
                }
            }
            /*清空多余的数据*/
            $('#neirong').html(' ')
            $('.warm-xinxi2').hide()

        })


        /*点击关闭形成空值*/
        $('#down-up').on('click', function () {
            $('#neirong').html(' ')

        })


        /*点击确认修改*/
        $('#notarize').on('click', function () {
            var dataset = {
                "id": vul,
                "stationName": $('#name1').val(),
                "stationBz": $('#message-text1').val()
            }
            $.ajax({
                url: '/course/insert',
                type: "POST",
                data: JSON.stringify(dataset),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    /*数据成功清空数据*/
                    $('#name1').val("")
                    $('#message-text1').val("")
                    /*重新刷新表格数据*/
                    table.ajax.reload();
                    slide(data)
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

