$(function () {
    /*区分是培训试题还是考试试题*/
    var dataser = JSON.parse(localStorage.getItem('kpapers'));
    var urll = '';
    var dataset = '';
    // if (dataser.kid === 0) {
    //     /*模拟试题*/
    //     urll = 'papers.json';
    //      dataset = {
    //         'id': dataser.id,
    //          'testPaperId':0
    //     }
    //     $('#tid').remove();
    //     $('#cid').val(dataser.id);
    //
    // } else if (dataser.kid === 1) {
    //     /*考试题*/
    //     urll = 'papers.json';
    //      dataset = {
    //         'id': dataser.id,
    //          'testPaperId':1
    //     }
    //     $('#cid').remove();
    //     $('#tid').val(dataser.id);
    //     /*将查看答案按钮进行隐藏*/
    //     $('.ck-answer').remove();
    // }
    // $('.tit').text(dataser.title);
    /*点击收起答题卡*/
    var faDown = 'fa-chevron-down';
    var faUp = 'fa-chevron-up';
    var fa = 1;
    $('.card-unfold').click(function () {
        if (fa % 2 !== 0) {
            $(this).children('span').text('展开答题卡');
            $(this).children('i').removeClass(faDown);
            $(this).children('i').addClass(faUp);
            $('.answer-sheet-num').slideUp()

        } else {
            $(this).children('span').text('收起答题卡');
            $(this).children('i').removeClass(faUp);
            $(this).children('i').addClass(faDown);
            $('.answer-sheet-num').slideDown()

        }
        fa++;
    })
    /*考题加载*/
    var urll = 'papers.json';

    $.ajax({
        url: urll,
        // data: JSON.stringify(dataset),
        type: "get",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            localStorage.setItem('aceeee', JSON.stringify(data));
            /*隐藏没有显示的内容*/
            template.helper('show', function (ra) {
                if (ra === 'ohMyGod' || ra === undefined) {
                    return 'display:none;'
                }
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
            /*点击进行样式加载*/
            /*点击进行样式加载,多选题的样式判断*/
            for (var i = 0; i < $('.subject-content .checkbox.subject-options').length; i++) {
                $('.subject-content .checkbox.subject-options').get(i).onclick = function () {
                    if ($(this).get(0).className.indexOf('active') === -1) {
                        $(this).addClass('active');
                        $(this).children('input').prop('checked', true);
                        return false

                    } else {
                        $(this).removeClass('active');
                        $(this).children('input').prop('checked', false);

                        return false

                    }

                }
            }

            $('.subject-content .radio').each(function (i, v) {
                $(v).click(function () {
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                });
            })

            /*答题卡点击样式*/
            $('.answer-sheet-box li').each(function (i, v) {
                $(v).click(function () {
                    /*监控出题目答题情况*/
                    ca();
                    $(this).children('a').addClass('answering-num');
                    $(this).siblings().children('a').removeClass('answering-num');
                    /*判断下一题按钮*/
                    if (+$(this).children().attr('data-id') !== ($('.answer-sheet-box li').length - 1)) {
                        $('#next').show()
                    } else {
                        $('#next').hide()

                    }
                })
            });
            $('#answer-sheet-num li').eq(0).addClass('active')
            $('#answer-sheet-num li').eq(0).children('a').addClass('answering-num');
            $('#subject-main .subject-content').eq(0).addClass('active');
        }
    })


    /*点击下一题*/
    $('#next').click(function () {
        var that = $(this);
        $('.answer-sheet-box li').each(function (i, v) {
            if ($(v).children('a').attr('class').indexOf('answering-num') !== -1) {
                // if (i === ($('.answer-sheet-box li').length - 2)) {
                //     that.hide()
                // }
                $('#answer-sheet-num li').eq(i + 1).children().click();
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
            };
        })
        $('#answer-sheet-num li a').each(function (i, v) {
            if ($(v).attr('class').indexOf('font') !== -1) {
                num++;
                /*要是在最后一个数据中点击了,但是没有加载按钮*/
                if (( num === (+length - 1) && bj === 1 ) || num === length) {
                    $('#dsubmit').click();

                    $('#primary-modall2').css('display', 'none');
                    $('#primary-modall2').removeClasss('in');
                    return false
                } else {
                    $('#primary-modall2').css('display', 'block');
                    $('#primary-modall2').addClass('in');
                }

            } else if (bj === 1) {
                $('#dsubmit').click();
                return false
            } else{
                $('#primary-modall2').css('display', 'block');
                $('#primary-modall2').addClass('in');
                return false
            }
        })

    })
    /*取消*/
    $('#btn-success1n2').click(function () {

        $('#primary-modall2').css('display', 'none');
        $('#primary-modall2').removeClass('in')
    })
    /*确认提交*/
    $('#btn-success1l2').click(function () {
        $('#primary-modall2').css('display', 'none');
        $('#primary-modall2').removeClass('in');
        $('#dsubmit').click();

    })


});
function ca() {
    $('.subject-content.active .subject-options').each(function (i, v) {
        /*对题目进行监控,并添加数据*/
        if ($(v).children('input').prop('checked')) {
            var eq = $(v).children('input').attr('data-inid')
            $('#answer-sheet-num li').eq(eq).children().addClass('font');
            return false
        } else {
 var eq = $(v).children('input').attr('data-inid')
            $('#answer-sheet-num li').eq(eq).children().removeClass('font');
        }
    })
}