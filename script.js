
window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  const main = document.getElementById('main-content');
  setTimeout(() => {
    splash.style.display = 'none';
    main.style.display = 'block';
    loadDiseaseData();
  }, 2500);
});

let diseaseData = [];

function loadDiseaseData() {
  fetch('data/disease.json')
    .then(response => response.json())
    .then(data => {
      diseaseData = data;
      console.log("âœ… Loaded disease data:", diseaseData);
    })
    .catch(error => {
      console.error("âŒ Failed to load disease.json:", error);
    });
}

function analyzeSymptoms() {
  if (diseaseData.length === 0) {
    alert("Disease data not loaded yet. Please wait a few seconds.");
    return;
  }

  const input = document.getElementById("input").value.toLowerCase();
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.style.display = "block";
  let results = [];

  diseaseData.forEach(disease => {
    const matchCount = disease.symptoms.filter(symptom =>
      input.includes(symptom.toLowerCase())
    ).length;
    if (matchCount > 0) {
      results.push({ name: disease.name, matches: matchCount });
    }
  });

  results.sort((a, b) => b.matches - a.matches);
  resultContainer.innerText = results.length
    ? results.map(r => `âœ… ${r.name} (Matches: ${r.matches})`).join("\n")
    : "âŒ No matching diseases found.";
}

function searchSymptoms() {
  analyzeSymptoms();
}

function clearAll() {
  document.getElementById("input").value = "";
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.style.display = "none";
  resultContainer.innerText = "";
}
