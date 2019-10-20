$(function() {
    
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var originM = message;
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            message = message.toLowerCase();
            $.getJSON("../json/badwords.json").done(function(badwords){
            //http://www.bannedwordlist.com/lists/swearWords.txt
                badwords.sort(function(a, b){
                    return b.length - a.length;
                }).forEach(badword => {
                    var regex=new RegExp(badword,"gi");
                    message=message.replace(regex, "**");
                });              
            }).success(function(){
                sendToQna(message, firstName, email, phone);
            })
                        
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});

function sendEmail(){
    var name = $("input#name").val();
    var email = $("input#email").val();
    var phone = $("input#phone").val();
    var message = $("textarea#message").val();
    var link = "mailto:googlehelp@gmail.com"
        + "&subject=Further Help Needed"
        + "&body=Originale Question:%0D%0A" + message 
        +" %0D%0A Further Question: %0D%0A"
        ;

    window.location.href = link;
    //clear all fields
    $('#contactForm').trigger("reset");
}

function sendToQna(filteredQuestion, firstName, email, phone) {
    var endpoint = "https://api.genesysappliedresearch.com/v2/knowledge"
    var kbid = "af2df5e7-782d-4d79-bda7-b5ec047f4554"
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6ImEzNzU4NmY3LTA0ZGItNDQ5NC1iNzY1LTJkN2Y0YzQxZGJjZSIsImV4cCI6MTU3MTU2Njk4MiwiaWF0IjoxNTcxNTYzMzgyfQ.PLSq28CZ7wH4tM8l_o1aVtBbRCyHnpqYbnvxQQtQ-rc"
    $.ajax({
        data:JSON.stringify( {
            "query": filteredQuestion,
            
            "pageSize": 5,
            "pageNumber": 1,
            "sortOrder": "string",
            "sortBy": "string",
            "languageCode":"en-US",
            "documentType": "Faq"
        }),
        "async": true,
        "crossDomain": true,
        "url": endpoint + "/knowledgebases/" + kbid + "/search",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "organizationid": "a37586f7-04db-4494-b765-2d7f4c41dbce",
            "token": token,
            "Accept": "*/*",
        },
        "processData": false,
        success: function(data) {
            // Enable button & show success message
            $.getJSON("../json/siteUrl.json").done(function(siteUrl){
                var categoryStr="";
                data.results.forEach(response => {
                    let category = response.faq.answer;
                    if(categoryStr.includes(category)==false){
                        categoryStr=categoryStr+category+",";
                    }
                });
                var categoryArr = categoryStr.split(",");
                $('#link1').html('<a href="'+siteUrl[categoryArr[0]]+'" target = "_blank">'+categoryArr[0]+'</a>');
                $('#link2').html('<a href="'+siteUrl[categoryArr[1]]+'" target = "_blank">'+categoryArr[1]+'</a>'); 
                $('#link3').html('<a href="'+siteUrl[categoryArr[2]]+'" target = "_blank">'+categoryArr[2]+'</a>');  
            })
            
            $.getJSON("../json/graphData.json").done(function(graphData){
                console.log(graphData);
                graphData[data.results[0].faq.answer]=parseInt(graphData[data.results[0].faq.answer])+1;
                if(filteredQuestion.includes("**")){
                    console.log(graphData[data.results[0].faq.answer+"_off"]);
                    graphData[data.results[0].faq.answer+"_off"]=parseInt(graphData[data.results[0].faq.answer+"_off"])+1;
                    console.log(graphData[data.results[0].faq.answer+"_off"]);
                }
                console.log(graphData);
            })

            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>Your message has been submitted. </strong>");
            $('#success > .alert-success')
                .append('</div>');

            console.info(data);
        }, 
        error: function() {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my server is not responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
        },
    });
  }