// ============ UTILITY FUNCTIONS ============

// Utility function to scroll to section
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============ TAB SWITCHING ============

// Tab switching functionality with improved error handling
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
        
        // Find and activate the corresponding button
        if (event && event.target) {
            event.target.classList.add('active');
        }
    }
}

// ============ DOCUMENT ANALYSIS ============

// Analyze Legal Document with improved feedback
async function analyzeLegalDocument() {
    const legalText = document.getElementById('legalText').value.trim();

    if (!legalText) {
        showAlert('Please enter or upload legal text to analyze.', 'warning');
        return;
    }

    if (legalText.length < 20) {
        showAlert('Please enter more text for better analysis.', 'warning');
        return;
    }

    // Show loading
    document.getElementById('documentResult').style.display = 'block';
    document.getElementById('englishExplanation').innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Analyzing your document...</div>';

    // Simulate API call (replace with actual backend)
    setTimeout(() => {
        try {
            const analysis = simplifyLegalDocument(legalText);
            displayDocumentAnalysis(analysis);
            showAlert('Document analyzed successfully!', 'success');
        } catch (error) {
            showAlert('Error analyzing document. Please try again.', 'error');
            console.error('Analysis error:', error);
        }
    }, 1500);
}

// Simplify legal document with AI-like processing
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

// Generate simplified explanations in multiple languages
function generateSimpleExplanation(text, language) {
    // Extract key information
    const lines = text.split('\n').filter(line => line.trim());
    const summary = lines.slice(0, 3).join(' ').substring(0, 400);

    let explanation = '';

    if (language === 'english') {
        explanation = `
            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 20px; border-radius: 8px; margin: 10px 0; border-left: 5px solid #2196f3;">
                <p><strong><i class="fas fa-book-open"></i> What this document is about:</strong></p>
                <p style="color: #333; line-height: 1.8;">${summary}</p>
                
                <p style="margin-top: 15px;"><strong><i class="fas fa-list"></i> Main points in simple words:</strong></p>
                <ul style="color: #333;">
                    <li>This document explains important legal information</li>
                    <li>Read each part carefully and understand what it means</li>
                    <li>Important dates and deadlines are mentioned in the document</li>
                    <li>If you don't understand anything, ask a lawyer for help</li>
                    <li>Keep this document safe for future reference</li>
                </ul>
            </div>
        `;
    } else if (language === 'hindi') {
        explanation = `
            <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 20px; border-radius: 8px; margin: 10px 0; border-left: 5px solid #ff9800;">
                <p><strong><i class="fas fa-book-open"></i> यह दस्तावेज़ किसके बारे में है:</strong></p>
                <p style="color: #333; line-height: 1.8;">${summary}</p>
                
                <p style="margin-top: 15px;"><strong><i class="fas fa-list"></i> सरल शब्दों में मुख्य बातें:</strong></p>
                <ul style="color: #333;">
                    <li>यह दस्तावेज़ महत्वपूर्ण कानूनी जानकारी देता है</li>
                    <li>प्रत्येक हिस्से को ध्यान से पढ़ें और समझें</li>
                    <li>महत्वपूर्ण तारीखें दस्तावेज़ में लिखी हैं</li>
                    <li>अगर कुछ समझ न आए तो किसी वकील से पूछें</li>
                    <li>भविष्य के लिए इस दस्तावेज़ को सुरक्षित रखें</li>
                </ul>
            </div>
        `;
    } else if (language === 'marathi') {
        explanation = `
            <div style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); padding: 20px; border-radius: 8px; margin: 10px 0; border-left: 5px solid #9c27b0;">
                <p><strong><i class="fas fa-book-open"></i> हे दस्तऐवज काय विषयी आहे:</strong></p>
                <p style="color: #333; line-height: 1.8;">${summary}</p>
                
                <p style="margin-top: 15px;"><strong><i class="fas fa-list"></i> सोप्या शब्दांत मुख्य गोष्टी:</strong></p>
                <ul style="color: #333;">
                    <li>हे दस्तऐवज महत्वाचे कायदेशीर माहिती देते</li>
                    <li>प्रत्येक भाग काळजीपूर्वक वाचा आणि समज</li>
                    <li>महत्वाच्या तारखा दस्तऐवजात लिहिलेल्या आहेत</li>
                    <li>काही समजत नसेल तर वकीलाला विचारा</li>
                    <li>भविष्यासाठी हे दस्तऐवज सुरक्षित ठेवा</li>
                </ul>
            </div>
        `;
    }

    return explanation;
}

