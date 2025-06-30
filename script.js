const allSymptoms = [
  "fever", "cough", "fatigue", "rash", "joint pain",
  "headache", "sore throat", "runny nose", "sneezing",
  "loss of smell", "night sweats", "abdominal pain",
  "weakness", "constipation", "weight loss", "shortness of breath", "itchiness", "yellow skin", "vomiting", "diarrhea"
];

function showLoading(show) {
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = show ? "block" : "none";
}

async function fetchDiseases() {
  showLoading(true);
  const response = await fetch("data/diseases.json");
  const data = await response.json();
  showLoading(false);
  return data;
}

function displayResults(filtered) {
  const resultsDiv = document.getElementById("results");
  const countDiv = document.getElementById("matchCount");
  resultsDiv.innerHTML = "";

  if (filtered.length === 0) {
    countDiv.textContent = "No matching diseases found.";
    return;
  } else {
    countDiv.textContent = `${filtered.length} disease(s) matched.`;
  }

  filtered.forEach(disease => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${disease.name}</h3>
      <p><strong>Symptoms:</strong> ${disease.symptoms.join(", ")}</p>
      <p><strong>Causes:</strong> ${disease.causes.join(", ")}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

function showSuggestions(inputValue) {
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (!inputValue) return;

  const parts = inputValue.trim().split(" ");
  const lastWord = parts[parts.length - 1].toLowerCase();

  if (!lastWord) return;

  const matched = allSymptoms.filter(sym =>
    sym.toLowerCase().startsWith(lastWord)
  );

  matched.forEach(symptom => {
    const li = document.createElement("li");
    li.textContent = symptom;
    li.onclick = () => {
      parts[parts.length - 1] = symptom;
      searchInput.value = parts.join(" ") + " ";
      suggestions.innerHTML = "";
      searchInput.focus();
    };
    suggestions.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearButton");
  const suggestions = document.getElementById("suggestions");
  const results = document.getElementById("results");
  const countDiv = document.getElementById("matchCount");

  const diseases = await fetchDiseases();

  searchInput.addEventListener("input", () => {
    const query = searchInput.value
      .toLowerCase()
      .split(" ")
      .map(s => s.trim())
      .filter(Boolean);

    const filtered = diseases.filter(d =>
      query.every(symptom =>
        d.symptoms.some(s => s.toLowerCase().includes(symptom))
      )
    );

    displayResults(filtered);
    showSuggestions(searchInput.value);
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    suggestions.innerHTML = "";
    results.innerHTML = "";
    countDiv.textContent = "";
    searchInput.focus();
  });
});
