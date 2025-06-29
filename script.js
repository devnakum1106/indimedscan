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
    div.classList.add("disease-card");
    div.innerHTML = `
      <h3>${disease.name}</h3>
      <p><strong>Symptoms:</strong> ${disease.symptoms.join(", ")}</p>
      <p><strong>Causes:</strong> ${disease.causes}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const diseases = await fetchDiseases();
  const input = document.getElementById("searchInput");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const filtered = diseases.filter(d =>
      d.symptoms.some(symptom => symptom.toLowerCase().includes(query))
    );
    displayResults(filtered);
  });
});
