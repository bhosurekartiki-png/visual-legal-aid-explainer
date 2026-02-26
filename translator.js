        'Bail': {
            english: 'Permission to stay out of jail while waiting for court case',
            hindi: 'न्यायालय के मामले की सुनवाई के दौरान जेल से बाहर रहने की अनुमति',
            marathi: 'न्यायालयीन प्रकरणाच्या सुनावणीदरम्यान तुरुंगाबाहेर राहण्याची अनुमती'
        },
        'Maintenance': {
            english: 'Money given for living expenses',
            hindi: 'जीवन यापन के खर्च के लिए दिया जाने वाला पैसा',
            marathi: 'जीवन यापनाच्या खर्चासाठी दिला जाणारा पैसा'
        },
        'Custody': {
            english: 'Legal care and control of a person (usually children)',
            hindi: 'किसी व्यक्ति (आमतौर पर बच्चों) की कानूनी देखभाल और नियंत्रण',
            marathi: 'व्यक्तीची (सामान्यत: मुलांची) कानूनी काळजी आणि नियंत्रण'
        }
    };
    
    return explanation[term] || { english: term, hindi: term, marathi: term };
}