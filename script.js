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
  initTheme();
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

// Theme Toggle Logic
window.toggleTheme = function() {
  const body = document.body;
  const btn = document.getElementById("themeToggleBtn");
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    if (btn) btn.innerHTML = "Heller Modus ☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light-mode");
    if (btn) btn.innerHTML = "Dunkler Modus 🌙";
    localStorage.setItem("theme", "light");
  }
};

// Check theme on load
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const btn = document.getElementById("themeToggleBtn");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    if (btn) btn.innerHTML = "Dunkler Modus 🌙";
  } else {
    body.classList.remove("light-mode");
    if (btn) btn.innerHTML = "Heller Modus ☀️";
  }
}

// Float rounding utility to avoid JavaScript precision issues (e.g. 0.1 + 0.2 = 0.300000004)
function roundVal(num, decimals = 4) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Generate tasks with clean random numbers
function generateAllTasks() {
  // Reset scores
  for (const key in state.scores) {
    state.scores[key] = 0;
  }

  // Task 1: Addition & Subtraction of decimals
  state.task1 = [];
  // 1. a.b + 0.c
  let t1_a1 = roundVal(Math.floor(Math.random() * 40 + 10) / 10);
  let t1_b1 = roundVal(Math.floor(Math.random() * 8 + 2) / 10);
  state.task1.push({ a: t1_a1, b: t1_b1, op: "+", ans: roundVal(t1_a1 + t1_b1) });
  // 2. a.b - 0.c
  let t1_a2 = roundVal(Math.floor(Math.random() * 50 + 50) / 10);
  let t1_b2 = roundVal(Math.floor(Math.random() * 8 + 2) / 10);
  state.task1.push({ a: t1_a2, b: t1_b2, op: "-", ans: roundVal(t1_a2 - t1_b2) });
  // 3. a.bc + 0.d
  let t1_a3 = roundVal(Math.floor(Math.random() * 300 + 100) / 100);
  let t1_b3 = roundVal(Math.floor(Math.random() * 8 + 2) / 10);
  state.task1.push({ a: t1_a3, b: t1_b3, op: "+", ans: roundVal(t1_a3 + t1_b3) });
  // 4. 0.ab - 0.cd
  let t1_a4 = roundVal(Math.floor(Math.random() * 40 + 50) / 100);
  let t1_b4 = roundVal(Math.floor(Math.random() * 30 + 10) / 100);
  state.task1.push({ a: t1_a4, b: t1_b4, op: "-", ans: roundVal(t1_a4 - t1_b4) });
  // 5. 0.abc + 0.def
  let t1_a5 = roundVal(Math.floor(Math.random() * 500 + 200) / 1000);
  let t1_b5 = roundVal(Math.floor(Math.random() * 200 + 200) / 1000);
  state.task1.push({ a: t1_a5, b: t1_b5, op: "+", ans: roundVal(t1_a5 + t1_b5) });
  // 6. a.0b - 0.c
  let t1_a6 = roundVal((Math.floor(Math.random() * 5 + 2) * 100 + Math.floor(Math.random() * 9 + 1)) / 100);
  let t1_b6 = roundVal(Math.floor(Math.random() * 8 + 2) / 10);
  state.task1.push({ a: t1_a6, b: t1_b6, op: "-", ans: roundVal(t1_a6 - t1_b6) });
  // 7. 0.ab + 0.c
  let t1_a7 = roundVal(Math.floor(Math.random() * 50 + 40) / 100);
  let t1_b7 = roundVal(Math.floor(Math.random() * 8 + 2) / 10);
  state.task1.push({ a: t1_a7, b: t1_b7, op: "+", ans: roundVal(t1_a7 + t1_b7) });
  // 8. a.bcd - b.c
  let t1_a8 = roundVal(Math.floor(Math.random() * 3000 + 2000) / 1000);
  let t1_b8 = roundVal(Math.floor(Math.random() * 15 + 10) / 10);
  state.task1.push({ a: t1_a8, b: t1_b8, op: "-", ans: roundVal(t1_a8 - t1_b8) });

  // Task 2: Multiplications and divisions with 10, 100, 1000
  state.task2 = [];
  // 1. 10 * 0.00c
  let t2_c1 = Math.floor(Math.random() * 8 + 2);
  state.task2.push({ a: 10, b: roundVal(t2_c1 / 1000), op: "*", ans: roundVal(10 * (t2_c1 / 1000)), sign: "·" });
  // 2. a : 10
  let t2_c2 = Math.floor(Math.random() * 8 + 2);
  state.task2.push({ a: t2_c2, b: 10, op: "/", ans: roundVal(t2_c2 / 10), sign: ":" });
  // 3. 100 * 0.0c
  let t2_c3 = Math.floor(Math.random() * 8 + 2);
  state.task2.push({ a: 100, b: roundVal(t2_c3 / 100), op: "*", ans: roundVal(100 * (t2_c3 / 100)), sign: "·" });
  // 4. a : 100
  let t2_c4 = Math.floor(Math.random() * 8 + 2);
  state.task2.push({ a: t2_c4, b: 100, op: "/", ans: roundVal(t2_c4 / 100), sign: ":" });
  // 5. 100 * 0.c
  let t2_c5 = Math.floor(Math.random() * 8 + 2);
  state.task2.push({ a: 100, b: roundVal(t2_c5 / 10), op: "*", ans: roundVal(100 * (t2_c5 / 10)), sign: "·" });
  // 6. a.b : 10
  let t2_c6_a = Math.floor(Math.random() * 8 + 2);
  let t2_c6_b = Math.floor(Math.random() * 8 + 2);
  let t2_num6 = roundVal(t2_c6_a + t2_c6_b / 10);
  state.task2.push({ a: t2_num6, b: 10, op: "/", ans: roundVal(t2_num6 / 10), sign: ":" });
  // 7. 1000 * 0.0c
  let t2_c7 = Math.floor(Math.random() * 8 + 2);
  state.task2.push({ a: 1000, b: roundVal(t2_c7 / 100), op: "*", ans: roundVal(1000 * (t2_c7 / 100)), sign: "·" });
  // 8. a.b : 1000
  let t2_c8_a = Math.floor(Math.random() * 8 + 2);
  let t2_c8_b = Math.floor(Math.random() * 8 + 2);
  let t2_num8 = roundVal(t2_c8_a + t2_c8_b / 10);
  state.task2.push({ a: t2_num8, b: 1000, op: "/", ans: roundVal(t2_num8 / 1000), sign: ":" });

  // Task 3: Multiplication with factors of multiples of 10 or 100
  state.task3 = [];
  let t3_a1 = Math.floor(Math.random() * 6 + 3);
  let t3_b1 = Math.floor(Math.random() * 8 + 2) / 100;
  state.task3.push({ a: t3_a1, b: roundVal(t3_b1), ans: roundVal(t3_a1 * t3_b1) });
  let t3_a2 = Math.floor(Math.random() * 8 + 2) * 10;
  let t3_b2 = Math.floor(Math.random() * 8 + 2) / 100;
  state.task3.push({ a: t3_a2, b: roundVal(t3_b2), ans: roundVal(t3_a2 * t3_b2) });
  let t3_a3 = Math.floor(Math.random() * 6 + 3);
  let t3_b3 = Math.floor(Math.random() * 8 + 2) / 10;
  state.task3.push({ a: t3_a3, b: roundVal(t3_b3), ans: roundVal(t3_a3 * t3_b3) });
  let t3_a4 = Math.floor(Math.random() * 6 + 2) * 100;
  let t3_b4 = Math.floor(Math.random() * 8 + 2) / 100;
  state.task3.push({ a: t3_a4, b: roundVal(t3_b4), ans: roundVal(t3_a4 * t3_b4) });

  // Task 4: Division of decimals with multiples of 10 or 100
  state.task4 = [];
  let t4_c1 = Math.floor(Math.random() * 5 + 3);
  let t4_ans1 = Math.floor(Math.random() * 5 + 2) / 10;
  state.task4.push({ a: roundVal(t4_c1 * t4_ans1), b: t4_c1, ans: t4_ans1 });
  let t4_c2_base = Math.floor(Math.random() * 4 + 2);
  let t4_c2 = t4_c2_base * 10;
  let t4_ans2 = Math.floor(Math.random() * 7 + 2) / 100;
  state.task4.push({ a: roundVal(t4_c2 * t4_ans2), b: t4_c2, ans: t4_ans2 });
  let t4_c3 = Math.floor(Math.random() * 5 + 4);
  let t4_ans3 = Math.floor(Math.random() * 7 + 2) / 100;
  state.task4.push({ a: roundVal(t4_c3 * t4_ans3), b: t4_c3, ans: t4_ans3 });
  let t4_c4_base = Math.floor(Math.random() * 4 + 3);
  let t4_c4 = t4_c4_base * 10;
  let t4_ans4 = Math.floor(Math.random() * 6 + 2) / 10;
  state.task4.push({ a: roundVal(t4_c4 * t4_ans4), b: t4_c4, ans: t4_ans4 });

  // Task 6: Brackets
  const eq6aList = [
    { text: "5 + 4 * 40 = 360", choices: ["(5 + 4) * 40 = 360", "5 + (4 * 40) = 360", "5 + 4 * 40 = 360"], answer: "(5 + 4) * 40 = 360" },
    { text: "6 + 3 * 30 = 270", choices: ["(6 + 3) * 30 = 270", "6 + (3 * 30) = 270", "6 + 3 * 30 = 270"], answer: "(6 + 3) * 30 = 270" },
    { text: "7 + 2 * 50 = 450", choices: ["(7 + 2) * 50 = 450", "7 + (2 * 50) = 450", "7 + 2 * 50 = 450"], answer: "(7 + 2) * 50 = 450" }
  ];
  const eq6bList = [
    { text: "480 - 400 + 80 = 0", choices: ["(480 - 400) + 80 = 0", "480 - (400 + 80) = 0", "480 - 400 + 80 = 0"], answer: "480 - (400 + 80) = 0" },
    { text: "650 - 500 + 150 = 0", choices: ["(650 - 500) + 150 = 0", "650 - (500 + 150) = 0", "650 - 500 + 150 = 0"], answer: "650 - (500 + 150) = 0" },
    { text: "720 - 600 + 120 = 0", choices: ["(720 - 600) + 120 = 0", "720 - (600 + 120) = 0", "720 - 600 + 120 = 0"], answer: "720 - (600 + 120) = 0" }
  ];
  state.task6.eq6a = eq6aList[Math.floor(Math.random() * eq6aList.length)];
  state.task6.eq6b = eq6bList[Math.floor(Math.random() * eq6bList.length)];

  // Task 7: Missing number
  let t7_ansA = Math.floor(Math.random() * 25 + 10) * 10;
  let t7_B = Math.floor(Math.random() * 7 + 3) * 10;
  let t7_C = Math.floor(Math.random() * 11 + 5) * 10;
  let t7_A = t7_C + t7_ansA + t7_B;
  state.task7.eq7a = { prompt: `${t7_A} - ( ? + ${t7_B} ) = ${t7_C}`, ans: t7_ansA };

  let t7_B_b = Math.floor(Math.random() * 3 + 2) * 10;
  let t7_C_b = Math.floor(Math.random() * 15 + 20);
  let t7_total = t7_B_b * t7_C_b;
  let t7_A_b = Math.floor(Math.random() * 4 + 2) * 50;
  state.task7.eq7b = { prompt: `( ${t7_A_b} + ? ) : ${t7_B_b} = ${t7_C_b}`, ans: t7_total - t7_A_b };

  // Task 8: Inequality chips
  let t8_A = Math.floor(Math.random() * 10 + 20) * 10;
  let t8_limitA = Math.floor(Math.random() * 10 + 15) * 10;
  let t8_B = t8_A + t8_limitA;
  let t8_correctCandidates = [Math.floor(t8_limitA * 0.2), Math.floor(t8_limitA * 0.5), t8_limitA - 5 - Math.floor(Math.random() * 20)];
  let t8_incorrectCandidates = [t8_limitA, t8_limitA + 5 + Math.floor(Math.random() * 20), t8_limitA + 50 + Math.floor(Math.random() * 50)];
  let t8_candidatesA = [...t8_correctCandidates, ...t8_incorrectCandidates].map(Math.round);
  t8_candidatesA = Array.from(new Set(t8_candidatesA)).sort((x, y) => x - y);
  state.task8.ineq8a = { left: t8_A, target: t8_B, op: '<', candidates: t8_candidatesA, answers: t8_candidatesA.filter(n => n < t8_limitA), selected: [] };

  let t8_divisor = Math.floor(Math.random() * 3 + 3);
  let t8_target = Math.floor(Math.random() * 6 + 18);
  let t8_limitB = t8_divisor * t8_target;
  let t8_candidatesB = [t8_limitB - 20, t8_limitB - 4, t8_limitB, t8_limitB + 4, t8_limitB + 10, t8_limitB + 40, t8_limitB + 100].map(Math.round);
  t8_candidatesB = Array.from(new Set(t8_candidatesB)).sort((x, y) => x - y);
  state.task8.ineq8b = { divisor: t8_divisor, target: t8_target, op: '>', candidates: t8_candidatesB, answers: t8_candidatesB.filter(n => n > t8_limitB), selected: [] };

  // Task 9: Proportionality
  const t9_itemsA = ["Ananas", "Melonen", "Mangos", "Avocados"];
  const t9_itemA = t9_itemsA[Math.floor(Math.random() * t9_itemsA.length)];
  let t9_qty1_a = Math.floor(Math.random() * 3 + 3);
  let t9_unitPrice_a = roundVal(Math.floor(Math.random() * 5 + 10) * 0.2);
  let t9_qty3_a = t9_qty1_a - 1;
  if (t9_qty3_a < 2) t9_qty3_a = 2;
  state.task9.a = { item: t9_itemA, qty1: t9_qty1_a, price1: roundVal(t9_qty1_a * t9_unitPrice_a), qty2: 1, price2: t9_unitPrice_a, qty3: t9_qty3_a, price3: roundVal(t9_qty3_a * t9_unitPrice_a) };

  const t9_itemsB = ["Mehl", "Zucker", "Kaffee", "Reis"];
  const t9_itemB = t9_itemsB[Math.floor(Math.random() * t9_itemsB.length)];
  let t9_qty1_b = Math.floor(Math.random() * 3 + 4) * 2;
  let t9_unitPrice_b = roundVal(Math.floor(Math.random() * 5 + 10) * 0.2);
  let t9_qty3_b = [1.5, 2.5, 3.5][Math.floor(Math.random() * 3)];
  state.task9.b = { item: t9_itemB, qty1: t9_qty1_b, price1: roundVal(t9_qty1_b * t9_unitPrice_b), qty2: 1, price2: t9_unitPrice_b, qty3: t9_qty3_b, price3: roundVal(t9_qty3_b * t9_unitPrice_b) };

  // Task 10: Advanced equations
  let t10_B = Math.floor(Math.random() * 5 + 2) * 50;
  let t10_C = Math.floor(Math.random() * 3 + 4);
  let t10_D_minus_A = Math.floor(Math.random() * 3 + 2) * 50;
  let t10_A = Math.floor(Math.random() * 4 + 3) * 50;
  let t10_D = t10_A + t10_D_minus_A;
  let t10_ansA = t10_B + (t10_D_minus_A * t10_C);
  state.task10.eq10a = { prompt: `${t10_A} + ( ( ? - ${t10_B} ) : ${t10_C} ) = ${t10_D}`, ans: t10_ansA };

  let t10_C_b = Math.floor(Math.random() * 6 + 20) * 100;
  let t10_C_minus_ans = Math.floor(Math.random() * 6 + 8) * 100;
  let t10_ansB = t10_C_b - t10_C_minus_ans;
  let t10_B_b = Math.floor(Math.random() * 10 + 40) * 100;
  let t10_inner = t10_B_b - t10_C_minus_ans;
  let t10_A_b = Math.floor(Math.random() * 10 + 80) * 100;
  let t10_D_b = t10_A_b - t10_inner;
  state.task10.eq10b = { prompt: `${t10_A_b} - ( ${t10_B_b} - ( ${t10_C_b} - ? ) ) = ${t10_D_b}`, ans: t10_ansB };

  // Task 11: Nested brackets
  const t11List = [
    [
      { expr: "5 + ( ( ( 3 * ( 2 + 1 ) ) + 1 ) * 2 )", ans: 25 },
      { expr: "( ( ( 4 + ( 3 - 1 ) ) * 3 ) - ( 5 * ( 4 - 2 ) ) )", ans: 8 }
    ],
    [
      { expr: "4 + ( ( ( 2 * ( 3 + 2 ) ) + 3 ) * 3 )", ans: 43 },
      { expr: "( ( ( 5 + ( 4 - 2 ) ) * 2 ) - ( 4 * ( 5 - 3 ) ) )", ans: 6 }
    ],
    [
      { expr: "6 + ( ( ( 4 * ( 1 + 2 ) ) + 2 ) * 2 )", ans: 34 },
      { expr: "( ( ( 3 + ( 5 - 2 ) ) * 4 ) - ( 6 * ( 4 - 1 ) ) )", ans: 6 }
    ]
  ];
  state.task11 = t11List[Math.floor(Math.random() * t11List.length)];

  // Task 12: Euro to CHF exchange
  const t12_names = ["Frau Sommer", "Herr Müller", "Frau Keller", "Herr Federer"];
  const t12_name = t12_names[Math.floor(Math.random() * t12_names.length)];
  const t12_rates = [1.1, 1.15, 1.2, 1.25];
  const t12_rate = t12_rates[Math.floor(Math.random() * t12_rates.length)];
  const t12_rateText = `100 Euro entsprechen ${(t12_rate * 100).toFixed(0)} Franken`;
  const t12_hotels = [400, 500, 600, 700];
  const t12_reises = [120, 160, 200, 240];
  const t12_essens = [200, 250, 300, 350];
  const t12_hotelEur = t12_hotels[Math.floor(Math.random() * t12_hotels.length)];
  const t12_reiseEur = t12_reises[Math.floor(Math.random() * t12_reises.length)];
  const t12_essenEur = t12_essens[Math.floor(Math.random() * t12_essens.length)];
  state.task12 = {
    name: t12_name, rate: t12_rate, rateText: t12_rateText,
    hotelEur: t12_hotelEur, hotelChf: roundVal(t12_hotelEur * t12_rate),
    reiseEur: t12_reiseEur, reiseChf: roundVal(t12_reiseEur * t12_rate),
    essenEur: t12_essenEur, essenChf: roundVal(t12_essenEur * t12_rate)
  };

  // Render elements in DOM
  renderTask1();
  renderTask2();
  renderTask3();
  renderTask4();
  renderTask6Choices();
  renderTask7Elements();
  renderTask8Chips();
  renderTask9Inputs();
  renderTask10Elements();
  renderTask11Elements();
  renderTask12Inputs();
  
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

function renderTask9Inputs() {
  const ta = state.task9.a;
  const tb = state.task9.b;
  
  document.getElementById("prop9a-desc").textContent = `a) ${ta.qty1} ${ta.item} kosten ${ta.price1.toFixed(2)} Fr. Wie viel kosten ${ta.qty3} ${ta.item}?`;
  document.getElementById("p9a-q1").value = ta.qty1;
  document.getElementById("p9a-p1").value = ta.price1.toFixed(2);
  document.getElementById("p9a-q3").placeholder = ta.qty3;
  
  document.getElementById("prop9b-desc").textContent = `b) ${tb.qty1} kg ${tb.item} kosten ${tb.price1.toFixed(2)} Fr. Wie viel kosten ${tb.qty3} kg ${tb.item}?`;
  document.getElementById("p9b-q1").value = tb.qty1;
  document.getElementById("p9b-p1").value = tb.price1.toFixed(2);
  document.getElementById("p9b-q3").placeholder = tb.qty3;
}

function renderTask12Inputs() {
  const t12 = state.task12;
  document.getElementById("prop12-desc").textContent = `${t12.name} war im Sommer eine Woche lang in Italien in den Ferien. Für das Hotel hat sie ${t12.hotelEur} Euro ausgegeben, für die Reise ${t12.reiseEur} Euro und für das Essen ${t12.essenEur} Euro. Berechne, wie viele Franken sie für ihre Ferien ausgegeben hat. Wechselkurs: ${t12.rateText}.`;
  
  document.getElementById("p12-val-hotel-eur").textContent = t12.hotelEur;
  document.getElementById("p12-val-reise-eur").textContent = t12.reiseEur;
  document.getElementById("p12-val-essen-eur").textContent = t12.essenEur;
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
