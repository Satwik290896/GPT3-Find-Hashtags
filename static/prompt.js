dropdown = [
    "Writer",
    "Marketing",
    "Entrepreneur",
    "Artist",
    "Celebrity",
    "Salesperson"
]


function wait(ms, cb) {
    var waitDateOne = new Date();
    while ((new Date()) - waitDateOne <= ms) {
      //Nothing
    }
    if (cb) {
      eval(cb);
    }
  }

function CallAjax(prom){

    let data = {"prom": prom}         
    $.ajax({
        type: "POST",
        url: "/ajaxCall",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        success: function(result){
            wait(1000)
            window.location.href = "/content"
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){

    $( "#Enter_Prompt" ).focus()

	$( "#Enter_Prompt" ).autocomplete({
		source: dropdown
	  });

    $("#submit").click(function(){
        let prom = $("#Enter_Prompt").val()
        CallAjax(prom)
    })
})