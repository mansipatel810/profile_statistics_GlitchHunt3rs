//data retrieval from form

function getFormData(){
    const params =  new URLSearchParams(window.location.search);

    const exp = params.get('exp');
    const web = params.get('web');
    const apps = params.get('apps');

    if(!exp || !web || !apps){
        return null;
    }

    const websites = parseInt(web);
    const appsCount = parseInt(apps);

    if(isNaN(websites) || isNaN(appsCount)){
        return null;
    }

    return {
        experience: exp,
        websites: websites,
        apps: apps

    };
}

function expToYearsMap(expString){
    const expToYears={
        "1 Year":2,
        "2 Years":4,
        "3 Years":6,
        "4 Years":8,
        "5+ Years":10
    };
    return expToYears[expString] || 0 ;
}
 
// score calculation
 
 
// Scoring Formula Details
 
function calculateScore(expYears,websites,apps){
    //Experience: 50 points max
    const expScore = Math.min((expYears/10)*50,50);
    //Websites: 25 points max
    const webScore = Math.min((websites/30)*25,25);
    //Apps: 25 points max
    const appScore = Math.min((apps/20)*25,25);
 
    return Math.round(expScore+ webScore+appScore);
}

//Determining status based on the measurements...

function getStatusLevel(score){
    if(score <20) return 'emerging';
    if(score <40) return 'growing';
    if(score <60) return 'proficient';
    if(score <80) return 'advanced';
    return 'expert';
}

function getStatusSubtitle(status){
    const subtitles ={
    emerging : "Starting your development journey with foundational skills.",
    growing: "Building momentum with expanding capabilities.",
    proficient : "Confident capability with room to specialize further.",
    advanced: "Deep expertise with significant real-world impact.",
    expert: "Industry leader with exceptional breadth and depth."
  };
  
  return subtitles[status];
}

function getPersonaTag(expYears,websites,apps){
    const total =apps+websites;
    const appRatio = total>0? apps/total:0;
    let persona="";

    if(appRatio> 0.6){
        persona = "App Specialist";
    }
    else if(appRatio< 0.4){
        persona="Web Developer";
    }
    else{
        persona = "Full-Stack Builder";
    }

    if(expYears>=7){
        persona = "Veteran "+persona;
    }

    return persona;
}

//highlights based on the details available

function generateHighlights(expYears,experience,websites,apps,score){
    const highlights = [];
 
    if (apps > 10){
    highlights.push(`Strong app delivery focus with ${apps} apps shipped.`);
  }
 
  if (websites > 15){
    highlights.push(`Extensive web portfolio with ${websites} sites developed.`);
  }
 
  if (expYears >= 5){
    highlights.push(`${experience} of proven industry experience.`);
  }
 
  if (score >= 70){
    highlights.push('Well-rounded profile across all metrics.');
  }
 
  // Specialty highlights based on apps and websites count
  if (apps >websites && apps>= 5){
    highlights.push('Specialized in mobile/app development.');
  } else if (websites > apps && websites >= 10) {
    highlights.push('Focused on web development expertise.');
  }
 
  // Balanced portfolio if both are balanced
  if (Math.abs(apps- websites) <=3 && apps >=5){
    highlights.push(`Balanced capability across apps and ${websites} websites.`);
  }
 
  // Default there are no highlights
  if (highlights.length ===0){
    highlights.push('Building foundational experience across web and app development.');
  }
 
  return highlights;
}
 

function generateImprovements(expYears, websites, apps){
  const improvements =[];

  if (apps< 5){
    improvements.push('Ship 2–3 micro-apps with testing and CI/CD to deepen end-to-end skills.');
  }
  if (websites< 10){
    improvements.push('Build more diverse website projects to expand your portfolio.');
  }
  if (expYears <3){
    improvements.push('Continue gaining hands-on experience through real-world projects.');
  }
  // Always include best practices
  improvements.push('Target Lighthouse 90+ on key pages; address accessibility (WCAG) issues.');
  
  return improvements;
}



//DOM changes

function updateStatusSection(status, statusSubtitle, score){
  const badge = document.getElementById("statusBadge");
  badge.className = `badge ${status}`;
  badge.textContent = capitalizeFirst(status);

  document.getElementById('statusTitle').textContent = capitalizeFirst(status);

  document.getElementById('statusSubtitle').textContent = statusSubtitle;

  document.getElementById('scoreValue').textContent = score;
}

function updateMetaInfo(experience, websites, apps){
  document.getElementById('expText').textContent = experience;
  document.getElementById('webText').textContent = websites;
  document.getElementById('appsText').textContent = apps;
}

function updateSummarySection(experience, websites, apps){
  document.getElementById('summaryExp').textContent = experience;
  document.getElementById('summaryWeb').textContent =websites;
  document.getElementById('summaryApps').textContent = apps;
}

function updateProgressBar(score){
  const progressFill = document.querySelector(".progress-fill");
  progressFill.style.setProperty('--pct',`${score}%`);
}


function updateStrengthRing(score){
  const ring = document.querySelector('.strength-ring');
  ring.style.background =`radial-gradient(closest-side, rgba(31,227,193,0.18), rgba(31,227,193,0.02), transparent 70%),
    conic-gradient(from -90deg, var(--brand-400) 0% ${score}%, rgba(31,227,193,0.10) ${score}% 100%)
  `;
}

function updatePersonaTag(persona){
  document.querySelector('.persona-tag').textContent = persona;
}

