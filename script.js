// Interactive Script for Mathematics LZK 5.9 Preparation

// State containing values and solutions
let state = {
  task1: [],
  task2: [],
  task3: [],
  task4: [],
  task5: {
    'gt': 'groesser',
    'lt': 'kleiner',
    'eq': 'gleich',
    'neq': 'ungleich'
  },
  task6: {
    eq6a: { text: "6 + 3 * 30 = 270", choices: ["(6 + 3) * 30 = 270", "6 + (3 * 30) = 270", "6 + 3 * 30 = 270"], answer: "(6 + 3) * 30 = 270" },
    eq6b: { text: "650 - 500 + 150 = 0", choices: ["(650 - 500) + 150 = 0", "650 - (500 + 150) = 0", "650 - 500 + 150 = 0"], answer: "650 - (500 + 150) = 0" }
  },
  task7: {
    eq7a: { prompt: "500 - ( ? + 80 ) = 120", ans: 300 },
    eq7b: { prompt: "( 200 + ? ) : 30 = 40", ans: 1000 }
  },
  task8: {
    ineq8a: {
      left: 310, target: 540, op: '<',
      candidates: [45, 98, 229, 230, 112, 175, 245, 300],
      answers: [45, 98, 229, 112, 175], // 310 + x < 540 => x < 230
      selected: []
    },
    ineq8b: {
      divisor: 4, target: 20, op: '>',
      candidates: [20, 60, 80, 84, 120, 76, 200, 320],
      answers: [84, 120, 200, 320], // x / 4 > 20 => x > 80
      selected: []
    }
  },
  task9: {
    a: { qty1: 4, price1: 9.60, qty2: 1, price2: 2.40, qty3: 3, price3: 7.20 },
    b: { qty1: 8, price1: 17.60, qty2: 1, price2: 2.20, qty3: 2.5, price3: 5.50 }
  },
  task10: {
    eq10a: { prompt: "300 + ( ( ? - 150 ) : 5 ) = 400", ans: 650 },
    eq10b: { prompt: "8000 - ( 4000 - ( 2000 - ? ) ) = 4800", ans: 1200 }
  },
  task11: [
    { expr: "5 + ( ( ( 3 * ( 2 + 1 ) ) + 1 ) * 2 )", ans: 25 },
    { expr: "( ( 4 + ( 3 - 1 ) ) * 3 ) - ( 5 * ( 4 - 2 ) )", ans: 8 }
  ],
  task12: {
    rate: 1.1, // 100 EUR = 110 CHF
    hotelEur: 600, hotelChf: 660,
    reiseEur: 150, reiseChf: 165,
    essenEur: 250, essenChf: 275
  },
  scores: {
    task1: 0,
    task2: 0,
    task3: 0,
    task4: 0,
    task5: 0,
    task6: 0,
    task7: 0,
    task8: 0,
    task9: 0,
    task10: 0,
    task11: 0,
    task12: 0
  }
};

// Maximum points per task
const maxPoints = {
  task1: 2,
  task2: 2,
  task3: 2,
  task4: 2,
  task5: 1,
  task6: 1,
  task7: 2,
  task8: 2,
  task9: 4,
  task10: 2,
  task11: 2,
  task12: 2
};

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  generateAllTasks();
});

// Setup tab navigation
function setupTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const contents = document.querySelectorAll(".tab-content");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      
      tab.classList.add("active");
      const target = tab.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });
}

