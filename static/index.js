const descriptions = {
  0: "To get started, tell us a little about who you are. <br/> Are you an influencer, a salesman, etc?",
  1: "Tell us about the tone of your message. <br/> Do you want to be trendy, professional, sarcastic, geeky, etc?",
  2: "Cool! Now, tell us a little bit more about the product you want to post about. What are you selling? What can people do with it?",
  3: "Lets take a look at some captions based on your input: <br/>",
  4: "Here are some hashtags to pair your caption with: ",
};

let currDescIdx = 0;

let captionsArr;
let hashtagsArr;

const renderContent = async (userInput) => {
  $(".description").html(descriptions[currDescIdx]);

  if (currDescIdx === 2) {
    try {
      const response = await axios.post("/inputs", {
        description: currDescIdx,
        input: userInput,
      });

      captionsArr = response["data"]["captions"];
    } catch (error) {
      console.log(error);
    }
  } else if (currDescIdx === 3) {
    $("#submit-btn").addClass("d-none");
    $("#like").removeClass("d-none");
    $("#regenerate").removeClass("d-none");

    try {
      const response = await axios.post("/inputs", {
        description: currDescIdx,
        input: userInput,
      });

      hashtagsArr = response["data"]["hashtags"];

      captionsArr.forEach((caption) => {
        $(".description").append(caption + "</br>");
      });
    } catch (error) {
      console.log(error);
    }
  } else if (currDescIdx === 4) {
    hashtagsArr.forEach((hashtag) => {
      $(".description").append(hashtag);
    });
  }
};

const handleSubmit = () => {
  $("#submit-btn").click(() => {
    let userInput = $("#user-input").val();

    axios
      .post("/inputs", {
        description: currDescIdx,
        input: userInput,
      })
      .then(function (response) {
        console.log("printing", response);
      })
      .catch(function (error) {
        console.log(error);
      });

    currDescIdx++;

    renderContent(userInput);

    $("#user-input").val(" ");
  });
};

const handleRegenerate = () => {
  $("#regenerate").on("click", () => {});
};

const handleLike = () => {
  $("#like").on("click", () => {
    currDescIdx++;
  });
};

$(document).ready(() => {
  renderContent();

  handleSubmit();

  handleRegenerate();

  handleLike();
});
