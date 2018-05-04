var models = (function () {
    function model() {
        if (this instanceof model) {

        } else {
            return new model();
        }
    }

    //获取值
    function ajaxGet(url, callback) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            timeout: 10000,
            success: function (data) {
                callback ? callback(data) : null;

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("数据请求有误,请重新访问,或联系管理员")
            }
        })
    }

    //向后台传值
    function ajaxform(url, dataset, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: dataset,
            dataType: "json",
            timeout: 10000,
            // contentType: "application/json",
            success: function (data) {
                if (data.type || data.type === 0) {
                    callback ? callback(data) : null;
                    model.prototype.slide(data);
                } else {
                    callback ? callback(data) : null;

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("数据请求有误,请重新访问,或联系管理员")
            }
        })
    }

    /*js检查是否全部输入*/
    function selectJc(namee, wrong, callback) {
        /*form表单*/
        var model = document[namee];
        /*设备名称*/
        var modelName = model.modelName.value;
        /*设备图片*/
        var modelImg = model.modelImg.value;
        if (modelName === "") {
            $('.' + wrong).show();
            return false
        } else {
            $('.' + wrong).hide();
            callback ? callback() : null;
            return true
        }
    }

    //传递图片信息
    function numcs(url, forms, cid, callback) {
        var formData = new FormData($("#" + forms)[0]);
        if (typeof(cid) === "number") {
            formData.append("id", cid);

        } else if (cid !== "") {
            var tid = document.forms.cid.value;
            formData.append("id", tid);
        }

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 10000,
            success: function (data) {
                if (data.type || data.type === 0) {
                    callback ? callback(data) : null;

                    model.prototype.slide(data);
                } else {
                    callback ? callback(data) : null;

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("数据请求有误,请重新访问,或联系管理员")
            }
        });
    }

    function localUp(data, callback) {
        //需要在已经配置上的表格中进行数据替换
        var table = $('.data-table').dataTable();
        var oSettings = table.fnSettings(); //这里获取表格的配置
        table.fnClearTable(this); //动态刷新关键部分语句，先清空数据
        for (var i = 0, l = data.length; i < l; i++) {
            table.oApi._fnAddData(oSettings, data[i]); //这里添加一行数据
        }
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        table.fnDraw();//绘制表格
        callback ? callback(data) : null;

    }

    //将模态框设置点击空白处不取消地址
    function modtal(dataa) {
        $(dataa).each(function (i, v) {
            $("#" + v).css('backgroundColor', 'rgba(0,0,0,.7)');
            $("#" + v).modal({
                keyboard: false,
                backdrop: false,
                show: false
            });
        })
    }

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
    function tablesAjax(callback) {
        var table = $('.data-table').DataTable();
        table.ajax.reload();
        callback ? callback() : null;

        return table;
    }

    //添加备选项
    function createHtml(text, tx) {
        var zm = ''
        if (tx === 0) {
            zm = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
        } else if (tx === 1) {
            zm = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
        }
        var html = "";
        var radios = "";
        $(text).each(function (i, v) {
            //选项内容
            html +=
                "<label>" +
                "<input type='checkbox' name='answer' value='" +
                v + "'> " +
                zm[i] + '、' + v +
                "</label>" + "<br>";
            //正确答案
            radios +=
                "<label>" +
                "<input type='radio' name='right' data-en='" + zm[i] +
                "' value='" +
                v + "'> " +
                zm[i] +
                "</label>" + "<br>";
        })

        return {
            "html": html,
            "radios": radios
        };
    }

    function datatables(url, option, optionShow, callback) {
        //url, option, optionShow, callback---数据请求路径\数据加载处理\显示手动排序隐藏列\回掉函数

        var table = $('.data-table').DataTable({

            "data": url,
            "columns": option,
            "createdRow": function (row, data, index) {
                /* 设置表格中的内容居中 */
                $('td', row).attr("class", "text-left");
                $('th', row).attr("class", "text-left");
            },
            ordering: true,
            "order": [[1, 'asc']],
            "columnDefs": [//指定heard栏手动排序按钮
                {
                    "orderable": false, "targets": optionShow//[2, 3, 4]
                },
                {
                    //设置第一列不参与搜索
                    "targets": [0],
                    "searchable": false
                }
            ],
            "stateSave": true,
            iDisplayLength: 10,
            sProcessing: "正在获取数据，请稍后...",
            "retrieve": true,
            searchDelay: 350,
            "destroy": true,

            // bAutoWidth:true,
            "aLengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "全部"]
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

            "fnDrawCallback": function (data) {
                //加载完参数进行回掉函数操作
                callback ? callback(data) : null;
                $(document).on('click', '.tbodya > tr td img', function () {
                    /*获取点击后的id值*/
                    vul = $(this).children().eq(0).text();
                    var stcImg = $(this).attr('src');
                    $('.big_da').css("display", "flex");
                    $('.big_da > img').attr('src', stcImg);
                });
            }

        });
    }

    //删除数组某一项
    function removeArray(arr, item) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != item) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    function sorts(data, callback) {
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 1; j < data.length; j++) {
                if (i != j) {
                    if (data[i].id == data[j].id && data[i].id == data[j].id) {
                        data.splice(j, 1)
                    }
                }

            }
        }
        callback ? callback(data) : null;

    }

    //选中样式
    function selected(id, canshu) {
        $(id).children().each(function (i, v) {
            if ($(v).val().indexOf(canshu) !== -1) {
                $(v).prop('selected', true);
                return false
            }
        })
    }

    model.prototype = {
        constructor: model,
        "slide": slide,
        "ajaxform": ajaxform,
        "selectJc": selectJc,
        "modtal": modtal,
        "numcs": numcs,
        "tables": tablesAjax,
        "getObjectURL": getObjectURL,
        "createHtml": createHtml,
        "removeArray": removeArray,
        "datatables": datatables,
        "ajaxGet": ajaxGet,
        "localUp": localUp,
        "sorts": sorts,
        "selected": selected
    };
    return model;
})();

var mo = new models();
var modalss = ['lg-modal1', 'info-modal', 'error-modal', 'error-modal2'];
mo.modtal(modalss);
function loginas() {
    var logins = JSON.parse(localStorage.getItem("login"));
    $(".usname_local").text("你好," + logins.name);
}