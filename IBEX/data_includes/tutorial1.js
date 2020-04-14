// Section 3 in the tutorial 

var shuffleSequence = seq(
    "introduction", 
    sepWith("sep", rshuffle(startsWith("main"), startsWith("fill"))));


// Section 4 in the tutorial: setting defaults

// var defaults = [
//     "AcceptabilityJudgment", {
//         s: "",
//         q: "",
//         as: ["1", "2", "3", "4", "5", "6", "7"],
//         presentAsScale: true,
//         instructions: "Use number keys or click boxes to answer.",
//         leftComment: "(Bad)", rightComment: "(Good)"
//     },
//     "Question", {
//         q: "question content"
//     }
// ];


// Section 2 in the tutorial

var items = [

// Transitions and counters

["sep", "Separator", { }],

["setcounter", "__SetCounter__", { }],

// Intro

["introduction", "Message", { 
    html: ["div", 
    ["p", "In this experiment... you will do blah blah. The experiment will take 10 mins."],
    ["p", "실험 시작!"]] }
],

// Main trials:
// [["trialtype-trialconditions", item #], "Controller type", {arguments to controllers}]

//Item 1
[["main-every-yesres", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror spotless.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ], 

[["main-every-nores", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ], 

[["main-each-yesres", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror spotless.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

[["main-each-nores", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

//Item 2
    
[["main-every-yesres", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt blue.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.", "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-every-nores", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

[["main-each-yesres", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt blue.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.", "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-each-nores", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt.", 
    q: "Please choose the more likely interpretation.", 
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

// fillers

["filler-good1-01", "AcceptabilityJudgment", {
    s: "Only one boy enjoyed the show on the beach.",
    q: "Please choose the more likely interpretation.",
    as: ["Nobody but one boy enjoyed the show on the beach.", "Nobody enjoyed the show on the beach."]}
    ],

["filler-good2-02", "AcceptabilityJudgment", {
    s: "Only three girls went to the movies.",
    q: "Please choose the more likely interpretation.",
    as: ["Exactly two girls went to the movie.", "Exactly three girls went to the movie."]}
    ]

];