// Extract key points from legal text
function extractKeyPoints(text) {
    const wordCount = text.split(' ').length;
    const sentenceCount = text.split('.').length;
    
    const points = [
        '<i class="fas fa-star"></i> This document contains important legal information',
        '<i class="fas fa-shield-alt"></i> You have specific rights mentioned in this document',
        '<i class="fas fa-tasks"></i> There are responsibilities you need to follow',
        '<i class="fas fa-archive"></i> Keep all records and documents related to this',
        '<i class="fas fa-briefcase"></i> Consult a lawyer if you need professional legal advice',
        `<i class="fas fa-file-alt"></i> Document contains approximately ${sentenceCount} key sections`
    ];
    return points;
}

// Detect legal sections in text
function detectLegalSections(text) {
    const sections = [];
    const commonSections = {
        'IPC': 'Indian Penal Code',
        'IPC 420': 'IPC Section 420 - Cheating',
        'IPC 498-A': 'IPC Section 498-A - Cruelty Against Wife',
        'CrPC': 'Criminal Procedure Code',
        'CPC': 'Civil Procedure Code',
        'Consumer': 'Consumer Protection Act',
        'DV': 'Domestic Violence Act',
        'FIR': 'First Information Report',
        'POCSO': 'Protection of Children from Sexual Offences Act',
        'NDPS': 'Narcotic Drugs and Psychotropic Substances Act',
        'RTI': 'Right to Information Act',
        'Labor': 'Labor Code'
    };

    for (let [key, value] of Object.entries(commonSections)) {
        if (text.includes(key)) {
            sections.push({ code: key, name: value });
        }
    }

    return sections;
}

// Generate next steps based on document
function generateNextSteps(text, sections) {
    const steps = [
        '<i class="fas fa-check-circle"></i> Read and understand the entire document completely',
        '<i class="fas fa-calendar-alt"></i> Note down all important dates and deadlines mentioned',
        '<i class="fas fa-folder-open"></i> Keep all related documents and evidence together',
        '<i class="fas fa-phone-alt"></i> Contact the relevant authority if needed immediately',
        '<i class="fas fa-briefcase"></i> Seek professional legal advice for your specific situation',
        '<i class="fas fa-copy"></i> Make copies of this document for your records'
    ];
    return steps;
}

// Display document analysis results
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
        li.style.marginBottom = '8px';
        keyPointsList.appendChild(li);
    });

    // Display detected sections if any
    if (analysis.sections.length > 0) {
        const sectionsList = document.getElementById('sectionsList');
        sectionsList.innerHTML = '';
        analysis.sections.forEach(section => {
            const li = document.createElement('li');
            li.innerHTML = `<strong><i class="fas fa-gavel"></i> ${section.code}:</strong> ${section.name}`;
            li.style.cursor = 'pointer';
            li.style.padding = '8px';
            li.style.borderRadius = '5px';
            li.style.transition = 'all 0.3s ease';
            li.onmouseover = () => li.style.backgroundColor = '#f0f0f0';
            li.onmouseout = () => li.style.backgroundColor = 'transparent';
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
        li.style.marginBottom = '10px';
        stepsList.appendChild(li);
    });
    document.getElementById('nextSteps').style.display = 'block';
}

// ============ SEARCH LAWS ============

// Search for legal sections
function searchLaws(query = null) {
    const searchInput = query || document.getElementById('searchInput').value.trim();

    if (!searchInput) {
        const resultsDiv = document.querySelector('.search-results');
        if (resultsDiv) {
            resultsDiv.classList.remove('active');
        }
        return;
    }

    const results = legalSectionDatabase.filter(section =>
        section.code.toLowerCase().includes(searchInput.toLowerCase()) ||
        section.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        section.keywords.some(kw => kw.toLowerCase().includes(searchInput.toLowerCase()))
    );

    if (results.length > 0) {
        displaySearchResults(results);
    } else {
        showAlert('No matching laws found. Try searching for another section.', 'info');
    }
}

