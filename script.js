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
      console.log("✅ Disease data loaded:", diseaseData);
    })
    .catch(error => {
      console.error("❌ Failed to load disease.json:", error);
    });
}

function analyzeSymptoms() {
  const input = document.getElementById("input").value.toLowerCase().split(" ");
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
    ? results.map(r => `✅ ${r.name} (Matches: ${r.matches})`).join("\\n")
    : "❌ No matching diseases found.";
}

function searchSymptoms() {
  analyzeSymptoms();
}