// Float rounding utility to avoid JavaScript precision issues (e.g. 0.1 + 0.2 = 0.300000004)
function roundVal(num, decimals = 4) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Generate tasks with clean random numbers
function generateAllTasks() {
  // Reset selected arrays for chips
  state.task8.ineq8a.selected = [];
  state.task8.ineq8b.selected = [];

  // Task 1: Addition & Subtraction of decimals
  // We want clean values to avoid strange fractions
  const t1Data = [
    { a: 3.6, b: 0.8, op: "+", ans: 4.4 },
    { a: 6.4, b: 0.9, op: "-", ans: 5.5 },
    { a: 4.25, b: 0.6, op: "+", ans: 4.85 },
    { a: 0.85, b: 0.34, op: "-", ans: 0.51 },
    { a: 0.606, b: 0.394, op: "+", ans: 1 },
    { a: 7.02, b: 0.5, op: "-", ans: 6.52 },
    { a: 0.73, b: 0.7, op: "+", ans: 1.43 },
    { a: 4.308, b: 2.2, op: "-", ans: 2.108 }
  ];
  state.task1 = t1Data.map(d => ({...d, user: ""}));

  // Task 2: Multiplications and divisions with 10, 100, 1000
  const t2Data = [
    { a: 10, b: 0.007, op: "*", ans: 0.07, sign: "·" },
    { a: 4, b: 10, op: "/", ans: 0.4, sign: ":" },
    { a: 100, b: 0.08, op: "*", ans: 8, sign: "·" },
    { a: 7, b: 100, op: "/", ans: 0.07, sign: ":" },
    { a: 100, b: 0.6, op: "*", ans: 60, sign: "·" },
    { a: 8.3, b: 10, op: "/", ans: 0.83, sign: ":" },
    { a: 1000, b: 0.04, op: "*", ans: 40, sign: "·" },
    { a: 2.5, b: 1000, op: "/", ans: 0.0025, sign: ":" }
  ];
  state.task2 = t2Data.map(d => ({...d, user: ""}));

  // Task 3: Multiplication with factors of multiples of 10 or 100
  const t3Data = [
    { a: 4, b: 0.08, ans: 0.32 },
    { a: 80, b: 0.03, ans: 2.4 },
    { a: 7, b: 0.6, ans: 4.2 },
    { a: 400, b: 0.06, ans: 24 }
  ];
  state.task3 = t3Data.map(d => ({...d, user: ""}));

  // Task 4: Division of decimals with multiples of 10 or 100
  const t4Data = [
    { a: 1.8, b: 6, ans: 0.3 },
    { a: 3.6, b: 40, ans: 0.09 },
    { a: 0.35, b: 7, ans: 0.05 },
    { a: 18, b: 60, ans: 0.3 }
  ];
  state.task4 = t4Data.map(d => ({...d, user: ""}));

  // Render elements in DOM
  renderTask1();
  renderTask2();
  renderTask3();
  renderTask4();
  renderTask6Choices();
  renderTask7Elements();
  renderTask8Chips();
  renderTask10Elements();
  renderTask11Elements();
  
  // Clear other user fields/feedback
  document.querySelectorAll("input").forEach(input => {
    if(!input.classList.contains("input-readonly")) {
      input.value = "";
      input.classList.remove("correct", "incorrect");
    }
  });
  
  document.querySelectorAll("select").forEach(select => {
    select.value = "";
    select.classList.remove("correct", "incorrect");
  });

  document.querySelectorAll(".feedback").forEach(f => {
    f.innerHTML = "";
    f.className = "feedback";
  });
  
  updateDashboard();
}

// Reset everything
window.resetAllTasks = function() {
  generateAllTasks();
};

// Renders
function renderTask1() {
  const container = document.getElementById("task1-list");
  container.innerHTML = "";
  state.task1.forEach((t, i) => {
    container.innerHTML += `
      <div class="subtask-row">
        <span class="subtask-label">${t.a} ${t.op} ${t.b} =</span>
        <input type="number" step="any" class="math-input" id="t1-${i}">
      </div>
    `;
  });
}

function renderTask2() {
  const container = document.getElementById("task2-list");
  container.innerHTML = "";
  state.task2.forEach((t, i) => {
    let mathStr = t.op === "*" ? `${t.a} ${t.sign} ${t.b}` : `${t.a} ${t.sign} ${t.b}`;
    container.innerHTML += `
      <div class="subtask-row">
        <span class="subtask-label">${mathStr} =</span>
        <input type="number" step="any" class="math-input" id="t2-${i}">
      </div>
    `;
  });
}

