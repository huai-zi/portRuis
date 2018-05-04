$(function () {
    var mo = new models();

    var datass = [];

    var aa4 = JSON.parse(localStorage.getItem('lookGrade'));
    var dataset = {
        "id": aa4.courseId
    }
    mo.ajaxPost('/questions/readByName', dataset, function (data) {

        console.log(data);
        var a = 0;
        var b = 0;
        template.config("escape", false);
        /*判断题目类型*/
        template.helper('ttm', function (ra) {
            if (ra === 0) {
                return '单选题'
            } else if (ra === 1) {
                return '操作题'
            } else if (ra === 2) {
                return '问答题  (每题10分) <b class="pull-rights ">未评分</b>'
            }
        })

        $(data).each(function (i, v) {
            //判断是否拥有问答题类型,并进行筛选加载
            if (v.type === 2) {
                datass.push(v);
                a = 1;

            } else {
                b = 1;
            }
        });
        //只显示问答题

        datass = {
            "shiti": datass
        }
        if (a == 1) {

            if (datass.shiti.length === 1) {
                $(".subject-action").hide();
            } else {
                $(".subject-action").show();

            }
            var paperss = document.getElementById('subject-main');
            var html = template('papers', datass);
            paperss.innerHTML = html;

            /*加载左侧答题卡*/
            var num = document.getElementById('answer-sheet-num');
            var html = template('but', datass);
            num.innerHTML = html;


            $(".answer-sheet-box li")[0].classList.add("active");
            $("#subject-main div")[0].classList.add("active");
            $('#answer-sheet-num li').eq(0).children('a').addClass('answering-num');

            $('.answer-sheet-box li').each(function (i, v) {
                $(v).click(function () {
                    /*监控出题目答题情况*/
                    $(this).children('a').addClass('answering-num');
                    $(this).siblings().children('a').removeClass('answering-num');
                    /*判断下一题按钮*/
                    if (+$(this).children().attr('data-id') === ($('.answer-sheet-box li').length - 1)) {
                        $('#next').hide();
                        $('#prevs').css("display", "inline-block");
                    } else if (+$(this).children().attr('data-id') === 0) {
                        $('#prevs').hide();
                        $('#next').show();
                    } else {
                        $('#next').show();
                        $('#prevs').css("display", "inline-block");
                    }
                })
            });

        } else {
            $(".error-span1").show();
            $(".error-span2").hide();
            $("#buttons").hide();
            $('#error-modal').modal();

        }
        //进行数据的提交
        $("#buttons").on('click', function () {
            //获取传出的数据
            var dataset = "";
            if (a == 1) {
                var valus = [];
                var ace = 0;
                $(".numFen").each(function (i, v) {
                    valus.push($(v).val());
                    if ($(v).val() === "") {
                        ace = 1;
                    }
                })
                if (ace === 1) {
                    $("#error-modal2").modal();
                    return false
                } else {
                    dataset = {
                        "id": $("#hidden_id").val(),/*试卷id*/
                        "answer": []
                    };
                }

            } else {
                dataset = {
                    "id": $("#hidden_id").val(),
                };
            }

            var mo = new models();
            mo.ajaxPost("/paper/answer", dataset, function (data) {
                if (data.type === 0) {
                    //关闭当前页面
                    window.location.href = "tea_score.html";
                }
            })
        });
    })


    $('#next').click(function () {
        var that = $(this);
        $('.answer-sheet-box li').each(function (i, v) {
            if ($(v).children('a').attr('class').indexOf('answering-num') !== -1) {
                $('#prevs').css("display", "inline-block");

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


});
