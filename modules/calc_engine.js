class calcEngine {
  constructor() {
    this.currentValue = undefined;
    this.previousValue = undefined;
    this.index = undefined;
    this.mainArray = [];
  }

  set(val) {
    this.previousValue = this.currentValue;
    this.currentValue = val;
    this.mainArray.push(val);
    this.index = this.mainArray.length - 1;
  }
  get compliant() {
    let functionalKeys = [
      "sin",
      "cos",
      "tan",
      "ln",
      "log",
      "arcSin",
      "arcCos",
      "arcTan",
      "10powX",
      "epowX",
      "xpow2",
      "percentage",
      "sqrt",
      "powY",
    ];
    let workingArray = this.mainArray;
    function check2(array, func) {
      let passed = true;
      for (let count = 0; count < array.length - 1; count++) {
        passed = func(array[count], array[count + 1]);
        if (!passed) {
          break;
        }
      }
      return passed;
    }
    function check3(array, func) {
      let passed = true;
      for (let count = 0; count < array.length - 1; count++) {
        passed = func(array[count], array[count + 1], array[count + 2]);
        if (!passed) {
          break;
        }
      }
      return passed;
    }
    function protocol1() {
      //check if multiply and divide do not follow each other at any instant.
      class protocol1Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Syntax : Multiply or divide sign inappropriately used.";

      function protocol1test(current, next) {
        let combined = [current].concat([next]);
        combined = combined.join("");
        if (
          combined.indexOf("*/") !== -1 ||
          combined.indexOf("/*") !== -1 ||
          combined.indexOf("//") !== -1 ||
          combined.indexOf("**") !== -1
        ) {
          return false;
        } else return true;
      }
      if (!check2(workingArray, protocol1test)) {
        throw new protocol1Error(ErrorMessage);
      } else return true;
    }
    function protocol2() {
      // multiply or divide or powY or decimal point or root or xpow2 or n-factorial or percentage must not start a calculation.
      class protocol2Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Syntax: Calculation cannot begin with " + workingArray[0];

      if (
        [
          "*",
          "/",
          "powY",
          ".",
          "root",
          "xpow2",
          "n-factorial",
          "percentage",
        ].some((x) => x == workingArray[0])
      ) {
        throw new protocol2Error(ErrorMessage);
      } else return true;
    }
    function protocol3() {
      //multiply or divide or plus or minus or decimal point or a functional key with no parameter must not end a calculation.
      class protocol3Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Syntax: Calculation Cannot end with a " +
        workingArray[workingArray.length - 1];
      if (
        [
          "*",
          "/",
          "+",
          "-",
          ".",
          "sin",
          "cos",
          "tan",
          "ln",
          "log",
          "arcSin",
          "arcCos",
          "arcTan",
          "10powX",
          "epowX",
          "percentage",
          "sqrt",
          "powY",
          "rtY",
          ,
          "openBracket",
          "plusOrMinus",
        ].some((x) => x == workingArray[workingArray.length - 1])
      ) {
        throw new protocol3Error(ErrorMessage);
      } else return true;
    }
    function protocol4() {
      //multiply or divide or powY or decimal point or root or xpow2 or n-factorial or percentage must not start a bracket xpression.
      class protocol4Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Syntax: Wrong placement of first character in bracket.";

      function protocol4test(current, next) {
        let combined = [current, next];
        combined = combined.join("");
        if (
          [
            "(*",
            "(/",
            "(powY",
            "(.",
            "(root",
            "(xpow2",
            "(n-factorial",
            "(percentage",
          ].some((x) => x == combined)
        ) {
          return false;
        } else return true;
      }
      if (!check2(workingArray, protocol4test)) {
        throw new protocol4Error(ErrorMessage);
      } else return true;
    }
    function protocol5() {
      //multiply or divide must or plus or minus or decimal point or a functional key with no parameter must not end a bracket.
      class protocol5Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Syntax: bracket ended with an inapppropraite character";

      function protocol5test(current, next) {
        let combined = [current].concat([next]);
        combined = combined.join("");
        if (
          [
            "*)",
            "/)",
            "+)",
            "-)",
            ".)",
            "sin)",
            "cos)",
            "tan)",
            "ln)",
            "log)",
            "arcSin)",
            "arcCos)",
            "arcTan)",
            "10powX)",
            "epowX)",
            "percentage)",
            "sqrt)",
            "powY)",
            "rtY)",
            "plusOrMinus)",
          ].some((x) => x == combined)
        ) {
          return false;
        }
        return true;
      }
      if (!check2(workingArray, protocol5test)) {
        throw new protocol5Error(ErrorMessage);
      } else return true;
    }
    function protocol6() {
      // bracket must be opened and closed correctly.
      class protocol6Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage = "Syntax: bracket not opened or closed correctly";
      function hasBracket(input) {
        let result = false;
        for (let each of input) {
          if (each == "(" || each == ")") {
            result = true;
            break;
          }
        }
        return result;
      }
      function basicAssert(input) {
        //extract the bracket
        //assert that the first bracket character is an open bracket.
        //assert that number of open bracket is == to number ofclosed bracket.
        let extracted = [];
        let openbracketCount = 0;
        let closedbracketCount = 0;
        for (let each of input) {
          if (each == "(" || each == ")") {
            extracted.push(each);
            if (each == "(") openbracketCount += 1;
            else closedbracketCount += 1;
          }
        }
        console.log(extracted);
        if (extracted[0] !== "(") {
          return false;
        }
        if (openbracketCount !== closedbracketCount) {
          return false;
        } else return true;
      }
      function deepAssert(input) {
        let openbracketCount = 0,
          closedbracketCount = 0;
        let extracted = [];
        for (let each of input) {
          if (each == "(" || each == ")") {
            extracted.push(each);
          }
        }
        for (let each of extracted) {
          if (each == "(") {
            openbracketCount += 1;
          }
          if (each == ")") {
            closedbracketCount += 1;
          }
          if (openbracketCount < closedbracketCount) {
            return false;
          }
        }
        return true;
      }
      if (!hasBracket(workingArray)) {
        return true;
      }
      if (!basicAssert(workingArray)) {
        throw new protocol6Error(ErrorMessage);
      }

      if (!deepAssert(workingArray)) {
        throw new protocol6Error(ErrorMessage);
      } else return true;
    }
    function protocol7() {
      //only a number may preceed a root functional key.
      class protocol7Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Only a number or a bracket can follow a root character";
      function protocol7test(current, next) {
        if (current === "rtY") {
          if (Number(next) == NaN) {
            return false;
          }
        }
        return true;
      }
      if (!check2(workingArray, protocol7test)) {
        throw new protocol7Error(ErrorMessage);
      } else return true;
    }
    function protocol8() {
      //expressions that are not numbers that followed a functional key should be put in bracket eg sin(log10) evaluates to sin(1);
      class protocol8Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Expressions that' are not numbers when followed a functional key should be put in bracket";
      function protocol8test(current, next) {
        if (
          functionalKeys.some(
            (x) =>
              x == current &&
              x !== "xpow2" &&
              x !== "n-factorial" &&
              x !== "pie",
          ) &&
          functionalKeys
            .concat(["*", "/", "-", "+", ")"])
            .some((x) => x == next)
        ) {
          return false;
        } else return true;
      }
      if (!check2(workingArray, protocol8test)) {
        throw new protocol8Error(ErrorMessage);
      } else return true;
    }
    function protocol13() {
      class protocol13Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage = "decimal points should be put between numbers";
      function protocol13test(first, second, third) {
        if (
          second == "." &&
          typeof Number(first) !== "number" &&
          typeof Number(third) !== "number"
        ) {
          return false;
        } else return true;
      }
      if (!check3(workingArray, protocol13test)) {
        throw new protocol13Error(ErrorMessage);
      } else return true;
    }
    function protocol14() {
      // multiply or divide or powY or decimal point or root or xpow2 or n-factorial or percentage must not follow a plus or minus. 56 + / 45.
      class protocol14Error extends Error {
        constructor(message) {
          super(message);
        }
      }
      let ErrorMessage =
        "Inappropraite placement of character after a plus or minus";
      function protocol14test(current, next) {
        if (
          ["+", "-"].some((x) => current == x) &&
          [
            "*",
            "/",
            "powY",
            ".",
            "root",
            "xpow2",
            "n-factorial",
            "percentage",
          ].some((x) => x == next)
        ) {
          return false;
        }
        return true;
      }
      if (!check2(workingArray, protocol14test)) {
        throw new protocol14Error(ErrorMessage);
      } else return true;
    }
    let result = {
      compliant: true,
      error: undefined,
    };

    let protocolArray = [
      protocol1,
      protocol2,
      protocol3,
      protocol4,
      protocol5,
      protocol6,
      protocol7,
      protocol8,
      protocol13,
      protocol14,
    ];
    for (let each of protocolArray) {
      try {
        each();
      } catch (e) {
        result.compliant = false;
        result.error = e;
      } finally {
        if (!result.compliant) break;
      }
    }
    return result;
  }
  get modify() {
    let input = this.mainArray;
    function first(input) {
      let mod = [];
      let str = "";
      let pushed = false;
      for (let counter = 0; counter < input.length; counter++) {
        let each = input[counter];
        if (!Number.isNaN(Number(each)) || each == ".") {
          str += each;
        }
        if (Number.isNaN(Number(each)) && each !== ".") {
          if (str !== "") {
            mod.push(str);
            pushed = true;
          }
          if (counter == input.length - 1 && !pushed && str !== "") {
            mod.push(str);
          }
          str = "";
          mod.push(each);
        }
        if (input[counter + 1] == undefined && str !== "") {
          mod.push(str);
        }
      }
      return mod;
    }
    function minusEval(arr) {
      let prev, prevprev;
      let modArr = [];
      for (let each of arr) {
        if (!prev) {
          modArr.push(each);
          prev = each;
        } else {
          if (!prevprev) {
            if (modArr[0] == "-" || modArr[0] == "+") {
              modArr[modArr.length - 1] += each;
              prev = modArr[modArr.length - 1];
            } else {
              modArr.push(each);
              prevprev = prev;
              prev = each;
            }
          } else {
            if (
              (prev == "+" || prev == "-") &&
              ["*", "/", "(", ")"].some((x) => x == prevprev)
            ) {
              modArr[modArr.length - 1] += each;
              prev = modArr[modArr.length - 1];
            } else {
              modArr.push(each);
              prevprev = prev;
              prev = each;
            }
          }
        }
      }
      return modArr;
    }
    function extract(arr) {
      let start, end, current, next, result;
      for (let count = 0; count < arr.length; count++) {
        current = arr[count];
        next = arr[count + 1];
        if (["+", "-"].some((x) => x == current)) {
          if (start) {
            end = count;
          }
          if (!start) {
            if (["+", "-"].some((x) => x == next)) {
              start = count;
            }
          }
        } else {
          if (start && end) {
            result = { start: start, end: end };
          }
        }
      }
      return result;
    }
    function SD(str) {
      let result = 1;
      let minus1 = -1;
      let plus1 = 1;
      for (let counter of str) {
        if (counter == "+") {
          result *= plus1;
        }
        if (counter == "-") {
          result *= minus1;
        }
      }
      return result > 0 ? "+" : "-";
    }
    function removeMinusAndPlusSequence(arr) {
      let extracted = extract(arr);
      let start, end;
      if (extracted) {
        start = extracted.start;
        end = extracted.end;
      }
      if (start && end) {
        let sign = SD(arr.slice(start, end + 1));
        let deleteCount = end + 1 - start;
        arr.splice(start, deleteCount, sign);
      }
      if (extract(arr)) {
        return removeMinusAndPlusSequence(arr);
      } else return arr;
    }
    let modified = first(input);
    modified = removeMinusAndPlusSequence(modified);
    modified = minusEval(modified);
    return modified;
  }

  getResult() {
    let calculation = this.modify;
    let lf = ["xpow2", "n-factorial"];
    let rf = ["10powX", "epowX"];
    let amS = [
      "sin",
      "cos",
      "tan",
      "ln",
      "log",
      "arcSin",
      "arcCos",
      "arcTan",
      "percentage",
      "rtY",
      "pie",
      "sqrt",
      "powY",
    ];
    let functionalKeys = lf.concat(rf).concat(amS);
    let hasBracket = function () {
      return calculation.includes("(");
    };
    let hasSci = function (arr) {
      for (let each of arr) {
        if (functionalKeys.some((x) => x == each)) {
          return each;
        }
      }
      return undefined;
    };
    function extractMinBracketCase() {
      let indexOfOpenBracket, indexOfCloseBracket;
      for (let count = 0; count < calculation.length; count++) {
        let each = calculation[count];
        if (each == "(") {
          indexOfOpenBracket = count;
        }
        if (each == ")") {
          indexOfCloseBracket = count;
          break;
        }
      }
      return { start: indexOfOpenBracket, end: indexOfCloseBracket };
    }
    function leftHandSci(key, val) {
      let value = Number(val);
      function xpow2(arg) {
        return Math.pow(arg, 2);
      }
      function factorial(arg) {
        if (arg <= 0) {
          // terminal case
          return 1;
        } else {
          // block to execute
          return arg * factorial(arg - 1);
        }
      }
      if (key == "xpow2") {
        return xpow2(value);
      } else return factorial(value);
    } //end

    function rightHandSci(key, val) {
      let value = Number(val);
      function tenPowX(arg) {
        return Math.pow(10, arg);
      }
      function epowX(arg) {
        return Math.exp(arg);
      }
      if (key == "10powX") {
        return tenPowX(value);
      }
      if (key == "epowX") {
        return epowX(value);
      }
    } //end

    function ambidextrousSci(key, val1, val2) {
      function degreeToRad(degree) {
        return degree * 0.017453;
      }
      let value1 = Number(val1),
        value2 = Number(val2);
      function sin(arg1, arg2) {
        if (arg1) {
          return arg1 * Math.sin(degreeToRad(arg2));
        } else {
          return Math.sin(degreeToRad(arg2));
        }
      }
      function cos(arg1, arg2) {
        if (arg1) {
          return arg1 * Math.cos(degreeToRad(arg2));
        } else {
          return Math.cos(degreeToRad(arg2));
        }
      }
      function tan(arg1, arg2) {
        if (arg1) {
          return arg1 * Math.tan(degreeToRad(arg2));
        } else {
          return Math.tan(degreeToRad(arg2));
        }
      }
      function arcSin(arg1, arg2) {
        if (arg1) {
          return arg1 * Math.asin(degreeToRad(arg2));
        } else {
          return Math.asin(degreeToRad(arg2));
        }
      }
      function arcCos(arg1, arg2) {
        if (arg1) {
          return arg1 * Math.acos(degreeToRad(arg2));
        } else {
          return Math.acos(degreeToRad(arg2));
        }
      }
      function arcTan(arg1, arg2) {
        if (arg1) {
          return arg1 * Math.atan(degreeToRad(arg2));
        } else {
          return Math.atan(degreeToRad(arg2));
        }
      }
      function ln(arg1, arg2) {
        function ln(arg) {
          return Math.log(arg) / Math.log(Math.E);
        }
        if (arg1) {
          return arg1 * ln(arg2);
        } else {
          return ln(arg2);
        }
      }
      function log(arg1, arg2) {
        if (arg1) {
          return arg1 * Math.log(arg2);
        } else {
          return Math.log(arg2);
        }
      }
      function displayRoot(root, num) {
        return Math.pow(num, 1 / root);
      }
      function rtY(arg1, arg2) {
        if (!arg1) {
          return Math.sqrt(arg2);
        } else {
          return displayRoot(arg1, arg2);
        }
      }
      function sqrt(arg1, arg2) {
        if (Number.isNaN(arg1)) {
          return Math.sqrt(arg2);
        } else {
          return arg1 * Math.sqrt(arg2);
        }
      }
      function powY(arg1, arg2) {
        return Math.pow(arg1, arg2);
      }
      function percentage(arg1, arg2) {
        return (arg1 / 100) * arg2;
      }
      function pie(arg1, arg2) {
        if (Number.isNaN(arg1) && Number.isNaN(arg2)) {
          return Math.PI;
        } else {
          if (Number.isNaN(arg1) && !Number.isNaN(arg2)) {
            return Math.Pi * arg2;
          }
          if (!Number.isNaN(arg1) && Number.isNaN(arg2)) {
            return Math.PI * arg1;
          } else {
            return arg1 * Math.PI * arg2;
          }
        }
      }

      if (key == "sin") {
        return sin(value1, value2);
      }
      if (key == "cos") {
        return cos(value1, value2);
      }
      if (key == "tan") {
        return tan(value1, value2);
      }
      if (key == "arcTan") {
        return arcTan(value1, value2);
      }
      if (key == "arcCos") {
        return arcCos(value1, value2);
      }
      if (key == "arcSin") {
        return arcSin(value1, value2);
      }
      if (key == "ln") {
        return ln(value1, value2);
      }
      if (key == "log") {
        return log(value1, value2);
      }
      if (key == "rtY") {
        return rtY(value1, value2);
      }
      if (key == "pie") {
        return pie(value1, value2);
      }
      if (key == "percentage") {
        return percentage(value1, value2);
      }
      if (key == "sqrt") {
        return sqrt(value1, value2);
      }
      if ((key = "powY")) {
        return powY(value1, value2);
      }
    } //end
    function divide(calculation) {
      let index = calculation.indexOf("/");
      if (index !== -1) {
        let result =
          Number(calculation[index - 1]) / Number(calculation[index + 1]);
        calculation.splice(index - 1, 3, result);
      }
      index = calculation.indexOf("/");
      if (index !== -1) {
        return divide(calculation);
      }
      return calculation;
    }
    function multiply(calculation) {
      let index = calculation.indexOf("*");
      if (index !== -1) {
        let result =
          Number(calculation[index - 1]) * Number(calculation[index + 1]);
        calculation.splice(index - 1, 3, result);
      }
      index = calculation.indexOf("*");
      if (index !== -1) {
        return multiply(calculation);
      }
      return calculation;
    }
    function add(calculation) {
      let index = calculation.indexOf("+");
      if (index !== -1) {
        let result =
          Number(calculation[index - 1]) + Number(calculation[index + 1]);
        calculation.splice(index - 1, 3, result);
      }
      index = calculation.indexOf("+");
      if (index !== -1) {
        return add(calculation);
      }
      return calculation;
    }
    function substract(calculation) {
      let index = calculation.indexOf("-");
      if (index !== -1) {
        let result =
          Number(calculation[index - 1]) - Number(calculation[index + 1]);
        calculation.splice(index - 1, 3, result);
      }
      index = calculation.indexOf("-");
      if (index !== -1) {
        return substract(calculation);
      }
      return calculation;
    } //end

    function baseCase(baseCaseArray) {
      let calculation = baseCaseArray;
      function SCI() {
        let key = hasSci(calculation);
        let prev;
        let next;
        let keyIndex;
        let prevKey;
        let nextKey;
        if (key) {
          keyIndex = baseCaseArray.indexOf(key);
          prev = lf.some((x) => x == key) || amS.some((x) => x == key);
          next = rf.some((x) => x == key) || amS.some((x) => x == key);
          prevKey = Number(calculation[keyIndex - 1]);
          nextKey = Number(calculation[keyIndex + 1]);
          if (prev && next) {
            if (key == "pie") {
              if (Number.isNaN(prevKey) && Number.isNaN(nextKey)) {
                let result = ambidextrousSci(key, undefined, undefined);
                calculation.splice(keyIndex, 1, result);
              }
              if (
                Number.isNaN(calculation[keyIndex - 1]) &&
                !Number.isNaN(calculation[keyIndex + 1])
              ) {
                let result = ambidextrousSci(key, undefined, nextKey);
                calculation.splice(keyIndex, 2, result);
              } else {
                let result = ambidextrousSci(key, prevKey, nextKey);
                calculation.splice(keyIndex - 1, 3, result);
              }
            } else {
              if (Number.isNaN(prevKey)) {
                let result = ambidextrousSci(
                  key,
                  undefined,
                  calculation[keyIndex + 1],
                );
                calculation.splice(keyIndex, 2, result);
              } else {
                let result = ambidextrousSci(
                  key,
                  calculation[keyIndex - 1],
                  calculation[keyIndex + 1],
                );
                calculation.splice(keyIndex - 1, 3, result);
              }
            }
          }
          if (prev && !next) {
            let result = leftHandSci(key, calculation[keyIndex - 1]);
            calculation.splice(keyIndex - 1, 2, result);
          }
          if (!prev && next) {
            let result = rightHandSci(key, calculation[keyIndex + 1]);
            calculation.splice(keyIndex, 2, result);
          }
        }
        key = hasSci(calculation);
        if (key) {
          return SCI();
        } else {
          return;
        }
      }
      function DMAS() {
        calculation = divide(calculation);
        calculation = multiply(calculation);
        calculation = add(calculation);
        calculation = substract(calculation);
      }
      SCI();
      DMAS();
      return calculation[0];
    }
    if (hasBracket()) {
      let extracted = extractMinBracketCase();
      let sliced = calculation.slice(extracted.start + 1, extracted.end);
      let result = baseCase(sliced);
      if (Number(calculation[extracted.start - 1]) !== NaN) {
        calculation.splice(
          extracted.start - 1,
          extracted.end + 1 - (extracted.start - 1),
          result * calculation[extracted.start - 1],
        );
      } else {
        calculation.splice(
          extracted.start,
          extracted.end + 1 - extracted.start,
          result,
        );
      }
    }
    if (hasBracket()) {
      return this.getResult(calculation);
    } else {
      return baseCase(calculation);
    }
  }

  delete() {
    if (this.mainArray.length !== 0) {
      this.mainArray.pop();
      if (this.mainArray.length == 0) {
        this.currentValue = undefined;
        this.previousValue = undefined;
      }
      if (this.mainArray.length == 1) {
        this.currentValue = this.mainArray[0];
        this.previousValue = undefined;
      } else {
        this.previousValue = this.mainArray[this.mainArray.length - 2];
        this.currentValue = this.mainArray[this.mainArray.length - 1];
        this.index = this.mainArray.length - 1;
      }
    }
  }
}

export default calcEngine;