function renderTask3() {
  const container = document.getElementById("task3-list");
  container.innerHTML = "";
  state.task3.forEach((t, i) => {
    container.innerHTML += `
      <div class="subtask-row">
        <span class="subtask-label">${t.a} · ${t.b} =</span>
        <input type="number" step="any" class="math-input" id="t3-${i}">
      </div>
    `;
  });
}

function renderTask4() {
  const container = document.getElementById("task4-list");
  container.innerHTML = "";
  state.task4.forEach((t, i) => {
    container.innerHTML += `
      <div class="subtask-row">
        <span class="subtask-label">${t.a} : ${t.b} =</span>
        <input type="number" step="any" class="math-input" id="t4-${i}">
      </div>
    `;
  });
}

function renderTask6Choices() {
  const sA = document.getElementById("eq6a-select");
  const sB = document.getElementById("eq6b-select");
  
  sA.innerHTML = '<option value="">-- Klammerung wählen --</option>';
  state.task6.eq6a.choices.forEach(c => {
    sA.innerHTML += `<option value="${c}">${c}</option>`;
  });
  
  sB.innerHTML = '<option value="">-- Klammerung wählen --</option>';
  state.task6.eq6b.choices.forEach(c => {
    sB.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

function renderTask7Elements() {
  const cA = document.getElementById("eq7a-container");
  const cB = document.getElementById("eq7b-container");
  
  cA.innerHTML = `
    <span class="eq-expression">500 - ( <span class="placeholder-box">?</span> + 80 ) = 120</span>
    <input type="number" class="math-input" id="eq7a-input" placeholder="?">
  `;
  cB.innerHTML = `
    <span class="eq-expression">( 200 + <span class="placeholder-box">?</span> ) : 30 = 40</span>
    <input type="number" class="math-input" id="eq7b-input" placeholder="?">
  `;
}

function renderTask8Chips() {
  const cA = document.getElementById("ineq8a-chips");
  const cB = document.getElementById("ineq8b-chips");
  
  cA.innerHTML = "";
  state.task8.ineq8a.candidates.forEach(num => {
    cA.innerHTML += `<div class="chip" id="t8a-chip-${num}" onclick="toggleChip('ineq8a', ${num})">${num}</div>`;
  });

  cB.innerHTML = "";
  state.task8.ineq8b.candidates.forEach(num => {
    cB.innerHTML += `<div class="chip" id="t8b-chip-${num}" onclick="toggleChip('ineq8b', ${num})">${num}</div>`;
  });
}

window.toggleChip = function(taskKey, number) {
  const ineq = state.task8[taskKey];
  const chipElement = document.getElementById(taskKey === 'ineq8a' ? `t8a-chip-${number}` : `t8b-chip-${number}`);
  
  const index = ineq.selected.indexOf(number);
  if (index === -1) {
    ineq.selected.push(number);
    chipElement.classList.add("selected");
  } else {
    ineq.selected.splice(index, 1);
    chipElement.classList.remove("selected");
  }
};

function renderTask10Elements() {
  const cA = document.getElementById("eq10a-container");
  const cB = document.getElementById("eq10b-container");
  
  cA.innerHTML = `
    <span class="eq-expression">300 + ( ( <span class="placeholder-box">?</span> - 150 ) : 5 ) = 400</span>
    <input type="number" class="math-input" id="eq10a-input" placeholder="?">
  `;
  cB.innerHTML = `
    <span class="eq-expression">8000 - ( 4000 - ( 2000 - <span class="placeholder-box">?</span> ) ) = 4800</span>
    <input type="number" class="math-input" id="eq10b-input" placeholder="?">
  `;
}

function renderTask11Elements() {
  const container = document.getElementById("task11-list");
  container.innerHTML = "";
  state.task11.forEach((t, i) => {
    container.innerHTML += `
      <div class="subtask-row">
        <span class="subtask-label" style="font-size: 0.85rem;">${t.expr} =</span>
        <input type="number" class="math-input" id="t11-${i}">
      </div>
    `;
  });
}


// CHECKERS
window.checkTask1 = function() {
  let correctCount = 0;
  state.task1.forEach((t, i) => {
    const input = document.getElementById(`t1-${i}`);
    const userVal = parseFloat(input.value);
    if (!isNaN(userVal) && roundVal(userVal) === roundVal(t.ans)) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
      correctCount++;
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
    }
  });

  const feed = document.getElementById("feedback-1");
  if (correctCount === state.task1.length) {
    state.scores.task1 = maxPoints.task1;
    feed.className = "feedback correct";
    feed.innerHTML = "Richtig! 🎉 (+2 P.)";
  } else {
    state.scores.task1 = Math.round((correctCount / state.task1.length) * maxPoints.task1);
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von ${state.task1.length} richtig gelöst. (+${state.scores.task1} P.)`;
  }
  updateDashboard();
};

window.checkTask2 = function() {
  let correctCount = 0;
  state.task2.forEach((t, i) => {
    const input = document.getElementById(`t2-${i}`);
    const userVal = parseFloat(input.value);
    if (!isNaN(userVal) && roundVal(userVal) === roundVal(t.ans)) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
      correctCount++;
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
    }
  });

  const feed = document.getElementById("feedback-2");
  if (correctCount === state.task2.length) {
    state.scores.task2 = maxPoints.task2;
    feed.className = "feedback correct";
    feed.innerHTML = "Perfekt! 🎉 (+2 P.)";
  } else {
    state.scores.task2 = Math.round((correctCount / state.task2.length) * maxPoints.task2);
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von ${state.task2.length} richtig. (+${state.scores.task2} P.)`;
  }
  updateDashboard();
};

window.checkTask3 = function() {
  let correctCount = 0;
  state.task3.forEach((t, i) => {
    const input = document.getElementById(`t3-${i}`);
    const userVal = parseFloat(input.value);
    if (!isNaN(userVal) && roundVal(userVal) === roundVal(t.ans)) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
      correctCount++;
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
    }
  });

  const feed = document.getElementById("feedback-3");
  if (correctCount === state.task3.length) {
    state.scores.task3 = maxPoints.task3;
    feed.className = "feedback correct";
    feed.innerHTML = "Richtig! 🎉 (+2 P.)";
  } else {
    state.scores.task3 = Math.round((correctCount / state.task3.length) * maxPoints.task3);
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von ${state.task3.length} richtig. (+${state.scores.task3} P.)`;
  }
  updateDashboard();
};

window.checkTask4 = function() {
  let correctCount = 0;
  state.task4.forEach((t, i) => {
    const input = document.getElementById(`t4-${i}`);
    const userVal = parseFloat(input.value);
    if (!isNaN(userVal) && roundVal(userVal) === roundVal(t.ans)) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
      correctCount++;
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
    }
  });

  const feed = document.getElementById("feedback-4");
  if (correctCount === state.task4.length) {
    state.scores.task4 = maxPoints.task4;
    feed.className = "feedback correct";
    feed.innerHTML = "Super! 🎉 (+2 P.)";
  } else {
    state.scores.task4 = Math.round((correctCount / state.task4.length) * maxPoints.task4);
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von ${state.task4.length} richtig. (+${state.scores.task4} P.)`;
  }
  updateDashboard();
};

window.checkTask5 = function() {
  let correctCount = 0;
  const selectGt = document.getElementById("match-gt");
  const selectLt = document.getElementById("match-lt");
  const selectEq = document.getElementById("match-eq");
  const selectNeq = document.getElementById("match-neq");

  const selects = [
    { el: selectGt, key: "gt" },
    { el: selectLt, key: "lt" },
    { el: selectEq, key: "eq" },
    { el: selectNeq, key: "neq" }
  ];

  selects.forEach(item => {
    if (item.el.value === state.task5[item.key]) {
      item.el.classList.remove("incorrect");
      item.el.classList.add("correct");
      correctCount++;
    } else {
      item.el.classList.remove("correct");
      item.el.classList.add("incorrect");
    }
  });

  const feed = document.getElementById("feedback-5");
  if (correctCount === 4) {
    state.scores.task5 = maxPoints.task5;
    feed.className = "feedback correct";
    feed.innerHTML = "Richtig! 🎉 (+1 P.)";
  } else {
    state.scores.task5 = 0;
    feed.className = "feedback incorrect";
    feed.innerHTML = "Einige Zuweisungen stimmen noch nicht.";
  }
  updateDashboard();
};

window.checkTask6 = function() {
  let correctCount = 0;
  const sA = document.getElementById("eq6a-select");
  const sB = document.getElementById("eq6b-select");

  if (sA.value === state.task6.eq6a.answer) {
    sA.classList.add("correct");
    sA.classList.remove("incorrect");
    correctCount++;
  } else {
    sA.classList.remove("correct");
    sA.classList.add("incorrect");
  }

  if (sB.value === state.task6.eq6b.answer) {
    sB.classList.add("correct");
    sB.classList.remove("incorrect");
    correctCount++;
  } else {
    sB.classList.remove("correct");
    sB.classList.add("incorrect");
  }

  const feed = document.getElementById("feedback-6");
  if (correctCount === 2) {
    state.scores.task6 = maxPoints.task6;
    feed.className = "feedback correct";
    feed.innerHTML = "Richtig! 🎉 (+1 P.)";
  } else {
    state.scores.task6 = 0;
    feed.className = "feedback incorrect";
    feed.innerHTML = "Mindestens eine Klammerung ist fehlerhaft.";
  }
  updateDashboard();
};

window.checkTask7 = function() {
  let correctCount = 0;
  const inA = document.getElementById("eq7a-input");
  const inB = document.getElementById("eq7b-input");

  if (parseInt(inA.value) === state.task7.eq7a.ans) {
    inA.classList.add("correct");
    inA.classList.remove("incorrect");
    correctCount++;
  } else {
    inA.classList.remove("correct");
    inA.classList.add("incorrect");
  }

  if (parseInt(inB.value) === state.task7.eq7b.ans) {
    inB.classList.add("correct");
    inB.classList.remove("incorrect");
    correctCount++;
  } else {
    inB.classList.remove("correct");
    inB.classList.add("incorrect");
  }

  const feed = document.getElementById("feedback-7");
  if (correctCount === 2) {
    state.scores.task7 = maxPoints.task7;
    feed.className = "feedback correct";
    feed.innerHTML = "Beide richtig! 🎉 (+2 P.)";
  } else {
    state.scores.task7 = Math.round((correctCount / 2) * maxPoints.task7);
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von 2 richtig. (+${state.scores.task7} P.)`;
  }
  updateDashboard();
};

window.checkTask8 = function() {
  let points = 0;
  const feed = document.getElementById("feedback-8");

  // Helper function to evaluate one inequality subsection
  function checkIneq(key, chipPrefix, pointsWeight) {
    const ineq = state.task8[key];
    let correctSelections = 0;
    let incorrectSelections = 0;
    let missedCorrect = 0;

    ineq.candidates.forEach(num => {
      const isSelected = ineq.selected.includes(num);
      const isCorrect = ineq.answers.includes(num);
      const chipEl = document.getElementById(`${chipPrefix}-chip-${num}`);
      
      // Remove previous evaluation classes
      chipEl.classList.remove("correct-selected", "incorrect-selected", "missed");

      if (isSelected && isCorrect) {
        chipEl.classList.add("correct-selected");
        correctSelections++;
      } else if (isSelected && !isCorrect) {
        chipEl.classList.add("incorrect-selected");
        incorrectSelections++;
      } else if (!isSelected && isCorrect) {
        chipEl.classList.add("missed"); // Das wäre richtig gewesen
        missedCorrect++;
      }
    });

    // Sub score check: all correct selected, no incorrect selected
    if (incorrectSelections === 0 && missedCorrect === 0) {
      return pointsWeight; // Full points for this subtask
    } else if (correctSelections > 0 && incorrectSelections < correctSelections) {
      return pointsWeight / 2; // Half points if partial correct
    }
    return 0;
  }

  const ptsA = checkIneq('ineq8a', 't8a', 1);
  const ptsB = checkIneq('ineq8b', 't8b', 1);
  
  points = ptsA + ptsB;
  state.scores.task8 = points;

  if (points === maxPoints.task8) {
    feed.className = "feedback correct";
    feed.innerHTML = "Perfekt gelöst! 🎉 (+2 P.)";
  } else if (points > 0) {
    feed.className = "feedback incorrect";
    feed.innerHTML = `Teilweise gelöst. (+${points} P.) Umrandete Zahlen fehlen noch.`;
  } else {
    feed.className = "feedback incorrect";
    feed.innerHTML = "Ungleichungen stimmen noch nicht.";
  }
  updateDashboard();
};

window.checkTask9 = function() {
  let correctItems = 0;
  const feed = document.getElementById("feedback-9");

  // Subtask A
  const p9a_q2 = document.getElementById("p9a-q2");
  const p9a_p2 = document.getElementById("p9a-p2");
  const p9a_q3 = document.getElementById("p9a-q3");
  const p9a_p3 = document.getElementById("p9a-p3");

  const ta = state.task9.a;
  
  // Row 2 checking (Unit value)
  if (parseFloat(p9a_q2.value) === ta.qty2) {
    p9a_q2.className = "correct";
    correctItems++;
  } else { p9a_q2.className = "incorrect"; }

  if (parseFloat(p9a_p2.value) === ta.price2) {
    p9a_p2.className = "correct";
    correctItems++;
  } else { p9a_p2.className = "incorrect"; }

  // Row 3 checking (Final values)
  if (parseFloat(p9a_q3.value) === ta.qty3) {
    p9a_q3.className = "correct";
    correctItems++;
  } else { p9a_q3.className = "incorrect"; }

  if (parseFloat(p9a_p3.value) === ta.price3) {
    p9a_p3.className = "correct";
    correctItems++;
  } else { p9a_p3.className = "incorrect"; }

  // Subtask B
  const p9b_q2 = document.getElementById("p9b-q2");
  const p9b_p2 = document.getElementById("p9b-p2");
  const p9b_q3 = document.getElementById("p9b-q3");
  const p9b_p3 = document.getElementById("p9b-p3");

  const tb = state.task9.b;

  if (parseFloat(p9b_q2.value) === tb.qty2) {
    p9b_q2.className = "correct";
    correctItems++;
  } else { p9b_q2.className = "incorrect"; }

  if (parseFloat(p9b_p2.value) === tb.price2) {
    p9b_p2.className = "correct";
    correctItems++;
  } else { p9b_p2.className = "incorrect"; }

  if (parseFloat(p9b_q3.value) === tb.qty3) {
    p9b_q3.className = "correct";
    correctItems++;
  } else { p9b_q3.className = "incorrect"; }

  if (parseFloat(p9b_p3.value) === tb.price3) {
    p9b_p3.className = "correct";
    correctItems++;
  } else { p9b_p3.className = "incorrect"; }

  // 8 inputs total, 4 points max => 0.5 points per correct input.
  const score = Math.floor(correctItems * 0.5);
  state.scores.task9 = score;

  if (correctItems === 8) {
    feed.className = "feedback correct";
    feed.innerHTML = "Tabelle perfekt ausgefüllt! 🍉 (+4 P.)";
  } else {
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctItems} von 8 Feldern richtig. (+${score} P.)`;
  }
  updateDashboard();
};

window.checkTask10 = function() {
  let correctCount = 0;
  const inA = document.getElementById("eq10a-input");
  const inB = document.getElementById("eq10b-input");

  if (parseInt(inA.value) === state.task10.eq10a.ans) {
    inA.classList.add("correct");
    inA.classList.remove("incorrect");
    correctCount++;
  } else {
    inA.classList.remove("correct");
    inA.classList.add("incorrect");
  }

  if (parseInt(inB.value) === state.task10.eq10b.ans) {
    inB.classList.add("correct");
    inB.classList.remove("incorrect");
    correctCount++;
  } else {
    inB.classList.remove("correct");
    inB.classList.add("incorrect");
  }

  const feed = document.getElementById("feedback-10");
  if (correctCount === 2) {
    state.scores.task10 = maxPoints.task10;
    feed.className = "feedback correct";
    feed.innerHTML = "Beide gelöst! 🎉 (+2 P.)";
  } else {
    state.scores.task10 = Math.round((correctCount / 2) * maxPoints.task10);
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von 2 richtig. (+${state.scores.task10} P.)`;
  }
  updateDashboard();
};

window.checkTask11 = function() {
  let correctCount = 0;
  state.task11.forEach((t, i) => {
    const input = document.getElementById(`t11-${i}`);
    const userVal = parseInt(input.value);
    if (!isNaN(userVal) && userVal === t.ans) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
      correctCount++;
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
    }
  });

  const feed = document.getElementById("feedback-11");
  if (correctCount === state.task11.length) {
    state.scores.task11 = maxPoints.task11;
    feed.className = "feedback correct";
    feed.innerHTML = "Hervorragend! 🎉 (+2 P.)";
  } else {
    state.scores.task11 = Math.round((correctCount / state.task11.length) * maxPoints.task11);
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von ${state.task11.length} richtig. (+${state.scores.task11} P.)`;
  }
  updateDashboard();
};

window.checkTask12 = function() {
  let correctCount = 0;
  const feed = document.getElementById("feedback-12");

  const pHotel = document.getElementById("p12-val-hotel-chf");
  const pReise = document.getElementById("p12-val-reise-chf");
  const pEssen = document.getElementById("p12-val-essen-chf");

  if (parseFloat(pHotel.value) === state.task12.hotelChf) {
    pHotel.className = "correct";
    correctCount++;
  } else { pHotel.className = "incorrect"; }

  if (parseFloat(pReise.value) === state.task12.reiseChf) {
    pReise.className = "correct";
    correctCount++;
  } else { pReise.className = "incorrect"; }

  if (parseFloat(pEssen.value) === state.task12.essenChf) {
    pEssen.className = "correct";
    correctCount++;
  } else { pEssen.className = "incorrect"; }

  // Total 3 subtasks, weight is 2 points
  const points = Math.round((correctCount / 3) * maxPoints.task12);
  state.scores.task12 = points;

  if (correctCount === 3) {
    feed.className = "feedback correct";
    feed.innerHTML = "Währungsrechner komplett gelöst! 💸 (+2 P.)";
  } else {
    feed.className = "feedback incorrect";
    feed.innerHTML = `${correctCount} von 3 Beträgen richtig umgerechnet. (+${points} P.)`;
  }
  updateDashboard();
};

// Update scoring display and progress
function updateDashboard() {
  let currentScore = 0;
  let totalMax = 0;
  
  for (const key in state.scores) {
    currentScore += state.scores[key];
    totalMax += maxPoints[key];
  }
  
  document.getElementById("scoreDisplay").textContent = `${currentScore} / ${totalMax} P.`;
  
  // Calculate completion percentage based on tasks checked (non-zero score counts as progress)
  let tasksAttempted = 0;
  const totalTasks = Object.keys(state.scores).length;
  for (const key in state.scores) {
    if (state.scores[key] > 0 || document.getElementById(`feedback-${key.replace('task', '')}`)?.innerHTML !== "") {
      // If user has feedback message, they attempted it
      if (document.getElementById(`feedback-${key.replace('task', '')}`)?.innerHTML !== "") {
        tasksAttempted++;
      }
    }
  }
  
  const percentage = Math.round((tasksAttempted / totalTasks) * 100);
  document.getElementById("progressBar").style.width = `${percentage}%`;
  document.getElementById("progressText").textContent = `${percentage}% bearbeitet`;
}
