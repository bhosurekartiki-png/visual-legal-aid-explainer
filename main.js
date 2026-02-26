// Utility function to scroll to section
function scrollTo(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
        event.target.classList.add('active');
    }
}

// Analyze Legal Document
async function analyzeLegalDocument() {
    const legalText = document.getElementById('legalText').value.trim();

    if (!legalText) {
        alert('Please enter or upload legal text to analyze.');
        return;
    }

    // Show loading
    document.getElementById('documentResult').style.display = 'block';
    document.getElementById('englishExplanation').innerHTML = '⏳ Analyzing...';

    // Simulate API call (replace with actual backend)
    setTimeout(() => {
        const analysis = simplifyLegalDocument(legalText);
        displayDocumentAnalysis(analysis);
    }, 1000);
}

function simplifyLegalDocument(text) {
    // Detect legal sections
    const detectedSections = detectLegalSections(text);

    // Create simplified explanation
    const explanation = {
        english: generateSimpleExplanation(text, 'english'),
        hindi: generateSimpleExplanation(text, 'hindi'),
        marathi: generateSimpleExplanation(text, 'marathi'),
        keyPoints: extractKeyPoints(text),
        sections: detectedSections,
        nextSteps: generateNextSteps(text, detectedSections)
    };

    return explanation;
}

function generateSimpleExplanation(text, language) {
    // Extract key information
    const lines = text.split('\n').filter(line => line.trim());

    let explanation = '';

    if (language === 'english') {
        explanation = `
            <div style="background: #f0f7ff; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p><strong>What this document is about:</strong></p>
                <p>${lines.slice(0, 2).join(' ').substring(0, 300)}...</p>
                
                <p style="margin-top: 15px;"><strong>Main points in simple words:</strong></p>
                <ul>
                    <li>This document explains your rights and duties</li>
                    <li>Read each part carefully and understand what it says</li>
                    <li>If you don't understand something, ask a lawyer</li>
                    <li>Keep this document safe for future reference</li>
                </ul>
            </div>
        `;
    } else if (language === 'hindi') {
        explanation = `
            <div style="background: #fff3e0; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p><strong>यह दस्तावेज़ किसके बारे में है:</strong></p>
                <p>${lines.slice(0, 2).join(' ').substring(0, 300)}...</p>
                
                <p style="margin-top: 15px;"><strong>सरल शब्दों में मुख्य बातें:</strong></p>
                <ul>
                    <li>यह दस्तावेज़ आपके अधिकार और कर्तव्यों को समझाता है</li>
                    <li>प्रत्येक भाग को ध्यान से पढ़ें और समझें</li>
                    <li>यदि आप कुछ नहीं समझते हैं तो किसी वकील से पूछें</li>
                    <li>भविष्य के लिए इस दस्तावेज़ को सुरक्षित रखें</li>
                </ul>
            </div>
        `;
    } else if (language === 'marathi') {
        explanation = `
            <div style="background: #f3e5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p><strong>हे दस्तऐवज काय विषयी आहे:</strong></p>
                <p>${lines.slice(0, 2).join(' ').substring(0, 300)}...</p>
                
                <p style="margin-top: 15px;"><strong>सोप्या शब्दांत मुख्य गोष्टी:</strong></p>
                <ul>
                    <li>हे दस्तऐवज तुमचे अधिकार आणि कर्तव्य समजावते</li>
                    <li>प्रत्येक भाग काळजीपूर्वक वाचा आणि समज</li>
                    <li>जर तुम्हाला काही समजत नाही तर वकीलाला विचारा</li>
                    <li>भविष्यासाठी हे दस्तऐवज सुरक्षित ठेवा</li>
                </ul>
            </div>
        `;
    }

    return explanation;
}

function extractKeyPoints(text) {
    const points = [
        '📌 This document contains important legal information',
        '📌 You have rights mentioned in this document',
        '📌 There are responsibilities you need to follow',
        '📌 Keep records and documents related to this',
        '📌 Consult a lawyer if you need legal advice'
    ];
    return points;
}

function detectLegalSections(text) {
    const sections = [];
    const commonSections = {
        'IPC': 'Indian Penal Code',
        'CrPC': 'Criminal Procedure Code',
        'CPC': 'Civil Procedure Code',
        'Consumer': 'Consumer Protection Act',
        'DV': 'Domestic Violence Act',
        'FIR': 'First Information Report',
        'POCSO': 'Protection of Children from Sexual Offences Act',
        'NDPS': 'Narcotic Drugs and Psychotropic Substances Act'
    };

    for (let [key, value] of Object.entries(commonSections)) {
        if (text.includes(key)) {
            sections.push({ code: key, name: value });
        }
    }

    return sections;
}

