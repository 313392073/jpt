(function ($) {

    //���������һ�е�����

    var tdArray = [];

    var index = 0;





    //���������������¼��ص������

    var resetTr = function ($index, tableId) {



        for (var i = 0; i < tdArray.length; i++) {

            var trCont = tdArray[i];



            $("#" + tableId + " tbody tr").each(function () {



                var thisText = $(this).children("td:eq(" + $index + ")").text();



                if (thisText == trCont) {

                    $("#" + tableId + " tbody").append($(this));

                }

            })

        }

    }







    //����

    var compare_up = function (a, b) {

        if ((/[\u4e00-\u9fa5]+/).test(a) && (/[\u4e00-\u9fa5]+/).test(b)) {

            return a.charCodeAt(0) - b.charCodeAt(0);

        } else {

            return a - b;

        }



    }



    //����

    var compare_down = function (a, b) {

        //�������жϺ��ֵ�����

        if ((/[\u4e00-\u9fa5]+/).test(a) && (/[\u4e00-\u9fa5]+/).test(b)) {

            return b.charCodeAt(0) - a.charCodeAt(0);

        } else {

            return b - a;

        }

    }



    //��������

    var fSort = function (compare) {

        tdArray.sort(compare)

    }



    //�����ͷ�¼�

    var clickFun = function ($index, tableId) {

        $("#" + tableId + " tbody tr").each(function () {

            var tdText = $(this).children("td:eq(" + $index + ")").text();

            tdArray.push(tdText);

        })

    }









    $.fn.sortTable = function () {



        var tableId = $(this)[0].id



        $("#" + tableId + " th.score").toggle(function () {



            index = $(this).index();



            clickFun(index, tableId);

            fSort(compare_up);

            resetTr(index, tableId);

        }, function () {



            index = $(this).index();



            clickFun(index, tableId);

            fSort(compare_down);

            resetTr(index, tableId);

        })

    };

})(jQuery);