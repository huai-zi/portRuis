define(function (require, exports, module) {
//封装公共的方法

    var comm = (function () {
        function com(us) {
            if (this instanceof com) {
                //钩子函数
                this.select_but = $('#select-close');
                this.select_facility = $('#facility');
                this.select_curriculum = $('#curriculum');
            } else {
                return new com();
            }
        }

        //ajax请求传送值
        function ajaxPost(url, dataset, callback) {
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify(dataset),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {

                    if (data.type || data.type === 0) {
                        callback();
                        slide(data);
                    } else {
                        callback(data);
                    }
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


        /*异步上传form表单*/
        function ajaxForm(url, forms, callback) {
            var formData = new FormData($("#" + forms)[0]);
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

        //封装点击跳转页面
        function localHref(bq, local) {
            $(bq).click(function () {
                window.location.href = local;
            })
        }

        //监控图像改变填充图像地址
        function change(bq, gh) {
            $(bq).on('change', function () {
                var urls = com.prototype.getObjectURL(this.files[0]);
                $(gh).attr('src', urls);
            })
        }

        //获取图片地址
        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

        function datatables(url,callback) {
            var table = $('.data-table').DataTable({
                "ajax": {
                    'url': url,//'models.json'
                    "dataSrc": function (json) {
                        return json;
                    }
                },
                "columns": [
                    {"data": "id"},
                    {"data": "name"},
                    {
                        "data": "position"
                    },
                    {
                        "data": "remarks",
                        "render": function (data, type, full, set) {
                            return "2017-05-19 11:11"
                        }
                    },
                    {
                        "data": "remarks",
                        "render": function (data, type, full, set) {
                            /*返回的数据拼接*/
                            return "<button type='button' class='btn1 course_bj notazirez'>编辑</button><button type='button' class='btn1 course_remove removeShuju' data-toggle='modal' data-target='#lg-modal1'>删除</button>"
                        }
                    }
                ],

                "createdRow": function (row, data, index) {
                    /* 设置表格中的内容居中 */
                    $('td', row).attr("class", "text-left");
                    $('th', row).attr("class", "text-left");
                },
                ordering: true,
                "order": [[1, 'asc']],
                "columnDefs": [//指定heard栏手动排序按钮
                    {
                        "orderable": false, "targets": [2, 3, 4]
                    }
                ],
                "stateSave": true,
                iDisplayLength: 5,
                sProcessing: "正在获取数据，请稍后...",
                "retrieve": true,
                searchDelay: 350,
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
                    info: " _START_ - _END_ 条内容 共 _TOTAL_ 条内容", /*显示页面的数据条数*/
                    zeroRecords: "<strong>没有您要的内容，输点其它关键字试试！！</strong>",//table tbody内容为空时，tbody的内容。
                    //下面三者构成了总体的左下角的内容。
                    infoEmpty: "0条记录",//筛选为空时左下角的显示。
                    infoFiltered: ""//筛选之后的左下角筛选提示，

                },

                "fnDrawCallback": function () {
                    callback()
                    /*修改数*/
                    var aa3 = '';
                    var aa4 = '';
                    var aa1 = '';
                    $(document).on('click', '.notazirez', function () {
                        /*点击添加按钮*/
                        aa3 = $(this).parent().parent().children().eq(2).children('img').attr('src');
                        aa1 = $(this).parent().parent().children().eq(0).text();
                        window.aa1 = aa1;
                        aa4 = $(this).parent().parent().children().eq(4).text();
                        $('#name1').val($(this).parent().parent().children().eq(1).text());

                    });

                }

            });
        }

        com.prototype = {
            constructor: com,
            "ajaxPost": ajaxPost,
            "ajaxGet": ajaxGet,
            "modtal": modtal,
            "ajaxForm": ajaxForm,
            "localHref": localHref,
            "change": change,
            "getObjectURL": getObjectURL,
            "datatables": datatables
        }
        return com;
    })();

    module.exports = {
        "comm": comm
    }
})