function generateNextSteps(text, sections) {
    const steps = [
        '1. Read and understand this document completely',
        '2. Note down important dates and deadlines',
        '3. Keep all related documents together',
        '4. Contact the relevant authority if needed',
        '5. Seek legal advice for your specific situation'
    ];
    return steps;
}

function displayDocumentAnalysis(analysis) {
    // Display English explanation
    document.getElementById('englishExplanation').innerHTML = analysis.english;

    // Display Hindi explanation
    document.getElementById('hindiExplanation').innerHTML = analysis.hindi;

    // Display Marathi explanation
    document.getElementById('marathiExplanation').innerHTML = analysis.marathi;

    // Display key points
    const keyPointsList = document.getElementById('keyPointsList');
    keyPointsList.innerHTML = '';
    analysis.keyPoints.forEach(point => {
        const li = document.createElement('li');
        li.innerHTML = point;
        keyPointsList.appendChild(li);
    });

    // Display detected sections if any
    if (analysis.sections.length > 0) {
        const sectionsList = document.getElementById('sectionsList');
        sectionsList.innerHTML = '';
        analysis.sections.forEach(section => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${section.code}:</strong> ${section.name}`;
            li.style.cursor = 'pointer';
            li.onclick = () => searchLaws(section.code);
            sectionsList.appendChild(li);
        });
        document.getElementById('sections').style.display = 'block';
    }

    // Display next steps
    const stepsList = document.getElementById('stepsList');
    stepsList.innerHTML = '';
    analysis.nextSteps.forEach(step => {
        const li = document.createElement('li');
        li.innerHTML = step;
        stepsList.appendChild(li);
    });
    document.getElementById('nextSteps').style.display = 'block';
}

// Search Legal Sections
function searchLaws(query = null) {
    const searchInput = query || document.getElementById('searchInput').value.trim();

    if (!searchInput) {
        document.querySelector('.search-results').classList.remove('active');
        return;
    }

    const results = legalSectionDatabase.filter(section =>
        section.code.toLowerCase().includes(searchInput.toLowerCase()) ||
        section.keywords.some(kw => kw.toLowerCase().includes(searchInput.toLowerCase()))
    );

    if (results.length > 0) {
        displaySearchResults(results);
    }
}

function displaySearchResults(results) {
    const resultsDiv = document.querySelector('.search-results');
    resultsDiv.innerHTML = '';
    resultsDiv.classList.add('active');

    results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `<strong>${result.code}</strong> - ${result.title}`;
        item.onclick = () => displayLegalSection(result);
        resultsDiv.appendChild(item);
    });
}

function displayLegalSection(section) {
    document.querySelector('.search-results').classList.remove('active');
    document.getElementById('legalSectionResult').style.display = 'block';

    // English
    document.getElementById('sectionEnglish').innerHTML = section.englishExplanation;
    document.getElementById('whenApplies').innerHTML = section.whenApplies;
    document.getElementById('punishment').innerHTML = section.punishment;
    document.getElementById('yourRights').innerHTML = section.yourRights;
    document.getElementById('example').innerHTML = section.example;

    // Hindi
    document.getElementById('sectionHindi').innerHTML = section.hindiExplanation;
    document.getElementById('whenApplesHindi').innerHTML = section.whenApplesHindi;
    document.getElementById('punishmentHindi').innerHTML = section.punishmentHindi;
    document.getElementById('yourRightsHindi').innerHTML = section.yourRightsHindi;
    document.getElementById('exampleHindi').innerHTML = section.exampleHindi;

    // Marathi
    document.getElementById('sectionMarathi').innerHTML = section.marathiExplanation;
    document.getElementById('whenApplesMarathi').innerHTML = section.whenApplesMarathi;
    document.getElementById('punishmentMarathi').innerHTML = section.punishmentMarathi;
    document.getElementById('yourRightsMarathi').innerHTML = section.yourRightsMarathi;
    document.getElementById('exampleMarathi').innerHTML = section.exampleMarathi;

    // Reset to English tab
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('section-english').classList.add('active');
    document.querySelectorAll('.tab-button')[0].classList.add('active');

    scrollTo('search');
}

// FAQ Functionality
function answerFAQ() {
    const question = document.getElementById('faqQuestion').value.trim();

    if (!question) {
        alert('Please enter a question.');
        return;
    }

    document.getElementById('faqResult').style.display = 'block';
    document.getElementById('faqAnswer').innerHTML = '⏳ Finding answer...';

    setTimeout(() => {
        const answer = generateFAQAnswer(question);
        document.getElementById('faqAnswer').innerHTML = answer.text;

        if (answer.helplines.length > 0) {
            const helplineList = document.getElementById('helplineList');
            helplineList.innerHTML = '';
            answer.helplines.forEach(helpline => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${helpline.name}</strong>: ${helpline.number}`;
                helplineList.appendChild(li);
            });
            document.getElementById('faqHelpline').style.display = 'block';
        }
    }, 800);
}

