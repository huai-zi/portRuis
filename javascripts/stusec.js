$(function () {
    /*添加单选题*/
    $('#radios').on('click', function () {
        if($('#neirong').html().indexOf('input') !== -1){
            alert('亲，题目只能一题一题添加哦！')

            return false
        }
        var aa = ' <div class="xianshi">' +
            '<h3 class="control-label">单选题</h3>' +
            '<p class="control-label">请输入要添加的题目:</p>' +
            '<input type="text" class="form-control" onkeyup=' + 'this.setAttribute("value",this.value)' + '  name="radios'  + '"' +
            '>' +
            '<p class="control-label">请输入答案选项内容:</p>' +
            '<p class="control-label">A:<input type="text" onkeyup=' + 'this.setAttribute("value",this.value)' + '  name="answer1'  + '" class=""></p>' +
            '<p class="control-label">B:<input type="text" onkeyup=' + 'this.setAttribute("value",this.value)' + '  name="answer2'  + '" class=""></p>' +
            '<p class="control-label">C:<input type="text"  onkeyup=' + 'this.setAttribute("value",this.value)' + '  name="answer3'  + '" class=""></p>' +
            '<p class="control-label">D:<input type="text" onkeyup=' + 'this.setAttribute("value",this.value)' + '  name="answer4'  + '" class=""></p>' +
            '<p><span style="margin-right:20px;">正确答案:</span><label class="radio-inline"><input type="radio" name="answer" id="radios1" value="A" >A</label><label class="radio-inline"><input type="radio" name="answer" id="radios2" value="B"> B</label><label class="radio-inline"><input type="radio" name="answer" id="radios3" value="C"> C</label><label class="radio-inline"><input type="radio" name="answer" id="radios4" value="D">D</label></p>' +
            '<p class="control-label"><span>本题知识点:</span></p><textarea type="text"  onkeyup=' + 'this.setAttribute("value",this.value)' + '   class="form-control" name="explain'  + '"></textarea></div>';
        $('#neirong').append(aa);

        return false
    })
    /*判读判断题*/
    $('#qus').on('click', function () {

        if($('#neirong').html().indexOf('input') !== -1){
            alert('亲，题目只能一题一题添加哦！')
            return false
        }
        var aa = ' <div class="xianshi">' +
            '<h3 class="control-label">判断题</h3>' +
            '<p class="control-label">请输入要添加的题目:</p>' +
            '<input type="text" onkeyup=' + 'this.setAttribute("value",this.value)' + ' class="form-control"' +
            'id="password">' +
            '<p class="control-label">请输入答案选项内容:</p>' +
            '<p class="control-label">正确:<input onkeyup=' + 'this.setAttribute("value",this.value)' + ' name="answer1'  + '" type="text" class=""></p>' +
            '<p class="control-label">错误:<input name="answer2" onkeyup=' + 'this.setAttribute("value",this.value)' + ' type="text" class=""></p>' +
            '<p><span style="margin-right:20px;">正确答案:</span><label class="radio-inline"><input type="radio" name="answer" id="radios1" value="A" >正确</label><label class="radio-inline"><input type="radio" name="answer" id="radios2" value="B">错误</label></p>' +
            '<p class="control-label">本题知识点:<textarea type="text"  onkeyup=' + 'this.setAttribute("value",this.value)' + '   class="form-control" name="explain'  + '"></textarea></p></div>';
        $('#neirong').append(aa);
        return false

    })
    /*判读多选题*/
    $('#check').on('click', function () {

        if($('#neirong').html().indexOf('input') !== -1){
            alert('亲，题目只能一题一题添加哦！')

            return false
        }
        var aa = ' <div class="xianshi">' +
            '<h3 class="control-label">多选题</h3>' +
            '<p class="control-label">请输入要添加的题目:</p>' +
            '<input onkeyup=' + 'this.setAttribute("value",this.value)' + ' type="text" class="form-control"' +
            'id="password">' +
            '<p class="control-label">请输入答案选项内容:</p>' +
            '<p class="control-label">A:<input name="answer1" onkeyup=' + 'this.setAttribute("value",this.value)' + ' type="text" class=""></p>' +
            '<p class="control-label">B:<input name="answer2" onkeyup=' + 'this.setAttribute("value",this.value)' + ' type="text" class=""></p>' +
            '<p class="control-label">C:<input name="answer3" onkeyup=' + 'this.setAttribute("value",this.value)' + ' type="text" class=""></p>' +
            '<p class="control-label">D:<input name="answer4" onkeyup=' + 'this.setAttribute("value",this.value)' + ' type="text" class=""></p>' +
            '<p><span style="margin-right:20px;">正确答案:</span><label class="checkbox-inline"><input type="checkbox" name="answer" id="radios1" value="A" >A</label><label class="checkbox-inline"><input type="checkbox" name="answer" id="radios2" value="B"> B</label><label class="checkbox-inline"><input type="checkbox" name="answer" id="radios3" value="C"> C</label><label class="checkbox-inline"><input type="checkbox" name="answer" id="radios4" value="D">D</label></p>' +
            '<p class="control-label">本题知识点:<textarea type="text"  onkeyup=' + 'this.setAttribute("value",this.value)' + '   class="form-control" name="explain'  + '"></textarea></div>';
        $('#neirong').append(aa);
        return false
    })
})