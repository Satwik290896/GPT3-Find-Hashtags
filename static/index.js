const descriptions = {
  0: "To get started, tell us a little about who you are. <br/> Are you an influencer, a salesman, etc?",
  1: "Tell us about the tone of your message. <br/> Do you want to be trendy, professional, sarcastic, geeky, etc?",
  2: "Cool! Now, tell us a little bit more about the product you want to post about. What are you selling? What can people do with it?",
  3: "Lets take a look at some captions based on your input: <br/>",
  4: "Here are some hashtags to pair your caption with: ",
};

let userInput = "";
let captionChoice = 0;
let hashtagChoice = 0;
let currDescIdx = 0;

let captionsArr;
let hashtagsArr;

const renderContent = async (userInput) => {
  $(".description").html(descriptions[currDescIdx]);

  if (currDescIdx === 2) {
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
  } else if (currDescIdx === 3) {
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
  } else if (currDescIdx === 4) {
    $(".choices").empty();
    hashtagsArr.forEach((hashtag) => {
      $(".choices").append(hashtag);
    });
  }
};

const handleSubmit = () => {
  $("#submit-btn").click(() => {
    userInput = $("#user-input").val();

    if (currDescIdx === 3) {
      captionChoice = int(userInput);
    } else if (currDescIdx === 4) {
      hashtagChoice = int(userInput);
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

    renderContent(userInput);

    $("#user-input").val(" ");
  });
};

const handleRegenerate = () => {
  $("#regenerate").on("click", () => {
    $.ajax({
      type: "POST",
      url: "inputs",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ description: 2, input: userInput }),
      success: function (response) {
        $(".choices").empty();

        captionsArr = response["captions"];

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
  });
};

$(document).ready(() => {
  renderContent();

  handleSubmit();

  handleRegenerate();
});
