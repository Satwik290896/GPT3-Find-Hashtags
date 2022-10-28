const descriptions = {
  0: "To get started, tell us a little about who you are. <br/> Are you an influencer, a salesman, etc?",
  1: "Tell us about the tone of your message. <br/> Do you want to be trendy, professional, sarcastic, geeky, etc?",
  2: "Cool! Now, tell us a little bit more about the product you want to post about. What are you selling? What can people do with it?",
  3: "Lets take a look at some captions based on your input: <br/>",
  4: "Here are some hashtags to pair your caption with: ",
  5: "Here's a sample of your post: <hr>",
};

let userInput = "";
let captionChoice = 0;
let currDescIdx = 0;

let captionsArr;
let hashtagsArr;

const renderContent = async (userInput) => {
  $(".description").html(descriptions[currDescIdx]);

  if(currDescIdx == 0) {
    $("#back").addClass("d-none");
    $("#home").removeClass("d-none");
    $("#regenerate").addClass("d-none");
    $(".selection").html("");
    $(".choices").html("");
    $(".image").html("");
    $("#user-input").removeClass("d-none");
    $("#user-input").focus();
    $("#submit-btn").removeClass("d-none");
  }
  else if (currDescIdx == 1) {
    $("#back").removeClass("d-none");
    $("#home").addClass("d-none");
    $(".choices").html("");
    $("#user-input").focus();

  } 
  else if (currDescIdx == 2) {
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
  } else if (currDescIdx == 3) {
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
  } else if (currDescIdx == 4) {
    $(".choices").empty();
    $(".selection").empty();
    $("#user-input").addClass("d-none");
    $(".selection").append("Select submit if you like these hashtags.");

    hashtagsArr.forEach((hashtag) => {
      $(".choices").append(hashtag);
    });
  } else if (currDescIdx === 5) {
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

    if (currDescIdx === 3) {
      captionChoice = Number(userInput) - 1;
    } else if (currDescIdx === 4) {
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

    if (currDescIdx === 5) {
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

        if (currDescIdx - 1 === 2) {
          captionsArr = response["captions"];

          captionsArr.forEach((caption) => {
            $(".choices").append(caption + "</br>");
          });
        } else if (currDescIdx - 1 === 3) {
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
    if (currDescIdx == 1 || currDescIdx == 2) {
      currDescIdx = currDescIdx - 1;
      renderContent();
    }
  });
};

const handlehome = () => {
  $("#home").on("click", () => {
    if (currDescIdx == 0 || currDescIdx > 2) {
      currDescIdx = 0;
      renderContent();
    }
  });
};

$(document).ready(() => {
  renderContent();

  handleSubmit();

  handleRegenerate();

  handleback();

  handlehome();
});