// Display search results
function displaySearchResults(results) {
    const resultsDiv = document.querySelector('.search-results');
    resultsDiv.innerHTML = '';
    resultsDiv.classList.add('active');

    results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-gavel"></i>
                <div>
                    <strong>${result.code}</strong><br>
                    <small style="color: #666;">${result.title}</small>
                </div>
            </div>
        `;
        item.onclick = () => displayLegalSection(result);
        resultsDiv.appendChild(item);
    });
}

// Display full legal section details
function displayLegalSection(section) {
    const resultsDiv = document.querySelector('.search-results');
    if (resultsDiv) {
        resultsDiv.classList.remove('active');
    }
    document.getElementById('legalSectionResult').style.display = 'block';

    // English
    document.getElementById('sectionEnglish').innerHTML = section.englishExplanation;
    document.getElementById('whenApplies').innerHTML = section.whenApplies;
    document.getElementById('punishment').innerHTML = section.punishment;
    document.getElementById('yourRights').innerHTML = section.yourRights;
    document.getElementById('example').innerHTML = `<strong>Example:</strong> ${section.example}`;

    // Hindi
    document.getElementById('sectionHindi').innerHTML = section.hindiExplanation;
    document.getElementById('whenApplesHindi').innerHTML = section.whenApplesHindi;
    document.getElementById('punishmentHindi').innerHTML = section.punishmentHindi;
    document.getElementById('yourRightsHindi').innerHTML = section.yourRightsHindi;
    document.getElementById('exampleHindi').innerHTML = `<strong>उदाहरण:</strong> ${section.exampleHindi}`;

    // Marathi
    document.getElementById('sectionMarathi').innerHTML = section.marathiExplanation;
    document.getElementById('whenApplesMarathi').innerHTML = section.whenApplesMarathi;
    document.getElementById('punishmentMarathi').innerHTML = section.punishmentMarathi;
    document.getElementById('yourRightsMarathi').innerHTML = section.yourRightsMarathi;
    document.getElementById('exampleMarathi').innerHTML = `<strong>उदाहरण:</strong> ${section.exampleMarathi}`;

    // Reset to English tab
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('section-english').classList.add('active');
    document.querySelectorAll('.tab-button')[0].classList.add('active');

    scrollTo('search');
    showAlert('Section details loaded!', 'success');
}

// ============ FAQ FUNCTIONALITY ============

// Answer FAQ questions
function answerFAQ() {
    const question = document.getElementById('faqQuestion').value.trim();

    if (!question) {
        showAlert('Please enter a question.', 'warning');
        return;
    }

    document.getElementById('faqResult').style.display = 'block';
    document.getElementById('faqAnswer').innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Finding answer...</div>';

    setTimeout(() => {
        try {
            const answer = generateFAQAnswer(question);
            document.getElementById('faqAnswer').innerHTML = answer.text;

            if (answer.helplines.length > 0) {
                const helplineList = document.getElementById('helplineList');
                helplineList.innerHTML = '';
                answer.helplines.forEach(helpline => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong><i class="fas fa-phone"></i> ${helpline.name}</strong>: <span style="color: #e74c3c; font-weight: bold; font-size: 16px;">${helpline.number}</span>`;
                    li.style.marginBottom = '10px';
                    li.style.padding = '10px';
                    li.style.backgroundColor = '#f9f9f9';
                    li.style.borderRadius = '5px';
                    helplineList.appendChild(li);
                });
                document.getElementById('faqHelpline').style.display = 'block';
            }
            showAlert('Answer found!', 'success');
        } catch (error) {
            showAlert('Error finding answer. Please try again.', 'error');
            console.error('FAQ error:', error);
        }
    }, 1200);
}

