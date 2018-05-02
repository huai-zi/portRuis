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
                data: dataset,
                dataType: "json",
                // contentType: "application/json",
                success: function (data) {

                    if (data.type || data.type === 0) {
                        callback ? callback(data) : null;

                        com.prototype.slide(data);
                    } else {
                        callback ? callback(data) : null;

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
                timeout: 10000,
                success: function (data) {
                    callback ? callback(data) : null;

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("数据请求有误,请重新访问,或联系管理员")
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
                timeout: 10000,
                success: function (data) {
                    if (data.type || data.type === 0) {
                        callback ? callback(data) : null;

                        com.prototype.slide(data);
                    } else {
                        callback ? callback(data) : null;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("数据请求有误,请重新访问,或联系管理员")
                }
            });
        }

        //封装点击跳转页面
        function localHref(bq, local, callback) {
            //bq, local, callback---点击按钮类名或者id名\跳转路径\回掉函数
            $(bq).on('click', function () {
                callback ? callback() : null;
                window.location.href = local;
            })
        }

        //监控图像改变填充图像地址
        function change(bq, gh, callback) {
            //bq, gh----file标签改变id名\图片展示框id名
            $(bq).on('change', function () {
                var urls = com.prototype.getObjectURL(this.files[0]);
                $(gh).attr('src', urls);
                callback ? callback() : null;
            })
        }

        //监控改变图标进行数据处理
        function butChange(bq, callback) {
            //bq, gh----file标签改变id名\图片展示框id名
            $(bq).on('change', function () {
                callback ? callback() : null;
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

        function datatables(url, option, optionShow, callback) {
            //url, option, optionShow, callback---数据请求路径\数据加载处理\显示手动排序隐藏列\回掉函数

            var table = $('.data-table').DataTable({

                "ajax": {
                    'url': url,//'models.json'
                    "type": "get",
                    "dataSrc": function (json) {
                        return json;
                    }
                },
                "columns": option,
                "createdRow": function (row, data, index) {
                    /* 设置表格中的内容 */

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
                    //进行图片展示
                    var vul = '';
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

        function filesUpload(files, progress, fontShow, stop) {
            //files, progress, fontShow参数解析:上传按钮的id名\展示进度的样式条\进度数字化
            var h = {
                init: function (files, progress, fontShow) {
                    var me = this;
                    //上传改变出发函数input file标签
                    document.getElementById(files).onchange = me.fileHandler
                    //展示进度标签
                    me.progress = document.getElementById(progress);
                    me.loaded = 0;
                    //每次读取1M
                    me.step = 1024 * 1024;
                    me.times = 0;
                    stop = stop ? stop : null;
                    if (stop === 1) {
                        //学员身份下,进行的数据传输
                        document.getElementById('Abort').onclick = me.abortHandler;
                    }

                },
                fileHandler: function (e) {
                    var me = h;
                    me.loaded = 0;

                    var file = me.file = this.files[0];
                    var reader = me.reader = new FileReader();
                    //文件的大小
                    me.total = file.size;

                    //设置相关的回掉函数
                    reader.onloadstart = me.onLoadStart;//读取开始时触发
                    reader.onprogress = me.onProgress;//读取中
                    reader.onabort = me.onAbort;//中断时触发
                    reader.onerror = me.onerror;//出错时触发
                    reader.onload = me.onLoad;//文件读取成功时出发
                    reader.onloadend = me.onLoadEnd;//文件读取完成,不管成功失败时触发
                    //读取第一块,每次读取一次
                    me.readBlob(file, 0);
                    me.progress.style = "width:0%";
                },
                onLoadStart: function () {
                    var me = h;
                },
                onProgress: function (e) {
                    //读取过程中的数据e.loaded为每次上传的数据数量
                    var me = h;
                    me.loaded += e.loaded;
                    //e.loaded为加载当次数据文件大小,并且每加载完成一次,就调用一次读取文件成功函数Load,直到最后数据完全加载完全则和总数相同
                    //更新进度条
//                console.log(e);
                    //me,为读取完全整个文件的数据大小
                    //     console.log(me);
                    me.progress.style = "width:" + parseInt((me.loaded / me.total) * 100) + "%";

                    var values = (me.loaded / me.total) * 100;

                    if (values >= 100) {
                        $(fontShow).html("已上传完成");
                        $(fontShow).attr('title', "已上传完成");
                        me.progress.title = "已上传完成";
                    } else {
                        var tit = (me.loaded / me.total) * 100;
                        $(fontShow).html(parseInt(tit) + "%");
                        me.progress.title = tit;
                    }
                },
                onAbort: function () {
                    var me = h;

                },
                onError: function () {

                    var me = h;
                },
                onLoad: function () {
                    var me = h;

                    if (me.loaded < me.total) {
                        me.readBlob(me.loaded);
                    } else {
                        //设置文件大小
                        $(".progress1").hide();
                        me.loaded = me.total;
                    }
                },
                onLoadEnd: function () {
                    var me = h;

                },
                readBlob: function (start) {
                    var me = h;

                    var blob,
                        file = me.file;

                    blob = file.slice(start, start + me.step + 1);
                    //将文件读取为文本
                    me.reader.readAsText(blob);
                },
                abortHandler: function () {
                    var me = h;
                    if (me.reader) {
                        me.reader.abort();
                    }
                }
            };

            h.init(files, progress, fontShow);
        }

        //上传监控
        function changeFile(e, callback) {
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
                        delete v[key];
                        //将填写出的对象进行清除空格处理
                        key = $.trim(key);
                        v['"' + key + '"'] = bb;
                        v['"角色"'] = "学员"
                    }
                })
                callback ? callback(persons) : null;

                //persons为传入的数据值
                // excel.prototype.newForm(url, persons);
            };
            // 以二进制方式打开文件
            fileReader.readAsBinaryString(files[0]);
        };


        //正则匹配数据
        function regex(name, num, data) {
            var rage2 = '\\{(\\s)*\\"' + name + '\\"(\\s)*:(\\s)*';
            var rage1 = '[\\s\\S]+?\\}';
            var rage3 = num;
            var ww = rage2 + rage3 + rage1;
            var rage = new RegExp(ww);
            var datas = JSON.parse(JSON.stringify(data).match(rage)[0]);
            return datas

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
            "datatables": datatables,
            "filesUpload": filesUpload,
            "slide": slide,
            "changeFile": changeFile,
            "butChange": butChange,
            "regex": regex
        }
        return com;
    })();

    module.exports = {
        "comm": comm
    }
})