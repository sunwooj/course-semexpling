# IBEX Tutorial

Day 1 will cover the basics of creating simple acceptability judgement or other types of forced-choice task experiments. We will do a mini-replication of experiment 1  reported in our reading, Brasoveanu & Dotlacil (2015). For a comprehensive step-by step guide, please consult [Brian Dillon and Rodica Ivan's LSA tutorial](https://xlingumass.github.io/resources/LSA_Minicourse_DillonIvan.pdf). The [official IBEX manual](https://github.com/addrummond/ibex/blob/master/docs/manual.md) will also be of use.

## 1. Getting started

To create a new experiment, log in to your account in [IBEX Farm](http://spellout.net/ibexfarm/) and click on *Create a new experiment*.
For a basic experiment, all you need to modify will be the javascript file under:

``` 
data_includes
```

You can download `examples_data.js` present under `data_includes` (it provides you with a basic template for a self-paced reading experiment including comprehension tasks) and work from there, or work from scratch, or work from another existing template that can execute tasks that are most similar to the experiment you have in mind. As a practice, let's try creating the main javascript file from scratch. Go to a code editor of your choice and open a new blank file. Save it in an appropriate directory and give it an intuitive name with the extension `.js`. Usually, working on this file will involve 4 parts.

* Defining experimental trials and filler/practice trials; representing them as `items` variables
* Defining controller defaults (when applicable) for experimental trials
* Adding introductions (involving consent info) and exits
* Defining `shuffleSequence` which determines the general flow and order of the experiment

Let's now go over each of the four steps one-by-one.

## 2. Defining potential trials in the items variable

We first create an `items` variable as below, which will often be a huge matrix containing of the list of potential trials (associated with distinct items and conditions), and other relevant pieces of the experiment such as the intro, the exit, and transitions between trials (if needed), as well as other backend tools such as counters. 

``` 
var items = [ ];
```

We'll now fill in this empty matrix, first with a list of possible trials. The syntax of each element (a given potential trial, i.e., condition-item pair), which will again be a matrix `[ ]`, is often as follows:

```
[["TrialType-TrialConditions", ItemNum], "ControllerType", {ArgumentsToControllers}]
```

* The first element: Again a matrix `[ ]`, in the case of target trials, consisting of:
    + TrialType: Is it a target or filler/control trial? We will label each as `main` and `fill`
    + TrialConditions: Which experimental condition is it? Recall that Brasoveanu & Dotlacil (2015) had 4 conditions from a 2x2 design (factor 1: resultative construction or not? / factor 2: every or each?). Let's label each as follows:
        + `every-yesres`: every, resultative 
        + `every-nores`: every, non-resultative
        + `each-yesres`: each, resultative
        + `each-nores`: each, non-resultative
    + ItemNum: Item number; 1, 2, 3, 4, etc.
* The second element: `ControllerType`. Here you specify the type of Controller you want to use, which will implement the main task in the trial. Commonly used Controllers in offline experiments are `AcceptabilityJudgement` (often used for implementing naturalness rating tasks involving a series of sentences) and `Question` (forced choice tasks). Though the main task involved in the present experiment is a binary forced-choice task, it calls for not just a question/answer pair, but also a sentence associated with the question. We will therefore use the `AcceptabilityJudgement` Controller, which allows for the inclusion of both sentences and questions arguments, and use binary forced choice options instead of a 7 point scale.
* The third element: `{ArgumentsToControllers}`. This is a list specifying the values of the arguments called for by the controller above. Different types of Controllers call for different types of obligatory arguments. Consult the documentation in the [official manual](https://github.com/addrummond/ibex/blob/master/docs/manual.md) to check which arguments a given Controller calls for. The `AcceptabilityJudgement` Controller, for instance, calls for values of `s` (the sentence), `q` (the question), and `as: ["", "", ...]` (the scale or the options that will function as answer choices to the questions).

Here is an example of an element in the `items` list, which instantiates a specific condition-item pair (i.e.,~a potential trial). Proper indentations facilitate easy recognition of the components that make up the element, so change lines and introduce tab spaces in appropriate junctures.

```
[["main-every-yesres", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror spotless.", 
    q: "Please click on the more likely interpretation of the sentence."
    as: ["Each mirror was polished by a possibly different maid.", 
        "All the mirrors were polished by the same maid."]
        }
    ]
```

Each item (in this case, item 1), is associated with 4 conditions, though given the current experiment design, a given participant will see the item instantiated in only one of the 4 possible conditions. Create the rest of the 3 additional condition-item pairs for item 1 and add them in the `items` matrix, making sure to put a comma between these potential trials. (Consult `stimuli-list.txt`.) Your `items` variable should now look as follows: 

```
var items = [

    [["main-every-yesres", 1], "AcceptabilityJudgment", {
        s: "A maid polished every mirror spotless.", 
        q: "Please click on the more likely interpretation of the sentence.",
        as: ["Each mirror was polished by a possibly different maid until it was spotless.", 
            "All the mirrors were polished by the same maid until they were spotless."]
            }
        ],

    [["main-every-nores", 1], "AcceptabilityJudgment", {
        s: "A maid polished every mirror.", 
        q: "Please click on the more likely interpretation of the sentence.",
        as: ["Each mirror was polished by a possibly different maid.", 
            "All the mirrors were polished by the same maid."]
            }
        ], 

    [["main-each-yesres", 1], "AcceptabilityJudgment", {
        s: "A maid polished each mirror spotless.",
        q: "Please click on the more likely interpretation of the sentence.",
        as: ["Each mirror was polished by a possibly different maid until it was spotless.", 
            "All the mirrors were polished by the same maid until they were spotless."]
            }
        ],

    [["main-each-nores", 1], "AcceptabilityJudgment", {
        s: "A maid polished each mirror.",  
        q: "Please click on the more likely interpretation of the sentence.",
        as: ["Each mirror was polished by a possibly different maid.", 
            "All the mirrors were polished by the same maid."]
            }
        ]

    ];
```

Spacings between elements as well as indentations introduced above are not necessary to make the script work; they are simply there to help you better see the structure of each element in the list. Note however the last element of the list in `items` does not have a comma after it. 

## 3. Defining controller defaults

You may have realized from doing the task above that some of the info you provided as a list are a bit redundant. In particular, values of certain arguments of the `AcceptabilityJudgement` Controller may be identical throughout the experiment. In this case, you can specify such values in the `defaults` variable, and need not provide it repetitively under `items`. The general syntax for the `defaults` variable is something like the following, for any number of Controllers and their arguments (e.g., arg1, arg2).

```
var defaults = [
    "Controller1", {
        arg1: "",
        arg2: ""
    },
    "Controller2", {
        arg1: ""
    }   
];
```

For instance, we can designate the default for the `q` argument of `AcceptabilityJudgement` as follows, and get rid of the `q` variable in the main item section. Your script should now look something like this:

```
var defaults = [
    "AcceptabilityJudgment", {
        q: "Please choose the more likely interpretation."
    }
];


var items = [

    [["main-every-yesres", 1], "AcceptabilityJudgment", {
        s: "A maid polished every mirror spotless.", 
        as: ["Each mirror was polished by a possibly different maid until it was spotless.", 
            "All the mirrors were polished by the same maid until they were spotless."]
            }
        ],

    [["main-every-nores", 1], "AcceptabilityJudgment", {
        s: "A maid polished every mirror.", 
        as: ["Each mirror was polished by a possibly different maid.", 
            "All the mirrors were polished by the same maid."]
            }
        ], 

    [["main-each-yesres", 1], "AcceptabilityJudgment", {
        s: "A maid polished each mirror spotless.",
        as: ["Each mirror was polished by a possibly different maid until it was spotless.", 
            "All the mirrors were polished by the same maid until they were spotless."]
            }
        ],

    [["main-each-nores", 1], "AcceptabilityJudgment", {
        s: "A maid polished each mirror.",  
        as: ["Each mirror was polished by a possibly different maid.", 
            "All the mirrors were polished by the same maid."]
            }
        ]

    ];
```



* [IBEX Discussion Group](https://groups.google.com/forum/#!forum/ibexexperiments)

* [PennController for IBEX](https://www.pcibex.net/wiki/documentation/)

* [PCIBEX farm](https://expt.pcibex.net/)






