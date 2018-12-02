// popup javascript
document.addEventListener("DOMContentLoaded", function(e) {
  var f = document.getElementsByTagName('input');
  console.log(f);

  var fs = Array.prototype.slice.call(f);
  console.log(fs);

  for (var i = 0; i < fs.length; i++) {
    fs[i].addEventListener('click', function(e) {
      clickCheckbox()
    });
  }

  function clickCheckbox() {
    let params = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        f0: fs[0].checked,
        f1: fs[1].checked,
        f2: fs[2].checked,
        f3: fs[3].checked,
        f4: fs[4].checked,
        f5: fs[5].checked
      });
    });
  }
});