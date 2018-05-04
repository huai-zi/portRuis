$(function () {
    var mo = new models();
    //题目展示的接口
    var aa4 = JSON.parse(localStorage.getItem('lookGrade'));
    var dataset = {
        "id": aa4.courseId
    }
    mo.ajaxPost('/questions/readByName', dataset, function (data) {

        console.log(data);
        template.config("escape", false);
        /*判断题目类型*/
        template.helper('ttm', function (ra) {
            if (ra === 0) {
                return '单选题';
            } else if (ra === 1) {
                return '操作题';
            } else if (ra === 2) {
                return '问答题';
            }
        })


        /*学员回答处理*/
        template.helper('student', function (ra, pa) {
            if (ra.length === 0) {
                return false
            } else {
                if (pa === 0) {
                    //单选题进行判断
                    var nums = ra[0];
                    return nums;
                } else {
                    var str = '';
                    $(ra).each(function (i, v) {
                        str += "第{{" +
                            (i + 1) + "}}步：" + v;
                    })
                    return str;
                }
            }
        })

        /*操作题步骤*/
        template.helper('step', function (ra) {
            if (ra.length === 0) {
                return false
            } else {
                var str = '';
                $(ra).each(function (i, v) {
                    str += (i + 1) + "、" + v;
                })
                return str;
            }
        })

        /*判断选择题答案以及选中展示*/
        template.helper('radiosa', function (ra, zq) {
            var zm = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
            var htm = "";

            $(ra).each(function (ii, vv) {
                $(zm).each(function (i, v) {
                    if (ii === i) {
                        if (zq === v) {
                            htm += ' <div class="col-xs-2 text-right">'
                                + ' </div>'
                                + ' <div class="col-xs-10">'
                                + ' <label>'
                                + ' <input type="radio" disabled="true" checked> ' + v + ' . ' + vv
                                + ' </label>'
                                + '</div>';
                        } else {
                            htm += ' <div class="col-xs-2 text-right">'
                                + ' </div>'
                                + ' <div class="col-xs-10">'
                                + ' <label>'
                                + ' <input type="radio" disabled="true"> ' + v + ' . ' + vv
                                + ' </label>'
                                + '</div>';
                        }
                    }
                })
            });

            return htm;
        })
        var paperss = document.getElementById('subject-main');
        var html = template('papers', data);
        paperss.innerHTML = html;

        /*加载底部答题卡*/
        var num = document.getElementById('answer-sheet-num');
        var html = template('but', data);
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
