const descriptions = {
  0: "To get started, tell us a little about who you are. <br/> Are you an influencer, a salesman, etc?",
  1: "Tell us about the tone of your message. Do you want to be trendy, professional, sarcastic, geeky, etc?",
  2: "Cool! Now, tell us a little bit more about the product you want to post about. What are you selling? What can people do with it?",
  3: "Lets take a look at some captions based on your input:",
  4: "Here are some hashtags to pair your caption with: ",
};

let currDescIdx = 0;

const renderDescription = () => {
  $(".description").html(descriptions[currDescIdx]);
};

const handleSubmit = () => {
  $("#submit-btn").click(() => {
    currDescIdx++;

    renderDescription();
  });
};

$(document).ready(() => {
  renderDescription();

  handleSubmit();
});
