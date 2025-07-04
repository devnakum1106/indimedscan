function analyzeSymptoms() {
  if (diseaseData.length === 0) {
    alert("Disease data not loaded yet. Please wait a few seconds.");
    return;
  }

  const input = document.getElementById("input").value.toLowerCase();
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.style.display = "block";
  resultContainer.innerHTML = ""; // Reset results

  let results = [];

  diseaseData.forEach(disease => {
    const matchCount = disease.symptoms.filter(symptom =>
      input.includes(symptom.toLowerCase())
    ).length;

    if (matchCount > 0) {
      results.push({ ...disease, matches: matchCount });
    }
  });

  results.sort((a, b) => b.matches - a.matches);

  if (results.length === 0) {
    resultContainer.innerText = "❌ No matching diseases found.";
    return;
  }

  results.forEach(r => {
    const box = document.createElement("div");
    box.classList.add("result-box");

    box.innerHTML = `
      <h3>✅ ${r.name} (Matches: ${r.matches})</h3>
      <p>${r.description || "ℹ️ Description not available."}</p>
    `;

    resultContainer.appendChild(box);
  });
}
