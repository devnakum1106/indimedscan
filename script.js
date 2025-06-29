async function fetchDiseases() {
  const response = await fetch("diseases.json");
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
      <p><strong>Causes:</strong> ${disease.causes.join(", ")}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase().split(" ").filter(Boolean);
  const diseases = await fetchDiseases();

  const filtered = diseases.filter(d =>
    query.every(symptom =>
      d.symptoms.some(s => s.toLowerCase().includes(symptom))
    )
  );

  displayResults(filtered);
});