// Generate FAQ answers based on keywords
function generateFAQAnswer(question) {
    const q = question.toLowerCase();

    let answer = {
        text: '',
        helplines: []
    };

    if (q.includes('fir')) {
        answer.text = `
            <div style="line-height: 1.8; color: #333;">
                <h5><i class="fas fa-file-alt"></i> What is FIR?</h5>
                <p>FIR means <strong>First Information Report</strong>. It is the first written document that police register when they learn about a crime. It starts an official investigation.</p>
                
                <h5><i class="fas fa-calendar-alt"></i> When to file FIR?</h5>
                <ul>
                    <li>When any crime happens against you or your family</li>
                    <li>When you or your property is damaged</li>
                    <li>When you are harassed, threatened, or assaulted</li>
                    <li>When you witness a crime</li>
                </ul>

                <h5><i class="fas fa-tasks"></i> How to file FIR?</h5>
                <ol>
                    <li>Go to the nearest police station</li>
                    <li>Tell the police officer what happened in simple words</li>
                    <li>Provide your name, address, and contact number</li>
                    <li>Police will write down your complaint (statement)</li>
                    <li>You will get a copy of FIR with reference number</li>
                    <li>Police will start investigation</li>
                </ol>

                <h5><i class="fas fa-shield-alt"></i> Your Rights:</h5>
                <ul>
                    <li>You can file FIR yourself or ask someone to help</li>
                    <li>Police MUST register FIR for all crimes</li>
                    <li>You can get a free copy of FIR</li>
                    <li>You can ask police about investigation progress</li>
                    <li>No bribe needed - FIR is your right</li>
                </ul>
            </div>
        `;
        answer.helplines = [
            { name: 'Police Emergency', number: '100' },
            { name: 'Women Helpline', number: '1091' },
            { name: 'Legal Services', number: '1800-180-1111' }
        ];
    } else if (q.includes('consumer') || q.includes('complaint') || q.includes('product')) {
        answer.text = `
            <div style="line-height: 1.8; color: #333;">
                <h5><i class="fas fa-shopping-cart"></i> Consumer Rights in India:</h5>
                <p>Every consumer has <strong>5 basic rights</strong> under the Consumer Protection Act:</p>
                <ul>
                    <li><strong>Right to Safety:</strong> Products should be safe to use</li>
                    <li><strong>Right to Information:</strong> You deserve correct information about products</li>
                    <li><strong>Right to Choose:</strong> You can select any product freely</li>
                    <li><strong>Right to be heard:</strong> Your complaint must be heard and addressed</li>
                    <li><strong>Right to Compensation:</strong> You can claim damages for harm</li>
                </ul>

                <h5><i class="fas fa-tasks"></i> How to file a Consumer Complaint?</h5>
                <ol>
                    <li>Gather all bills, receipts, and documents</li>
                    <li>Write down what happened clearly</li>
                    <li>Contact Consumer Helpline or local consumer court</li>
                    <li>File complaint online or offline (within 2 years)</li>
                    <li>Keep all evidence safe</li>
                </ol>

                <h5><i class="fas fa-gavel"></i> What can you claim?</h5>
                <ul>
                    <li>Full refund of money paid</li>
                    <li>Replacement of defective product</li>
                    <li>Compensation for losses</li>
                    <li>Free repair of product</li>
                </ul>
            </div>
        `;
        answer.helplines = [
            { name: 'Consumer Helpline', number: '1800-11-4000' },
            { name: 'Consumer Court', number: 'Visit Local Court' }
        ];
    } else if (q.includes('domestic') || q.includes('violence') || q.includes('abuse')) {
        answer.text = `
            <div style="line-height: 1.8; color: #333;">
                <h5><i class="fas fa-hand-fist"></i> What is Domestic Violence?</h5>
                <p>Abuse within family like hitting, insulting, forcing, threatening, emotional hurt, or sexual assault. It's a <strong>serious crime</strong>.</p>

                <h5><i class="fas fa-exclamation-circle"></i> What can you do IMMEDIATELY?</h5>
                <ol>
                    <li><strong>Call women helpline:</strong> 1091 (24/7 free service)</li>
                    <li><strong>Go to police station:</strong> File FIR (First Information Report)</li>
                    <li><strong>Get medical help:</strong> Go to nearest hospital/clinic</li>
                    <li><strong>Inform family/friends:</strong> Tell someone you trust</li>
                    <li><strong>Save evidence:</strong> Take photos, keep records</li>
                </ol>

                <h5><i class="fas fa-shield-alt"></i> Your Legal Rights:</h5>
                <ul>
                    <li>You have <strong>right to safety</strong></li>
                    <li>You can <strong>stay away</strong> from abuser</li>
                    <li>Police will <strong>protect</strong> you</li>
                    <li>You can get <strong>compensation</strong> for injuries</li>
                    <li>You have <strong>right to property</strong></li>
                    <li>You can get <strong>custody of children</strong></li>
                    <li>Abuser can be sent to <strong>jail</strong></li>
                </ul>

                <h5><i class="fas fa-building"></i> Where to go for help:</h5>
                <ul>
                    <li>Police station (file FIR)</li>
                    <li>Women's shelter/safe house</li>
                    <li>Hospital (for injuries)</li>
                    <li>Court (for protection order)</li>
                    <li>NGO (for counseling)</li>
                </ul>
            </div>
        `;
        answer.helplines = [
            { name: 'Women Helpline (24/7)', number: '1091' },
            { name: 'Domestic Violence Helpline', number: '181' },
            { name: 'Police Emergency', number: '100' },
            { name: 'AISA Helpline', number: '9868115007' }
        ];
    } else if (q.includes('bail') || q.includes('arrest')) {
        answer.text = `
            <div style="line-height: 1.8; color: #333;">
                <h5><i class="fas fa-key"></i> What is Bail?</h5>
                <p><strong>Bail</strong> means temporary release from jail while your case is ongoing. You get released by paying money or giving a guarantee.</p>

                <h5><i class="fas fa-tasks"></i> Types of Bail:</h5>
                <ul>
                    <li><strong>Cash Bail:</strong> Pay money to court</li>
                    <li><strong>Bail Bond:</strong> Someone guarantees for you (no money needed)</li>
                    <li><strong>Personal Bond:</strong> Your word/promise is enough</li>
                </ul>

                <h5><i class="fas fa-check-circle"></i> Your Rights if Arrested:</h5>
                <ul>
                    <li>You have <strong>right to remain silent</strong></li>
                    <li>You can <strong>ask for a lawyer</strong></li>
                    <li>Police must tell you <strong>why you're arrested</strong></li>
                    <li>You must be produced before judge <strong>within 24 hours</strong></li>
                    <li>You can <strong>apply for bail</strong></li>
                    <li>Police cannot torture or beat you</li>
                </ul>

                <h5><i class="fas fa-briefcase"></i> How to get Bail:</h5>
                <ol>
                    <li>Tell the court you want bail</li>
                    <li>A lawyer will argue your case</li>
                    <li>Judge will decide if you get bail</li>
                    <li>If approved, pay the bail amount</li>
                    <li>You'll be released from custody</li>
                </ol>
            </div>
        `;
        answer.helplines = [
            { name: 'Legal Services Authority', number: '1800-180-1111' },
            { name: 'Police Helpline', number: '100' }
        ];
    } else {
        answer.text = `
            <div style="line-height: 1.8; color: #333;">
                <h5><i class="fas fa-lightbulb"></i> General Legal Information:</h5>
                <p>Here are some important contacts and general guidance:</p>
                
                <h5><i class="fas fa-tasks"></i> What to do if you face a legal problem:</h5>
                <ul>
                    <li>Try to <strong>understand the issue</strong> clearly</li>
                    <li><strong>Gather all documents</strong> and evidence</li>
                    <li>Contact <strong>police station</strong> for crimes</li>
                    <li>Get <strong>free legal aid</strong> if you're poor</li>
                    <li><strong>File a case</strong> in appropriate court</li>
                    <li>Consult a <strong>qualified lawyer</strong> for help</li>
                    <li><strong>Keep records</strong> of everything</li>
                </ul>

                <h5><i class="fas fa-shield-alt"></i> Remember:</h5>
                <ul>
                    <li>This is <strong>general information only</strong>, NOT legal advice</li>
                    <li>Every case is <strong>different</strong></li>
                    <li>Always consult a <strong>qualified lawyer</strong> for your specific problem</li>
                    <li><strong>Free legal aid</strong> is available if you can't afford a lawyer</li>
                    <li>Know your <strong>constitutional rights</strong></li>
                </ul>
            </div>
        `;
        answer.helplines = [
            { name: 'Legal Services Authority', number: '1800-180-1111' },
            { name: 'Police Emergency', number: '100' },
            { name: 'Women Helpline', number: '1091' }
        ];
    }

    return answer;
}

