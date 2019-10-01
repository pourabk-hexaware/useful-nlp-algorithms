var natural = require('natural');
//npm install --save natural

var path = require("path");
var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
var defaultCategory = 'N';
//This is required for ProperNounRetention. The above dependencies and lines come with the package
//They will automatically work after "natural" is installed

module.exports = {
    'StringDistance': function(inputName, employeeData, threshold, callback){
        //This measures string distance between two strings
        var filteredNames = [];
        employeeData.forEach((element)=>{
            
            var jaroWrinklerScore = natural.JaroWinklerDistance(inputName, element);
            if(jaroWrinklerScore >= threshold){
                //Filter based on score
                
                console.log("name : " + element + " | Score : " + jaroWrinklerScore)
                filteredNames.push({
                    name: element,
                    score: jaroWrinklerScore
                })
            }
            else{
                // console.log("Nearest matches not found!");
                return;
            }
        })

        callback(null, filteredNames)

    },

    'ProperNounRetention': function(inputSentence, callback){

        var tokenizer = new natural.WordTokenizer();
        
        var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
        var rules = new natural.RuleSet(rulesFilename);
        var tagger = new natural.BrillPOSTagger(lexicon, rules);
        
        var pos = tagger.tag(tokenizer.tokenize(inputSentence))
        //Tokenization and Parts of Speech Analysis

        // console.log(pos)
        var tokenizedWords = [];
        pos.taggedWords.forEach((element)=>{
        
            if(element.tag == 'NNP' || element.tag == 'N'){
                //Considering special Nouns, Names and Proper Nouns only
                tokenizedWords.push(element.token)
            }
            else{
                //Not Proper Nouns
                return;
            }
        })

        callback(null, tokenizedWords.join(" "))
    }
}