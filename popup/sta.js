function listenForClicks() {
  document.addEventListener("click", (e) => {
    function showAnswers(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "show"
      });
    }

    function reportError(error) {
      console.error(`Could not show answers: ${error}`);
    }

    if (e.target.classList.contains("show")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(showAnswers)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/showanswers.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
