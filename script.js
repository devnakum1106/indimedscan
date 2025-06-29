async function fetchDiseases() {
  const response = await fetch("data/diseases.json");
  const data = await response.json();
  return data;
}

function displayResults(filtered) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No matching disease found.</p>";
    return;
  }

  filtered.forEach(disease => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${disease.name}</h3>
      <p><strong>Symptoms:</strong> ${disease.symptoms.join(", ")}</p>
      <p><strong>Causes:</strong> ${disease.causes}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();
  const diseases = await fetchDiseases();
  const filtered = diseases.filter(d =>
    d.symptoms.some(symptom => symptom.toLowerCase().includes(query))
  );
  displayResults(filtered);
});