class calcDisplayController {
  constructor(textInputBlock) {
    this.historyData = [];
    this.textInputBlock = textInputBlock;
    this.finalAnswer = undefined;
  }

  createHistoryItem() {
    let HI_container = document.createElement("section");
    HI_container.classList.add("historyItem");
    let HI_calculation = document.createElement("p");
    let HI_answer = document.createElement("p");
    let HI_errorMessage = document.createElement("p");
    let data = [];
    this.historyData.forEach((x) => {
      let element = x.cloneNode(true);
      data.push(element);
    });
    HI_calculation.append(...data);
    HI_answer.append([this.finalAnswer.text]);

    if (this.finalAnswer.error) {
      HI_errorMessage.append([this.finalAnswer.error.message]);
    }

    HI_container.appendChild(HI_calculation);
    HI_container.appendChild(HI_answer);
    HI_container.appendChild(HI_errorMessage);
    console.log("History Item", HI_container);
    return HI_container;
  }

  createCharacterElement(val, prev) {
    function textNode(str) {
      return document.createTextNode(str);
    }
    function spanEle() {
      return document.createElement("span");
    }
    function supEle() {
      return document.createElement("sup");
    }
    function modifyChar(value) {
      let modified;
      switch (value) {
        case "percentage":
          modified = "% ";
          break;
        case "sqrt":
          modified = "√";
          break;
        case "powY":
          modified = "";
          break;
        case "rtY":
          modified = "√";
          break;
        case "pie":
          modified = "π";
          break;
        case "n-factorial":
          modified = "!";
          break;
        case "epowX":
          modified = "e";
          break;
        case "10powX":
          modified = "10";
          break;
        case "*":
          modified = "x";
          break;
      }
      return modified;
    }

    const createCalcCharacter = (value, prev) => {
      // this function takes the value and returns the appropraite dom result
      let character;
      let spanCharsNoMod = [
        "sin",
        "cos",
        "tan",
        "ln",
        "log",
        "(",
        ")",
        "7",
        "8",
        "9",
        "4",
        "5",
        "6",
        "1",
        "2",
        "3",
        ".",
        "0",
        "+",
        "-",
        "/",
      ];
      let spanCharMod = [
        "percentage",
        "sqrt",
        "rtY",
        "pie",
        "n-factorial",
        "plusOrMinus",
        "epowX",
        "10powX",
        "*",
      ];
      let powerN1Chars = ["arcSin", "arcCos", "arcTan"];
      let suffixWithSuperscript = ["10powX", "epowX", "powY"];
      let lastElemIsSup;
      let isSquare;
      let currentValIsnumber = "0123456789.".includes(value);
      console.log("prev", prev);
      if (prev) {
        lastElemIsSup = this.textInputBlock.lastElementChild.localName == "sup";
        isSquare = this.textInputBlock.lastElementChild.hasAttribute("square");
      }
      console.log({ lastElemIsSup, isSquare, currentValIsnumber, value });

      // create the normal span characters here at the top, that way, character is sure to be initialized.
      if (spanCharsNoMod.includes(value)) {
        character = spanEle();
        let text = textNode(val);
        character.appendChild(text);
      } else if (spanCharMod.includes(value)) {
        character = spanEle();
        let text = textNode(modifyChar(value));
        character.appendChild(text);
      } else if (powerN1Chars.includes(value)) {
        character = spanEle();
        let text = textNode(value.replace("arc", "").toLowerCase());
        console.log("text", text);
        let PN1 = supEle();
        PN1.appendChild(textNode("-1"));
        character.appendChild(text);
        character.appendChild(PN1);
      } else if (value == "xpow2") {
        character = supEle();
        character.setAttribute("square", true);
        character.appendChild(textNode("2"));
      }

      if (suffixWithSuperscript.includes(prev)) {
        let char = supEle();
        char.appendChild(character);
        character = char;
      }
      if (lastElemIsSup && !isSquare && currentValIsnumber) {
        let char = supEle();
        char.appendChild(character);
        character = char;
      }
      // modify char for only when the prev requires the the next element to be raised to a power
      return character;
    };

    let element = createCalcCharacter(val, prev);
    return element;
  }
  appendToTextBlock(val, prev) {
    let character_R = this.createCharacterElement(val, prev);
    let character_H = this.createCharacterElement(val, prev);
    if (character_R) {
      this.textInputBlock.appendChild(character_R);
      this.historyData.push(character_H);
    } else {
      console.log("HTML element not created for", val);
    }
  }
  deleteLastChar() {
    this.textInputBlock.removeChild(this.textInputBlock.lastElementChild);
    this.historyData.pop();
  }
  setFinalAnswer(ans) {
    this.finalAnswer = ans;
  }
}

export default calcDisplayController;
