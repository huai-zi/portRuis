window.onload = function () {
    function stop() {
        return false;
    }

    /*封装函数iframe*/
    function iframes(url) {
        var iframe = "<iframe frameborder=0 width='100%'  height='100%'  src=" + url + "></iframe>";
        return iframe
    }
    var serch = window.location.hash;

    /*进入页面的判断事件*/
    if (serch === '#zhangjie') {
        cla('#zhangjie', '#zhangjie', './zhangjie.html')
    } else if (serch === '#kaoti') {
        cla('#zhangjie1', '#zhangjie1', './kaoti.html')
    } else if (serch === '#chart') {
        cla('#chart', '#chart', './charts_chart-js.html')
    } else if (serch === '#tables') {
        cla('#tables', '#tables', './uploading.html')
    } else if (serch === '#pages') {
        cla('#pages', '#pages', './pages_faq.html')
    } else if (serch === '#stu') {
        cla('#stu', '#stu', './students.html')
    } else if (serch === '#user') {
        cla('#user', '#user', './pages_user-profile.html')
    } else if (serch === '#section') {
        cla('#section', '#section', './section.html')
    } else if (serch === '#agess') {
        cla('#agess', '#agess', './index-ages.html')

    }
    /*var ccc = '<div class="leftside-content-header"><canvas id="universe"></canvas><ul class="breadcrumbs"><li><i class="fa fa-home" aria-hidden="true"></i><a href="#">首页</a></li></ul><div class="banner-img "><span></span></div><div class="banner-img "><b></b></div></div>';

     $('.content-header1').html(ccc)
     $('.banner-img span').animate({'width':"293px","animation":"rotates  1s linear 0s 1 forwards"},1000)
     var aa = setTimeout(function(){
     $('.banner-img b').animate({'width':"584px"},1000)
     clearTimeout(aa)
     },800)*/

    /*首页*/
    $('#agess').on('click', function () {
        $(this).parent().addClass('active-item')
        $(this).parent().siblings('li').removeClass('active-item')
        cla('#agess', '#agess', './index-ages.html')

    })
    /*题库管理*/
    $('#zhangjie').on('click', function () {
        cla('#zhangjie', '#zhangjie', './zhangjie.html')
    })
    $('#zhangjie1').on('click', function () {
        cla('#zhangjie1', '#zhangjie1', './kaoti.html')
    })
    /*学员时间*/
    $('#chart').on('click', function () {
        cla('#chart', '#chart', './charts_chart-js.html')
    })
    /*用户信息*/
    $('#tables').on('click', function () {
        cla('#tables', '#tables', './uploading.html')
    })


    /*系统信息*/
    $('#pages').on('click', function () {
        cla('#pages', '#pages', './pages_faq.html')
    })
    /*网络培训课程*/
    $('#stu').on('click', function () {
        cla('#stu', '#stu', './students.html')
    })
    /*部门管理*/
    $('#section').on('click', function () {
        cla('#section', '#section', './section.html')
    })

    /*个人用户信息页面*/
    $('#user').on('click', function () {
        cla('#user', '#user', './pages_user-profile.html')
    })
    $('#user1').on('click', function () {
        cla('#user', '#user', './pages_user-profile.html')
    })

    /*封装成点击获取函数*/
    function cla(me, hash, url) {
        $(me).parent().addClass('active-item')
        $(me).parent().siblings('li').removeClass('active-item')
        $(me).parent().parent().parent().addClass('has-child-item open-item active-item')
        $(me).parent().parent().parent().siblings().addClass('has-child-item close-item')
        $(me).parent().parent().parent().siblings().removeClass('active-item')
        $(me).parent().parent().parent().siblings().find('li').removeClass('active-item')
        serch = hash
        console.log(iframes());

        if (serch === hash) {
            $('.content-header1').html(iframes(url))
            serch = ''
        }
    }

}