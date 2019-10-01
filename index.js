var AlgorithmHandler = require('./algorithms');
//Local Dependency with the handler functions

var employeeData = ['Ashish Kumar Dubey', 'Ashish Dua', 'Ashwin Pandey', 'Sunitha Krishnaji', 'Pourab Karchaudhuri', 'Pournima Mishra']
var inputName = "Ashish";
var threshold = 0.85;
//These are inputs for String Distance Algorithm

var inputSentence = "Debdutta Mondal is a nice ring";
//These are inputs for Proper Noun Retention Algorithm

AlgorithmHandler.StringDistance(inputName, employeeData, threshold, (err, result) => {
    if(err){
        console.log("Error in stringDistance Function : ", err);
    }
    else{
        //Filtered Top Results
        //Expected Response is List with Names and respective scores
        console.log(result)
    }
})

// AlgorithmHandler.ProperNounRetention(inputSentence, (err, result) => {
//     if(err){
//         console.log("Error in ProperNounRetention Function : ", err);
//     }
//     else{
//         //Cleaned Name
//         //Expected Response "FirstName LastName"
//         console.log(result)
//     } 
// })
