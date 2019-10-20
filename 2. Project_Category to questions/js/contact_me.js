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
                console.log(badwords.sort(function(a, b){
                    return b.length - a.length;
                }));
              
            }).success(function(){
                sendToQna(message, firstName);
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


function sendToQna(filteredQuestion, firstName) {
    var endpoint = "https://api.genesysappliedresearch.com/v2/knowledge"
    var kbid = "6c96fe14-c061-4eb2-bbeb-3161c9dcc6a9"
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
        //"url": "https://api.genesysappliedresearch.com/v2/knowledge/knowledgebases/78fd356d-d4a0-4fcb-a8cf-b630e1e0c5a3/search",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "organizationid": "a37586f7-04db-4494-b765-2d7f4c41dbce",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6ImEzNzU4NmY3LTA0ZGItNDQ5NC1iNzY1LTJkN2Y0YzQxZGJjZSIsImV4cCI6MTU3MTU0MTY0NywiaWF0IjoxNTcxNTM4MDQ3fQ.wUswDijKV0r_Cj-AEqTjTa6V5U4G4b8gCC9Es096RH8",
            "Accept": "*/*",
        },
        "processData": false,
        success: function(data) {
            // Enable button & show success message
            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
                .append('</div>');

            //clear all fields
            $('#contactForm').trigger("reset");
            console.info(data);
        }, 
        error: function() {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
        },
    });
  }