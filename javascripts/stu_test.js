$(function () {
    var modealz = new models();
    var urll = 'papers.json';
    var aa4 = JSON.parse(localStorage.getItem("stuOnlie"));
    var dataset = {
        "id": aa4.courseId
    }
    modealz.ajaxPost('/questions/readByName', dataset, function (data) {

        if (data.length === 0) {
            $('#closeLocal').show();
            $(".subject-actions").hide();
            return false
        }
        $(data).each(function (i, v) {
            if (v.type === 1) {
                $("#aheadFinish").show();
                $("#aheadFinish1").hide();
            }
        })
        data = {
            "shiti": data
        }
        var peTest = data[0].test;

        template.config('escape', false)
        /*隐藏没有显示的内容*/
        template.helper('show', function (ra) {
            if (ra === 'ohMyGod' || ra === undefined) {
                return 'display:none;'
            }
        })

        /*判断选择题答案以及选中展示*/
        template.helper('radiosa', function (ra, kid) {
            var zm = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
            var htm = "";
            $(ra).each(function (ii, vv) {
                $(zm).each(function (i, v) {

                    if (ii === i) {
                        htm += '<label class="radio subject-options">' +
                            '<input type = "radio"' +
                            ' id = "papers_laber0' + kid * 139 + '" ' +
                            ' name = "radios' + kid + '"' + ' value = "' + v + '"'
                            + 'data-inid="' + kid + '">'
                            + v + '、' + vv
                            + '</label>';
                    }
                })
            });

            return htm;
        })

        /*判断题目类型*/
        template.helper('ttm', function (ra) {
            if (ra === 0) {
                return '单选题'
            } else if (ra === 1) {
                return '判断题'
            } else if (ra === 2) {
                return '多选题'
            }
        })
        var paperss = document.getElementById('subject-main');
        var html = template('papers', data);
        paperss.innerHTML = html;

        /*加载底部答题卡*/
        var num = document.getElementById('answer-sheet-num');
        var html = template('but', data);
        num.innerHTML = html;

        //进入模型题
        $(document).on('click', "#buttons", function () {

            var radiosA = $("#formw").serializeArray();
            if (radiosA.length === data.shiti.length) {
                var dataset = {
                    "id": aa4.id,
                    "answer": radiosA
                }
                modealz.ajaxPost("/paper/answer", dataset, function (datas) {
                    if (datas.type === 0) {
                        var sss = {
                            "type":1,
                            "id":aa4.id
                        }
                        localStorage.setItem('test_stu_moni',JSON.stringify(sss));

                        window.location.href = "test_peinsder.html" + '#' + peTest;//pe插件路径
                    } else {
                        $("#info-modal1").modal();

                    }
                });

            } else {
                $("#error-modal2").modal();
                return false
            }

        });
        //直接提交试卷
        $(document).on('click', "#buttons1", function () {

            var radiosA = $("#formw").serializeArray();
            if (radiosA.length === data.shiti.length) {
                var dataset = {
                    "id": aa4.id,
                    "answer": radiosA
                }
                modealz.ajaxPost("/paper/answer", dataset, function (data) {
                    window.location.href = "stu_student.html"
                });

            } else {
                $("#error-modal2").modal();
                return false
            }


        });

        $(".answer-sheet-box li")[0].classList.add("active");
        $("#subject-main div")[0].classList.add("active");
        $('#answer-sheet-num li').eq(0).children('a').addClass('answering-num');

        /*答题卡点击样式*/
        $('.answer-sheet-box li').each(function (i, v) {
            var b = "";
            $(v).click(function () {
                //当前获取的input按钮
                var that = $(this);
                $('.tab-pane.active .subject-options').each(function (i, v) {
                    /*对题目进行监控,并添加数据*/

                    if ($(v).children('input').prop('checked')) {
                        var eq = $(v).children('input').attr('data-inid')
                        $('#answer-sheet-num li').eq(eq).children().addClass('font');
                        that.children('a').addClass('answering-num');
                        that.siblings().children('a').removeClass('answering-num');
                        b = 1;
                        return false
                    } else {
                        b = "";
                    }
                });

                //证明此次有选中
                if (b === 1) {

                } else if (b === "") {
                    //证明一次都没有选中
                    $("#error-modal2").modal();
                    return false
                }
                /*判断下一题按钮*/
                if (+$(this).children().attr('data-id') === ($('.answer-sheet-box li').length - 1)) {
                    $('#next').hide();
                    $('#prevs').show();
                } else if (+$(this).children().attr('data-id') === 0) {
                    $('#prevs').hide();
                    $('#next').show();
                } else {
                    $('#next').show();
                    $('#prevs').show();
                }

            })
        });
    })


    /*点击下一题*/
    $('#next').click(function () {
        var that = $(this);
        $('.answer-sheet-box li').each(function (i, v) {

            if ($(v).children('a').attr('class').indexOf('answering-num') !== -1) {
                if (i !== 0) {
                    $('#prevs').show();
                }
                $('#answer-sheet-num li').eq(i + 1).children().click();
                return false
            }
        })
    })

    /*点击上一题*/
    $('#prevs').click(function () {
        var that = $(this);
        $('.answer-sheet-box li').each(function (i, v) {
            if ($(v).children('a').attr('class').indexOf('answering-num') !== -1) {
                var b = "";
                $('#collapseOne2 .subject-options').each(function (ii, v) {
                    /*对题目进行监控,并添加数据*/
                    if ($(v).children('input').prop('checked')) {
                        var eq = $(v).children('input').attr('data-inid')
                        $('#answer-sheet-num li').eq(eq).children().addClass('font');
                        that.children('a').addClass('answering-num');
                        that.siblings().children('a').removeClass('answering-num');
                        b = 1;
                        return false
                    } else {
                        b = "";
                    }
                });
                if (b === 1) {
                    that.hide();
                } else {
                    that.show();
                }

                if (i - 1 === 0) {
                    $('#next').show();
                    $('#answer-sheet-num li').eq(i - 1).children().click();
                } else {
                    that.show();
                    $('#next').hide();
                    $('#answer-sheet-num li').eq(i - 1).children().click();
                }
                return false
            }
        })
    })


    /*提交试卷*/
    $('#aheadFinish').click(function () {
        /*记录下点击事件的次数,证明答题数量*/
        var num = 0;
        var bj = 0;
        var length = $('#answer-sheet-num li a').length;
        var us = '#collapseOne' + (+length - 1) + ' .subject-options';
        /*区分最后一段流程中有没有数据点击*/
        $(us).each(function (i, v) {
            if ($(v).children('input').prop('checked')) {
                bj = 1;
            }

        })

    })

});
