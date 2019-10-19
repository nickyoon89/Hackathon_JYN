$(function() {

    var endpoint = "https://api.genesysappliedresearch.com/v2/knowledge"
    var kbid = "78fd356d-d4a0-4fcb-a8cf-b630e1e0c5a3"

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
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                //url: endpoint + "/knowledgebases/" + kbid + "/search",
                data:JSON.stringify( {
                    "query": "Why did my account get locked?",
                    "query2": "I want to get alerts for my account activity. What do I do?",
                    "query3": "Will my loan application be dependent on my credit score?",
                    "query4": "Is my financial information safe?",
                    "query5": "Is my data  safe?",
                    "query6": "What do you do for my security?",
                    "query7": "Can I take a vacation?",
                    
                    "pageSize": 5,
                    "pageNumber": 1,
                    "sortOrder": "string",
                    "sortBy": "string",
                    "languageCode":"en-US",
                    "documentType": "Faq"
                }),
                "async": true,
                "crossDomain": true,
                "url": "https://api.genesysappliedresearch.com/v2/knowledge/knowledgebases/78fd356d-d4a0-4fcb-a8cf-b630e1e0c5a3/search",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "organizationid": "a37586f7-04db-4494-b765-2d7f4c41dbce",
                    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6ImEzNzU4NmY3LTA0ZGItNDQ5NC1iNzY1LTJkN2Y0YzQxZGJjZSIsImV4cCI6MTU3MTUyNzAwOSwiaWF0IjoxNTcxNTIzNDA5fQ.t1Phh1L5In-0fny7pQ4Xdt-F9a01BfdZ8ZKrUv0DVAA",
                    "User-Agent": "PostmanRuntime/7.18.0",
                    "Accept": "*/*",
                    "Host": "api.genesysappliedresearch.com",
                    "Accept-Encoding": "gzip, deflate",
                    "Content-Length": "514",
                    "Connection": "keep-alive"
                },
                "processData": false,

                success: function() {
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

                }/*,

                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");

                }*/,

            });
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
