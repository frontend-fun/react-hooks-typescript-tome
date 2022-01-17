({useState, useEffect} = React);
exports = {};

function _getHtmlSelector(el) {
    if (el.tagName.toLowerCase() == "html")
        return "html";
    var str = el.tagName.toLowerCase();
    str += (el.id != "") ? "#" + el.id : "";
    if (el.className) {
        var classes = el.className.trim().split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            str += "." + classes[i]
        }
    }
    
    if(document.querySelectorAll(str).length==1) return str;
    
    return _getHtmlSelector(el.parentNode) + " > " + str;
}


let uniqueID = 0;
function addSubArea(area, headerText, type) {
  const subarea = document.createElement("div");
  subarea.className = "runnable-sub-area";
  subarea.id = "runnable-sub-area-"+uniqueID;
  uniqueID += 1;
  const header = document.createElement("strong");
  header.appendChild(document.createTextNode(headerText));
  subarea.appendChild(header);
  const body = document.createElement(type);
  subarea.appendChild(body);
  subarea.body = body;
  area.after(subarea);
  return subarea;
}

function setupExecutionZone(target, editor) {
  const runButton = document.createElement("button");
  runButton.appendChild(document.createTextNode("Run"));
  const errorArea = addSubArea(target, "Errors", "pre");
  const outputArea = addSubArea(target, "Console Log", "pre");
  const mockDocument = addSubArea(target, "React Application", "div");
  runButton.onclick = () => {
    executeCode(editor.getSession().getValue(), 
      mockDocument.body, outputArea.body, errorArea.body);
    target.classList.add("fadeIn");
    target.addEventListener("webkitAnimationEnd", () => target.classList.remove("fadeIn"), false);
    target.addEventListener("animationEnd", () => target.classList.remove("fadeIn"), false);
  };
  target.after(runButton);
}

function setupAce(target, initialCode) {
  const editor = ace.edit(target);
  editor.getSession().setUseWorker(false);
  editor.setFontSize(14);
  //editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/tsx");
  editor.getSession().setValue(initialCode);
  setupExecutionZone(target, editor);
  console.log(initialCode);
}

window.addEventListener('load', function() {
  document.querySelectorAll('.language-typescript.highlighter-rouge,.language-tsx.highlighter-rouge').forEach((area) => {
    const editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("✏️"));
    editButton.style.float = 'right';
    editButton.onclick = () => {
      setupAce(area, area.textContent);
      editButton.remove();
    };
    area.parentNode.insertBefore(editButton, area);
  });
});

function backupFunctions() {
  return {
    log: console.log,
    error: console.error
  }
}

function mockFunctions(backup) {
  console.log = backup.log;
  console.error = backup.error;
}

function logData(data, where) {
  for (var i = 0; i < data.length; i++) {
    if (typeof data[i] == 'object') {
        where.innerHTML += (JSON && JSON.stringify ? JSON.stringify(data[i], undefined, 2) : data[i]) + '<br />';
    } else {
      where.innerHTML += data[i] + '<br />';
    }
  }
}

function wrapCode(code, outputArea, errorArea) {
  return `(function(){
    const backup = { log: window.console.log, error: window.console.error }
    let console = {};
    console.log = function() {
      const outputArea = document.querySelector("${_getHtmlSelector(outputArea)}");
      logData([...arguments], outputArea);
      //outputArea.innerText += [...arguments].join(" ") + "\\n";
      backup.log(...arguments);
    };
    console.error = function() {
      const errorArea = document.querySelector("${_getHtmlSelector(errorArea)}");
      //errorArea.innerText += [...arguments].join(" ") + "\\n";
      logData([...arguments], errorArea);
      backup.error(...arguments);
    };
    ${code}
  })();`;
}

function executeCode(code, mockDocument, outputArea, errorArea) {
  const backup = backupFunctions();
  outputArea.innerText = "";
  errorArea.innerText = "";
  let noErrors = true;
  compilerOptions =  {jsx: window.ts.JsxEmit.React, module: window.ts.ModuleKind.CommonJS};
  try {
    code += `\nif (typeof App !== "undefined") {ReactDOM.render(<App/>, mockDocument);}`;
    code = window.ts.transpile(code, compilerOptions);
    code = wrapCode(code, outputArea, errorArea);
    eval(code);
  } catch (e) {
    errorArea.innerText += e;
    noErrors = false;
  } finally {
    //mockFunctions(backup);
  }
  if (noErrors) {
    errorArea.innerText += "No errors";
  }
}