$(document).ready(function () {
    $("#generateAns").click(function () {
       $.post("/question/writing/getAnswer",
          {
            task: "task2",
          },
          function (res, status) {
            if(res.data) {
               $("#answerBox").append(res.data);
               $("#generateAns").remove();
            }
               
          });
    });
    $("#evaluateAns2").click(function () {
      if(!($("#essay2").val())) return;

       $.post("/question/writing/getEvaluate",
          {
            task: "task2",
            essay: $("#essay2").val(),
          },
          function (res, status) {
            if(res.data) {
               $("#eva2").append(res.data);
               $("#evaluateAns").remove();
            }
               
          });
    });
});