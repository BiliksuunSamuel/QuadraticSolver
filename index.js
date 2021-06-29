const constA = document.getElementById("number1");
const constB = document.getElementById("number2");
const constC = document.getElementById("number3");
const constantA = document.querySelector(".constantA");
const constantB = document.querySelector(".constantB");
const constantC = document.querySelector(".constantC");
///
const results = document.querySelector(".results");
const eqn = document.querySelector(".equation");

const answerbtn = document.querySelector(".answer");

//
answerbtn.addEventListener("click", function () {
  const a = constA.value;
  const b = constB.value;
  const c = constC.value;
  const validationResults = validateInput(a, b, c);
  if (validationResults) {
    generateEquation(a, b, c);
    const det = computeDeterminant(a, b, c);
    const realpart = computeRealPart(a, b);
    //number.toFixed() is used to format decimal place in javascript
    if (a == 0) {
      let ans = FirstConstantZero(b, c);
      results.innerHTML = `x=> ${ans.x}`;
    } else {
      if (det < 0) {
        let ans = ComplexRoots(realpart, det, a);
        results.innerHTML = `x=> ${ans.x1},${ans.x2}`;
      } else if (det > 0) {
        let ans = RealDistinctRoots(realpart, det, a);
        results.innerHTML = `x=> ${ans.x1},${ans.x2}`;
      } else if (det == 0) {
        let ans = EqualRoots(realpart);
        results.innerHTML = `x=> ${ans.x1},${ans.x2}`;
      }
    }
  } else {
    alert("please provide equation values");
  }
});

///FUNCTION TO COMPUTE THE DETERMINANT OF THE EQUATION
function computeDeterminant(a, b, c) {
  const determinant = b ** 2 - 4 * a * c;
  return determinant;
}

///COMPUTE THE REAL PART SOLUTION OF THE EQUATION
function computeRealPart(a, b) {
  const realpart = -b / (2 * a);
  return realpart;
}

///VALIDATE ALL THE INPUTS
function validateInput(a, b, c) {
  if (a == null || a.length <= 0) {
    constA.focus();
    return false;
  } else if (b == null || b.length <= 0) {
    constB.focus();
    return false;
  } else if (c == null || c.length <= 0) {
    constC.focus();
    return false;
  } else {
    return true;
  }
}
////FUNCTION TO GENERATE THE EQUATION
function generateEquation(a, b, c) {
  if (b < 0 && c < 0) {
    constantB.innerHTML = `${b}x`;
    constantC.innerHTML = `${c}=0`;
    constantA.innerHTML = `${a}`;
  } else if (b > 0 && c < 0) {
    constantB.innerHTML = `+${b}x`;
    constantC.innerHTML = `${c}=0`;
    constantA.innerHTML = `${a}`;
  } else if (b < 0 && c > 0) {
    constantB.innerHTML = `${b}x`;
    constantC.innerHTML = `+${c}=0`;
    constantA.innerHTML = `${a}`;
  } else if (b > 0 && c > 0) {
    constantB.innerHTML = `+${b}x`;
    constantC.innerHTML = `+${c}=0`;
    constantA.innerHTML = `${a}`;
  } else {
    constantB.innerHTML = `+${b}x`;
    constantC.innerHTML = `+${c}=0`;
    constantA.innerHTML = `${a}`;
  }
}

////FUNCTION TO COMPUTE THE COMPLEX ROOTS
function ComplexRoots(realpart, det, a) {
  const determinant = (Math.sqrt(-1 * det) / (2 * a)).toFixed(3);
  return {
    x1: `${realpart.toFixed(3)}+${determinant}i`,
    x2: `${realpart.toFixed(3)}-${determinant}i`,
  };
}

////FUNCTION TO COMPUTE EQUAL ROOTS
function EqualRoots(realpart) {
  return { x1: realpart, x2: realpart };
}
////FUNCTION TO COMPUTE THE REAL DISTINCT ROOTS
function RealDistinctRoots(realpart, determinant, a) {
  const det = Math.sqrt(determinant) / (2 * a);
  return {
    x1: `${(realpart + det).toFixed(3)}`,
    x2: `${(realpart - det).toFixed(3)}`,
  };
}

////FUNCTION WHEN THE VALUE OF THE CONSTANT A IS 0
function FirstConstantZero(b, c) {
  return { x: ((-1 * c) / b).toFixed(3) };
}
