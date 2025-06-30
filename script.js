const allSymptoms = [
  "fever", "cough", "fatigue", "rash", "joint pain",
  "headache", "sore throat", "runny nose", "sneezing",
  "loss of smell", "night sweats", "abdominal pain",
  "weakness", "constipation", "weight loss"
];

async function fetchDiseases() {
  const response = await fetch("data/diseases.json");
  const data = await response.json();
  return data;
}

function displayResults(filtered) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No matching diseases found.</p>";
    return;
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

  const lastTerm = inputValue.split(",").pop().trim().toLowerCase();
  const matched = allSymptoms.filter(sym =>
    sym.toLowerCase().startsWith(lastTerm) && lastTerm !== ""
  );

  matched.forEach(symptom => {
    const li = document.createElement("li");
    li.textContent = symptom;
    li.onclick = () => {
      let current = searchInput.value.split(",");
      current[current.length - 1] = " " + symptom;
      searchInput.value = current.join(",").trim() + ", ";
      suggestions.innerHTML = "";
      searchInput.focus();
    };
    suggestions.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const diseases = await fetchDiseases();
  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearButton");
  const suggestions = document.getElementById("suggestions");
  const results = document.getElementById("results");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase()
      .split(",")
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
    searchInput.focus();
  });
});