// Quick FAQ function
function quickFAQ(question) {
    document.getElementById('faqQuestion').value = question;
    answerFAQ();
    scrollTo('faq');
}

// ============ ALERT NOTIFICATIONS ============

// Show custom alerts
function showAlert(message, type = 'info') {
    // Remove existing alert
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${getAlertIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px;">×</button>
        </div>
    `;
    
    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        max-width: 400px;
    `;

    // Set color based on type
    if (type === 'success') {
        alert.style.backgroundColor = '#d4edda';
        alert.style.color = '#155724';
        alert.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        alert.style.backgroundColor = '#f8d7da';
        alert.style.color = '#721c24';
        alert.style.border = '1px solid #f5c6cb';
    } else if (type === 'warning') {
        alert.style.backgroundColor = '#fff3cd';
        alert.style.color = '#856404';
        alert.style.border = '1px solid #ffeaa7';
    } else {
        alert.style.backgroundColor = '#d1ecf1';
        alert.style.color = '#0c5460';
        alert.style.border = '1px solid #bee5eb';
    }

    document.body.appendChild(alert);

    // Auto remove after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 4000);
}

// Get icon for alert type
function getAlertIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// ============ ANIMATIONS & EFFECTS ============

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }

    .custom-alert {
        font-weight: 500;
    }

    .loading {
        text-align: center;
        padding: 30px;
        font-weight: 600;
        color: #6366f1;
    }

    .loading i {
        font-size: 24px;
        margin-right: 10px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// Scroll animations for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card, .helpline-card').forEach(el => {
        observer.observe(el);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});
