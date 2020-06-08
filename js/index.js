$(function() {
    load();
    $('#input').on("keydown", function(event) {
        if (event.keyCode === 13) {
            var local = getDate();
            // console.log(local);
            if ($(this).val() != "") {
                local.push({ title: $(this).val(), done: false });
            }
            saveDate(local);
            load();
        }
    });

    //删除
    $('.demo-box').on("click", 'a', function() {
        var data = getDate();
        var index = $(this).attr('id');
        // console.log(index);
        data.splice(index, 1);
        saveDate(data);
        load();
    });

    $('#todolist,#donelist').on("click", "input", function() {
        // alert('1');
        var data = getDate();
        var index = $(this).siblings("a").attr('id');
        // console.log(index);
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();

    });

    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }

    }

    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date));

    }

    function load() {
        var data = getDate();
        // console.log(data);
        $('#todolist').empty();
        $('#donelist').empty();
        $.each(data, function(i, n) {

            // console.log(n);
            if (n.done) {
                $('#donelist').prepend('<li> <input type="checkbox" checked="checked" ><span>' + n.title + '</span><a id=' + i + ' href="javascript:;" class="close"><i class="iconfont icon-cuowu1"></i></a></li>');

            } else {
                $('#todolist').prepend('<li> <input type="checkbox" ><span>' + n.title + '</span><a id=' + i + ' href="javascript:;" class="close"><i class="iconfont icon-cuowu1"></i></a></li>');

            }
        })
    }
})