function updateHighlights(highlightsArray){
  const list = document.getElementById('highlightsList');
  list.innerHTML="";
  highlightsArray.forEach(highlight=>{
    const li = document.createElement('li');
    li.textContent= highlight;
    list.appendChild(li);
  });
}


function updateImprovements(improvementsArray){
  const list = document.getElementById('improvementsList');
  list.innerHTML ="";

  improvementsArray.forEach(improvement=>{
    const li = document.createElement('li');
    li.textContent = improvement;
    list.appendChild(li);
  });
}

//capitalizing function

function capitalizeFirst(str){
  return str.charAt(0).toUpperCase()+ str.slice(1);
}

//main rendering

function renderResults(data){
  const {experience,websites,apps} = data;
  const expYears = expToYearsMap(experience);
  const score = calculateScore(expYears, websites, apps);
  const status = getStatusLevel(score);
  const statusSubtitle = getStatusSubtitle(status);
  const persona = getPersonaTag(expYears, websites, apps);

    const highlights = generateHighlights(experience,expYears, websites, apps, score);
 
  const improvements = generateImprovements(expYears,websites, apps);

  updateStatusSection(status,statusSubtitle,score);
  updateMetaInfo(experience,websites,apps);
  updateSummarySection(experience, websites, apps);
  updateProgressBar(score);
  updateStrengthRing(score);
  updatePersonaTag(persona);
  updateHighlights(highlights);
  updateImprovements(improvements);

}

function showError(){
  document.getElementById('errorCard').hidden = false;
  document.getElementById('resultsGrid').hidden = true;
}
// -------------------------------------------------------------
//button features
function setupThemeToggle() {
  const themeBtn = document.querySelector('.header-actions .btn-ghost[title*="Toggle"]');
  if (!themeBtn) return;
  
  themeBtn.disabled = false;
  themeBtn.style.cursor = 'pointer';
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}


function setupCopyButton() {
  const copyBtn = document.querySelector('.btn-secondary[title*="Copy"]');
  if (!copyBtn) return;
  
  copyBtn.disabled = false;
  copyBtn.style.cursor = 'pointer';
  
  copyBtn.addEventListener('click', () => {
    const data = getFormData();
    if (!data) return;
    
    const expYears = expToYearsMap(data.experience);
    const score = calculateScore(expYears, data.websites, data.apps);
    const status = getStatusLevel(score);
    
    const summary = `
Profile Statistics Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: ${capitalizeFirst(status)}
Score: ${score}/100

Experience: ${data.experience}
Websites: ${data.websites}
Apps: ${data.apps}

Generated: ${new Date().toLocaleDateString()}
    `.trim();
    
    navigator.clipboard.writeText(summary).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }).catch(err => {
      alert('Failed to copy. Please try again.');
    });
  });
}

function setupDownloadButton() {
  const downloadBtn = document.querySelector('.btn-secondary[title*="Download"]');
  if (!downloadBtn) return;
  
  downloadBtn.disabled = false;
  downloadBtn.style.cursor = 'pointer';
  
  downloadBtn.addEventListener('click', () => {
    const data = getFormData();
    if (!data) return;
    
    const expYears = expToYearsMap(data.experience);
    const score = calculateScore(expYears, data.websites, data.apps);
    const status = getStatusLevel(score);
    const statusSubtitle = getStatusSubtitle(status);
      const highlights = generateHighlights(experience,expYears, websites, apps, score);
 
    const improvements = generateImprovements(expYears, data.websites, data.apps);
    
    const content = `
PROFILE STATISTICS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STATUS: ${capitalizeFirst(status).toUpperCase()}
${statusSubtitle}

SCORE: ${score}/100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXPERIENCE BREAKDOWN
────────────────────────────────────────

Experience: ${data.experience}
Websites Developed: ${data.websites}
Apps Developed: ${data.apps}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HIGHLIGHTS
────────────────────────────────────────

${highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPROVEMENTS & RECOMMENDATIONS
────────────────────────────────────────

${improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated: ${new Date().toLocaleString()}
Built by GlitchHunt3rs
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-stats-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = '✓ Downloaded!';
    setTimeout(() => {
      downloadBtn.textContent = originalText;
    }, 2000);
  });
}

function setupShareButton() {
  const shareBtn = document.querySelector('.btn-secondary[title*="Share"]');
  if (!shareBtn) return;
  
  shareBtn.disabled = false;
  shareBtn.style.cursor = 'pointer';
  
  shareBtn.addEventListener('click', () => {
    const currentUrl = window.location.href;
    
    navigator.clipboard.writeText(currentUrl).then(() => {
      const originalText = shareBtn.textContent;
      shareBtn.textContent = '✓ Link Copied!';
      setTimeout(() => {
        shareBtn.textContent = originalText;
      }, 2000);
    }).catch(err => {
      alert(`Share this link:\n${currentUrl}`);
    });
  });
}

function setupPrintButton() {
  const printBtn = document.querySelector('.header-actions .btn-ghost[title*="Print"]');
  if (!printBtn) return;
  
  printBtn.disabled = false;
  printBtn.style.cursor = 'pointer';
  
  printBtn.addEventListener('click', () => {
    window.print();
  });
}

// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded',()=>{
  const data = getFormData();

  if(!data){
    showError();
    return;
  }
  renderResults(data);

  setupThemeToggle();
  setupCopyButton();
  setupDownloadButton();
  setupShareButton();
  setupPrintButton();
});