import {
  resultBlock,
  textInputBlock,
  historyBlock,
  scientificKeys,
  numerals,
  operators,
  equalsKey,
  menuButton,
  themeButton,
  cancelEverythingKey,
  cancelKey,
  deleteKey,
  historyKey,
  clearHistoryButton,
  backToCalculation,
  Ntxt,
  Stxt,
  Ctxt,
  keysArray,
  controlarr,
  calculationKeys_parentNode,
  modeList,
  themeList,
  partOne,
  partTwo,
  normalModeButton,
  scientificModeButton,
  conversionModeButton,
  mainTag,
  lightThemeButton,
  normalThemeButton,
  darkThemeButton,
  noHistoryBox,
  resultContainer,
  historyContent,
} from "./modules/dom-setup.js";

import calcEngine from "./modules/calc_engine.js";
import calcDisplayController from "./modules/calc_display_controller.js";

let currentCalculation = new calcEngine();
let currentDisplayController = new calcDisplayController(textInputBlock);
let calculationHistory = [];

function displayElement(element, visible) {
  if (visible) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function showMenu() {
  displayElement(modeList, true);
  menuButton.removeEventListener("click", showMenu);
  menuButton.addEventListener("click", hideMenu);
  hideThemes();
}

function hideMenu() {
  displayElement(modeList, false);
  menuButton.removeEventListener("click", hideMenu);
  menuButton.addEventListener("click", showMenu);
}

function showThemes() {
  displayElement(themeList, true);
  themeButton.removeEventListener("click", showThemes);
  themeButton.addEventListener("click", hideThemes);
  hideMenu();
}

function hideThemes() {
  displayElement(themeList, false);
  themeButton.removeEventListener("click", hideThemes);
  themeButton.addEventListener("click", showThemes);
}

function UpdateTheme(color, bgColor) {
  mainTag.style.color = color;
  mainTag.style["background-color"] = bgColor;
}

function themeNormal() {
  UpdateTheme("white", "#231164");
  hideThemes();
}

function themeLight() {
  UpdateTheme("#1d2724", "#e8e4e4");
  hideThemes();
}
function themeDark() {
  UpdateTheme("#ffffff", "#00001B");
  hideThemes();
}

function normalMode() {
  displayElement(Ntxt, true);
  displayElement(Stxt, false);
  displayElement(Ctxt, false);
  displayElement(partOne, true);
  displayElement(partTwo, false);
  displayElement(scientificKeys, false);

  for (let count = 0; count < numerals.children.length; count++) {
    let each = numerals.children[count];
    each.setAttribute("class", "nu-row-normode");
  }
  operators.children[0].setAttribute("class", "op-container-normode");
  hideMenu();
}

function scientificMode() {
  displayElement(Ntxt, false);
  displayElement(Stxt, true);
  displayElement(Ctxt, false);
  displayElement(partOne, true);
  displayElement(partTwo, false);
  displayElement(scientificKeys, true);

  let numerals = document.querySelector(".numerals"),
    operators = document.querySelector(".operators");
  for (let count = 0; count < numerals.children.length; count++) {
    let each = numerals.children[count];
    each.setAttribute("class", "nu-row");
  }
  operators.children[0].setAttribute("class", "op-container");
  hideMenu();
}

function conversionMode() {
  displayElement(Ntxt, false);
  displayElement(Stxt, false);
  displayElement(Ctxt, true);
  displayElement(partOne, false);
  displayElement(partTwo, true);
  displayElement(scientificKeys, true);
  hideMenu();
}

function displayResult() {
  displayElement(textInputBlock, false);
  displayElement(resultBlock, true);
  displayElement(historyBlock, false);
}

function displayCalculation() {
  displayElement(textInputBlock, true);
  displayElement(resultBlock, false);
  displayElement(historyBlock, false);
}

function displayHistory() {
  displayElement(textInputBlock, false);
  displayElement(resultBlock, false);
  displayElement(historyBlock, true);
  let allHistoryElement = calculationHistory.map((x) => {
    return x.historyItemElement;
  });
  historyContent.append(...allHistoryElement);
}

function setAttrTo(parentDoc, target, attrName, data, addAttr) {
  // the parent doc is an html element : the target is the class, or any other valid css selector : dataset is either an array or a string: addAttr is a function that takes an element and added the required attribute to it.
  if (parentDoc) {
    // takes a parent doc, iterate through its target children and adds an attribute.
    if (!Array.isArray(data))
      throw new Error(
        "data array must be passed for multiple set-attribute operation",
      );
    for (
      let counter = 0;
      counter < parentDoc.querySelectorAll(target).length;
      counter++
    ) {
      let ele = parentDoc.querySelectorAll(target)[counter];
      //add value attribute
      addAttr(ele, attrName, data[counter]);
    }
  } else {
    if (typeof data !== "string")
      throw new Error(
        "single element add attribute operation requires data of type string",
      );
    // here no parent doc, so we search for the first match in the dom, so make sure that you know the exact matching selector to use.
    let ele = document.querySelector(target);
    addAttr(ele, attrName, data);
  }
}

/*setting the value attribute in the relevant places*/
function addAttribute(element, attr, value) {
  if (attr == "class") {
    element.classlist.add(value);
  } else element.setAttribute(attr, value);
}

function addEventListner_Multi(
  parentDoc,
  target,
  test,
  event,
  listner,
  options,
) {
  // add an event listner to one or more elements
  if (parentDoc) {
    for (let each of parentDoc.querySelectorAll(target)) {
      if (test(each)) {
        each.addEventListener(event, (e) => {
          listner(e, options);
        });
      }
    }
  }
}

function isNotControlKey(element) {
  let controlKeysArr = controlarr;
  controlKeysArr.push("equals");
  let valueAttr = element.getAttribute("value");
  return !controlKeysArr.includes(valueAttr);
}

function closeResultBoxAandHideMenu(e) {
  displayCalculation();
  hideMenu();
  hideThemes();
}

function updateCalculationEngine(e) {
  const val =
    e.target.getAttribute("value") ||
    e.target.parentElement.getAttribute("value");
  if (val !== null) {
    currentCalculation.set(val);
  }
}

function updateCalculationDisplay(e) {
  const val =
    e.target.getAttribute("value") ||
    e.target.parentElement.getAttribute("value");
  if (val !== null) {
    currentDisplayController.appendToTextBlock(
      val,
      currentCalculation.previousValue,
    );
  }
}

setAttrTo(calculationKeys_parentNode, "p", "value", keysArray, addAttribute);

// add listner for buttons to close the menus that are opened
addEventListner_Multi(
  calculationKeys_parentNode,
  "p",
  () => true,
  "click",
  closeResultBoxAandHideMenu,
);

// add listner for buttons which handle's the calculation alone
addEventListner_Multi(
  calculationKeys_parentNode,
  "p",
  isNotControlKey,
  "click",
  updateCalculationEngine,
);

// add listner for buttons which handles the realtime display and history
addEventListner_Multi(
  calculationKeys_parentNode,
  "p",
  isNotControlKey,
  "click",
  updateCalculationDisplay,
);

addEventListner_Multi(
  calculationKeys_parentNode,
  "p",
  isNotControlKey,
  "click",
  displayCalculation,
);

//NavBar.addEventListener('click',show(document.querySelector('.mode-list')));
menuButton.addEventListener("click", showMenu);
themeButton.addEventListener("click", showThemes);
normalModeButton.addEventListener("click", normalMode);
scientificModeButton.addEventListener("click", scientificMode);
conversionModeButton.addEventListener("click", conversionMode);
lightThemeButton.addEventListener("click", themeLight);
darkThemeButton.addEventListener("click", themeDark);
normalThemeButton.addEventListener("click", themeNormal);

//equals displays result,appends history, formats calculations DOM HistoryElement

function equals() {
  let { compliant, error } = currentCalculation.compliant;
  let finalAnswer;
  if (compliant) {
    finalAnswer = currentCalculation.getResult();
  }
  // update result with function update result
  updateResultBlock({ finalAnswer, compliant, error });
  // update History
  updateHistory();
}

function updateResultBlock(options) {
  let text = `Answer = ${options.finalAnswer || "Syntax Error, Check History To See what went wrong"}`;
  resultContainer.innerHTML = text;
  options.text = text;
  currentDisplayController.setFinalAnswer(options);
  currentDisplayController.createHistoryItem();
  displayElement(noHistoryBox, false);
}

function updateHistory() {
  let calculation = { ...currentCalculation };
  let displayController = { ...currentDisplayController };
  let historyItemElement = currentDisplayController.createHistoryItem();
  let history = {
    calculation,
    displayController,
    historyItemElement,
  };
  calculationHistory.push(history);
}

function deleteHandler() {
  try {
    if (currentCalculation.currentValue == "powY") {
      currentCalculation.delete();
    } else {
      currentCalculation.delete();
      currentDisplayController.deleteLastChar();
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
}

function emptyTextInput() {
  textInputBlock.innerHTML = "";
}

const cancel = () => {
  displayCalculation();
  emptyTextInput();
  currentCalculation = new calcEngine();
  currentDisplayController = new calcDisplayController(textInputBlock);
};

function CancelEveryThing() {
  emptyHistory();
  cancel();
}

function clearHistory() {
  displayElement(noHistoryBox, true);
  calculationHistory = [];
  historyContent.innerHTML = "";
}

equalsKey.addEventListener("click", () => {
  equals();
  displayResult();
});

deleteKey.addEventListener("click", () => {
  deleteHandler(e);
});

cancelKey.addEventListener("click", () => {
  cancel(e);
});

historyKey.addEventListener("click", () => {
  displayHistory();
});

cancelEverythingKey.addEventListener("click", () => {
  CancelEveryThing();
});

backToCalculation.addEventListener("click", () => {
  displayCalculation();
});

clearHistoryButton.addEventListener("click", () => {
  clearHistory();
});
