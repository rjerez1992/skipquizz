(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function fetchQuestions(){
    var markup = document.documentElement.innerHTML;
    var pre_question = markup.split("var questions = ")[1];
    var questions = pre_question.split(";\n$('body').addClass('noselect');")[0];
    return JSON.parse(questions);
  }

  function showAnswers(){
    questions = fetchQuestions();

    var cardNode = document.createElement("div");
    cardNode.id = "answers-popup";
    cardNode.style.position = "absolute";
    cardNode.style.bottom = "3%";
    cardNode.style.right = "1%";
    cardNode.style.maxWidth = "20%";
    cardNode.className = "card";

    var cardBodyNode = document.createElement("div");
    cardBodyNode.className = "card-body";

    questions.forEach(function(element, index) {
      console.log(element.answer);
      cardBodyNode.innerHTML += "<b>Respuesta "+(index+1)+":</b> "+element.answer+"<br>";
    });

    var buttonNode = document.createElement("button");
    buttonNode.className = "btn btn-danger btn-block";
    buttonNode.type = "button";
    buttonNode.style.marginTop = "15px";
    buttonNode.onclick = function(){
      document.getElementById("answers-popup").remove();
    };
    buttonNode.innerHTML = "Cerrar"

    cardBodyNode.appendChild(buttonNode);
    cardNode.appendChild(cardBodyNode);
    document.body.appendChild(cardNode);
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "show") {
      showAnswers()
    }
  });

})();