function generateFAQAnswer(question) {
    const q = question.toLowerCase();

    let answer = {
        text: '',
        helplines: []
    };

    if (q.includes('fir')) {
        answer.text = `
            <div style="line-height: 1.8;">
                <h5>What is FIR?</h5>
                <p>FIR means First Information Report. It is the first written document that police register when they learn about a crime.</p>
                
                <h5>When to file FIR?</h5>
                <ul>
                    <li>When any crime happens against you</li>
                    <li>When you or your property is damaged</li>
                    <li>When you are harassed or threatened</li>
                </ul>

                <h5>How to file FIR?</h5>
                <ol>
                    <li>Go to the nearest police station</li>
                    <li>Tell the police what happened in simple words</li>
                    <li>Police will write down your complaint</li>
                    <li>You will get a copy of FIR</li>
                    <li>Police will investigate the matter</li>
                </ol>

                <h5>Your Rights:</h5>
                <ul>
                    <li>You can file FIR yourself or through someone else</li>
                    <li>Police must register FIR for all crimes</li>
                    <li>You can get a copy of FIR</li>
                    <li>You can ask police about investigation progress</li>
                </ul>
            </div>
        `;
        answer.helplines = [
            { name: 'Police Emergency', number: '100' },
            { name: 'Women Helpline', number: '1091' }
        ];
    } else if (q.includes('consumer') || q.includes('complaint')) {
        answer.text = `
            <div style="line-height: 1.8;">
                <h5>Consumer Rights in India:</h5>
                <ul>
                    <li><strong>Right to Safety:</strong> Products should be safe to use</li>
                    <li><strong>Right to Information:</strong> You deserve correct information</li>
                    <li><strong>Right to Choose:</strong> You can select any product</li>
                    <li><strong>Right to be heard:</strong> Your complaint must be heard</li>
                    <li><strong>Right to Compensation:</strong> You can claim damages</li>
                </ul>

                <h5>How to file a Consumer Complaint?</h5>
                <ol>
                    <li>Gather all bills and documents</li>
                    <li>Write down what happened</li>
                    <li>Contact Consumer Helpline</li>
                    <li>File complaint online or offline</li>
                    <li>Keep all evidence safe</li>
                </ol>
            </div>
        `;
        answer.helplines = [
            { name: 'Consumer Helpline', number: '1800-11-4000' }
        ];
    } else if (q.includes('domestic') || q.includes('violence')) {
        answer.text = `
            <div style="line-height: 1.8;">
                <h5>What is Domestic Violence?</h5>
                <p>Abuse within family like hitting, insulting, forcing, threatening, or emotional hurt.</p>

                <h5>What can you do?</h5>
                <ol>
                    <li>Call helpline for advice</li>
                    <li>Go to nearby police station</li>
                    <li>Get medical check-up if injured</li>
                    <li>File FIR against the abuser</li>
                    <li>Contact women's shelter or NGO</li>
                </ol>

                <h5>Your Rights:</h5>
                <ul>
                    <li>You have right to safety</li>
                    <li>You can stay away from abuser</li>
                    <li>Police will protect you</li>
                    <li>You can get compensation for injuries</li>
                    <li>You have right to property</li>
                </ul>
            </div>
        `;
        answer.helplines = [
            { name: 'Women Helpline (24/7)', number: '1091' },
            { name: 'Domestic Violence Helpline', number: '181' }
        ];
    } else {
        answer.text = `
            <div style="line-height: 1.8;">
                <p><strong>General Legal Information:</strong></p>
                <ul>
                    <li>If you face any problem, contact local police station</li>
                    <li>You can get free legal aid - contact NALSA</li>
                    <li>You can file case in court for disputes</li>
                    <li>Keep all documents and evidence safe</li>
                    <li>For serious matters, consult a qualified lawyer</li>
                </ul>
                <p><strong>Remember:</strong> This is general information only, not legal advice. Please consult a lawyer for your specific problem.</p>
            </div>
        `;
        answer.helplines = [
            { name: 'Legal Services Authority', number: '1800-180-1111' },
            { name: 'Police Emergency', number: '100' }
        ];
    }

    return answer;
}

function quickFAQ(question) {
    document.getElementById('faqQuestion').value = question;
    answerFAQ();
}