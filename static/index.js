const descriptions = {
  0: "Generate clever captions and hashtags for your instagram posts with this instagram curator.",
  1: "To get started, tell us a little about who you are. <br/><br/> For example: influencer, a salesman, entrepreneur, filmmaker, seller, celebrity, doctor, etc?",
  2: "Tell us about the tone of your message. <br/><br/> Do you want to be trendy, professional, sarcastic, geeky, etc?",
  3: "Cool! Now, tell us a little bit more about the product you want to post about. <br/><br/> What are you selling? What can people do with it?",
  4: "Lets take a look at some captions based on your input: <br/>",
  5: "Here are some hashtags to pair your caption with: ",
  6: "Here's a sample of your post: <hr>",
};

let prompt1 = [
  "influencer",
  "entrepreneur",
  "marketing employee",
  "filmmaker",
  "seller",
  "writer",
  "engineer",
  "doctor",
  "lawyer",
  "artist",
  "celebrity",
  "salesperson"
];

let prompt2 = [
  "geeky",
  "professional",
  "authentic",
  "trendy",
  "authentic & trendy",
  "party",
  "celebration",
  "party & celebration"
];

let userInput = "";
let captionChoice = 0;
let currDescIdx = 0;

let captionsArr;
let hashtagsArr;

const renderContent = async (userInput) => {
  $(".description").html(descriptions[currDescIdx]);
  if(currDescIdx == 0) {
    $("#home").addClass("d-none");
    $("#start").removeClass("d-none");
    $("#back").addClass("d-none");
    $("#regenerate").addClass("d-none");
    $(".selection").html("");
    $(".choices").html("");
    $(".image").html("");
    $("#user-input").addClass("d-none");
    $("#submit-btn").addClass("d-none");
  }
  if(currDescIdx == 1) {
    $("#start").addClass("d-none");
    $("#submit-btn").html("Submit");
    $("#back").addClass("d-none");
    $("#home").removeClass("d-none");
    $("#regenerate").addClass("d-none");
    $(".selection").html("");
    $(".choices").html("");
    $(".image").html("");
    $("#user-input").removeClass("d-none");
    $("#user-input").focus();
    $("#submit-btn").removeClass("d-none");
    $( "#user-input" ).autocomplete({
      source: prompt1
      });
  }
  else if (currDescIdx == 2) {
    $("#back").removeClass("d-none");
    $("#home").addClass("d-none");
    $(".choices").html("");
    $("#user-input").focus();
    $( "#user-input" ).autocomplete({
      source: prompt2
      });

  } 
  else if (currDescIdx == 3) {

    $("#user-input").focus();
    $.ajax({
      type: "POST",
      url: "inputs",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ description: currDescIdx, input: userInput }),
      success: function (response) {
        captionsArr = response["captions"];
      },
      error: function (request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
  } else if (currDescIdx == 4) {
    $("#user-input").focus();
    $("#back").addClass("d-none");
    $("#home").removeClass("d-none");
    $("#tab").addClass("d-none");
    $("#regenerate").removeClass("d-none");
    $(".selection").append("Select a caption by entering a number from 1-5.");

    $.ajax({
      type: "POST",
      url: "inputs",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ description: currDescIdx, input: userInput }),
      success: function (response) {
        hashtagsArr = response["hashtags"];

        captionsArr.forEach((caption) => {
          $(".choices").append(caption + "</br>");
        });
      },
      error: function (request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
  } else if (currDescIdx == 5) {
    $(".choices").empty();
    $(".selection").empty();
    $("#user-input").addClass("d-none");
    $(".selection").append("Select submit if you like these hashtags.");

    hashtagsArr.forEach((hashtag) => {
      $(".choices").append(hashtag);
    });
  } else if (currDescIdx === 6) {
    $("#submit-btn").addClass("d-none");
  }
};

const renderSamplePost = () => {
  $(".choices").empty();
  $(".selection").empty();
  $("#submit-btn").addClass("d-none");
  $("#regenerate").addClass("d-none");
  $("#user-input").addClass("d-none");
  $(".image").append(
    'username <br/> <img class="img-fluid" src="static/image.jpg">'
  );
  $(".choices").append(
    "<b>username</b> <br/>" + captionsArr[captionChoice] + "<br/>"
  );

  $(".choices").append(hashtagsArr + "<br/>");
};

const handleSubmit = () => {
  $("#submit-btn").click(() => {
    userInput = $("#user-input").val();

    if (currDescIdx === 4) {
      captionChoice = Number(userInput) - 1;
    } else if (currDescIdx === 5) {
      hashtagChoice = Number(userInput) - 1;
    }

    $.ajax({
      type: "POST",
      url: "inputs",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ description: currDescIdx, input: userInput }),
      success: function (response) {
        console.log(response);
      },
      error: function (request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });

    currDescIdx++;

    if (currDescIdx === 6) {
      renderSamplePost();
    }

    renderContent(userInput);

    $("#user-input").val(" ");
  });
};

const handleStart = () => {
  $("#start").click(() => {
    userInput = $("#user-input").val();

    if (currDescIdx === 4) {
      captionChoice = Number(userInput) - 1;
    } else if (currDescIdx === 5) {
      hashtagChoice = Number(userInput) - 1;
    }

    $.ajax({
      type: "POST",
      url: "inputs",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ description: currDescIdx, input: userInput }),
      success: function (response) {
        console.log(response);
      },
      error: function (request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });

    currDescIdx++;

    if (currDescIdx === 6) {
      renderSamplePost();
    }

    renderContent(userInput);

    $("#user-input").val(" ");
  });
};

const handleRegenerate = () => {
  $("#regenerate").on("click", () => {
    console.log(currDescIdx);
    $.ajax({
      type: "POST",
      url: "inputs",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ description: currDescIdx - 1, input: userInput }),
      success: function (response) {
        $(".choices").empty();

        if (currDescIdx - 1 === 3) {
          captionsArr = response["captions"];

          captionsArr.forEach((caption) => {
            $(".choices").append(caption + "</br>");
          });
        } else if (currDescIdx - 1 === 4) {
          hashtagsArr = response["hashtags"];

          hashtagsArr.forEach((hashtag) => {
            $(".choices").append(hashtag + "</br>");
          });
        }
      },
      error: function (request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
  });
};

const handleback = () => {
  $("#back").on("click", () => {
    if (currDescIdx == 2 || currDescIdx == 3) {
      currDescIdx = currDescIdx - 1;
      renderContent();
    }
  });
};

const handlehome = () => {
  $("#home").on("click", () => {
    if (currDescIdx == 0 || currDescIdx == 1 || currDescIdx > 3) {
      currDescIdx = 0;
      renderContent();
    }
  });
};

$(document).ready(() => {
  renderContent();

  handleSubmit();
  handleStart();

  handleRegenerate();

  handleback();

  handlehome();
});
