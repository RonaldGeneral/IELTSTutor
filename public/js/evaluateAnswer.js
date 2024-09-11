$(document).ready(function () {
    $("#evaluateAns").click(function () {
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

    $("#evaluateForm").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.
    
        var form = $(this);
        var actionUrl = form.attr('action');

        let obj_form = form.serializeArray(); 
        let obj = {}
        obj_form.forEach(function (input) { 
            obj[input.name] = input.value; 
        }) 

        $('#evaluateAns2').prop("disabled",true);
        $('#evaluateLoading').removeClass('d-none');

        $.ajax({
            type: "POST",
            url: actionUrl,
            data: obj, 
            success: function(res)
            {
                let formatted = formatEvaluate(res.data);
                if(!formatted) {
                    $('#evaluateAns2').prop("disabled",false);
                    $('#evaluateLoading').addClass('d-none');
                } else {
                    $("#evaluateAns2").remove();
                    $("#eva2").html(formatted);                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('#evaluateAns2').prop("disabled",false);
                $('#evaluateLoading').addClass('d-none');
             }
        });
        
    });
});

function formatEvaluate(obj) {

    try {
        let output = `
            <h3>Score</h3>
            <p>Overall Score: `+obj.overall+`</p>
            <p>Task Response: `+obj.task+`</p>
            <p>Coherence and Cohesion: `+obj.cohesion+`</p>
            <p>Lexical Resource: `+obj.lexical+`</p>
            <p>Grammatical Range and Accuracy: `+obj.grammar+`</p><br>
            <h4><u>Analysis of Weaknesses</u></h4>
            <ol>`;

        obj.weakness.forEach(element => {
            output += `<li style="margin: 10px 0;">` + element + `</li>`;
        });

        output += `</ol>`;

        return output;
    } catch(err) {
        return null;
    }

}