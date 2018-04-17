$(function () {
    /*实例化datatables*/
    var table = $('.data-table').DataTable({
        "ajax": "./students.json",
        "columns": [
            {"data": "id"},
            {"data": "uid"},
            {"data": "name"},
            {"data": "position"},
            {"data": "position"},
            {"data": "position"}
        ],
        "columnDefs": [{
            "targets": [3, 5],
            "visible": false
        }],
        ordering: false,
        iDisplayLength: 5,
        sProcessing: "正在获取数据，请稍后...",
        "retrieve": true,
        "destroy": true,
        "aLengthMenu": [5, 15, 20, "全部"], // 显示条数设置
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
        createdRow: function (row, data, index) {
            $(row).addClass('btn-info1');

        },
        "fnDrawCallback": function (oSettings) {
            $('.btn-info1').on('click', function () {
                console.log($(this).children().eq(0).text());


                var dataset = {
                    "id": $(this).children().eq(0).text()
                }
//            $.ajax({
//                url: '',
//                type: "POST",
//                data: JSON.stringify(dataset),
//                dataType: "json",
//                contentType: "application/json",
//                success: function (data) {
//                    slide(data);
//                    if (data.type === 0) {
//                        var aa = '';
//                        /*传值成功在加载页面渲染上去*/
//                        $.ajax({
//                            url: './index.json',
//                            dataType: 'JSON',
//                            type: 'get',
//                            success: function (data) {
//                                $('.modal-title1').text('课程:' + data.kecheng)
//                                data.neirong.forEach(function (v, i) {
//                                    /*渲染数据*/
//                                    $('#fBtns > li').eq(i).children('a').html(data['neirong'][i]['name'])
//                                    for (var g = 0; g < v['timu'].length; g++) {
//
//                                        var xinxin = null;
//
//                                        if (v['timu'][g]['star'] === 1) {
//                                            xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2"  title="简单"></li><li rel="3" title="中等"></li><li rel="4"  title="困难"></li><li rel="5" title="很困难"></li></ul></div>';
//                                        } else if (v['timu'][g]['star'] === 2) {
//                                            xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2" class="on" title="简单"></li><li rel="3" title="中等"></li><li rel="4"  title="困难"></li><li rel="5" title="很困难"></li></ul></div>';
//
//                                        } else if (v['timu'][g]['star'] === 3) {
//                                            xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2" class="on" title="简单"></li><li rel="3" class="on" title="中等"></li><li rel="4"  title="困难"></li><li rel="5"  title="很困难"></li></ul></div>';
//
//                                        } else if (v['timu'][g]['star'] === 4) {
//                                            xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on" title="很简单"></li><li rel="2" class="on" title="简单"></li><li rel="3" class="on" title="中等"></li><li rel="4" class="on" title="困难"><li rel="5"  title="很困难"></li></ul></div>';
//
//                                        } else if (v['timu'][g]['star'] === 5) {
//                                            xinxin = '<div class="starts"><ul class="pingStar"><li rel="1" class="on"  title="很简单"></li><li rel="2" class="on"  title="简单"></li><li rel="3" class="on"  title="中等"></li><li rel="4" class="on"  title="困难"></li><li rel="5"  class="on" title="很困难"></li></ul></div>';
//                                        }
//
//                                        var butt = "<button type='button' class='btn btn11' data-toggle='modal' data-target='#primary-modal'>相关试题</button>";
//
//                                        aa += "<div>" + '<span  name="' + v['timu'][g]['id'] + '">'+v['timu'][g]['name']+'</span>' + xinxin + butt + "</div>";
//
//                                    }
//
//                                    $('#fPics > a').eq(i).html(aa);
//                                    aa = ''
//                                })
//
//                                /*清除多余的html*/
//                                $('#fBtns > li').each(function (i, v) {
//                                    if ($(v).find('a').text() === '') {
//                                        $(this).css('display', 'none')
//                                    }
//                                })
//
//                                /*相关考题*/
//                                $('.btn11').click(function () {
//                                    var dataset = {
//                                        "id": $(this).parent().children('span').eq(0).attr('name')
//                                    }
//
//                                    /*点击相关考题出现的考试题目*/
//                                    obj.ajaxL("./zhangjie4.json");
//
//                                    $.ajax({
//                                        /*搜索考题*/
//                                        url: '',
//                                        type: "POST",
//                                        data: JSON.stringify(dataset),
//                                        dataType: "json",
//                                        contentType: "application/json",
//                                        success: function (data) {
//                                            slide(data)
//                                            /*请求成功*/
//                                            if (data.type === 0) {
//                                                obj.ajaxL("./zhangjie4.json");
//                                            }
//                                        }
//                                    })
//                                })
//
//                            }
//
//                        })
//                    }
//                }
//            })

                var aa = '';
                /*传值成功在加载页面渲染上去*/
                $.ajax({
                    url: './index.json',
                    dataType: 'JSON',
                    type: 'get',
                    success: function (data) {
                        $('.modal-title1').text('课程:' + data.kecheng)
                        data.neirong.forEach(function (v, i) {
                            /*渲染数据*/
                            $('#fBtns > li').eq(i).children('a').html(data['neirong'][i]['name'])
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


                                aa += "<div>" + '<span  name="' + v['timu'][g]['id'] + '">' + v['timu'][g]['name'] + '</span>' + xinxin  + "</div><input type='hidden' value='"+v['id']+"'>";

                            }
                            aa += '<button style="margin-top:35px;" type="button" class="btn btn11" data-toggle="modal" data-target="#primary-modal">查看当前页面详细试题</button>'
                            $('#fPics > a').eq(i).html(aa);
                            aa = ''

                        })

                        /*清除多余的html*/
                        $('#fBtns > li').each(function (i, v) {
                            if ($(v).find('a').text() === '') {
                                $(this).css('display', 'none')
                            }
                        })

                        /*相关考题*/
                        $('.btn11').click(function () {
                            var dataset = {
                                "id": $(this).prev("input[type='hidden']").val()
                            }


                            /*点击相关考题出现的考试题目*/
                            obj.ajaxL("./zhangjie4.json");

                            $.ajax({
                                /*搜索考题*/
                                url: '',
                                type: "POST",
                                data: JSON.stringify(dataset),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (data) {
                                    slide(data)
                                    /*请求成功*/
                                    if (data.type === 0) {
                                        obj.ajaxL("./zhangjie4.json");
                                    }
                                }
                            })
                        })

                    }

                })
            })
        }

    });

});

