//Progress bar calculations

function isInputNumber(evt){
    var ch = String.fromCharCode(evt.which);
    if(!(/[0-9]/.test(ch))){
        evt.preventDefault();
    }
}


function enteredValidPersonalInfo(){
    var nextPage = true;

    var nameVal =  document.getElementById("fullname").value;
    if(nameVal.length < 1){
        //alert("Enter your full name!");
        nextPage = false;
    }

    var addressVal =  document.getElementById("address").value;
    if(addressVal.length < 1){
        //alert("Not a valid billing address!");
        nextPage = false;
    }

    var zipcode =  document.getElementById("zipcode").value;
    if(zipcode.length != 5){
        //alert("Not a valid Zip Code!");
        nextPage = false;
    }

    var zip = document.getElementById("email").value;
    var at = zip.indexOf("@");
    var afterAt = zip.substring(at + 1, zip.length);
    if (at == -1 || afterAt.length == 0) {
        //alert("Not a valid e-mail!");
        nextPage = false;
    }

    var phoneVal = document.getElementById("phone").value;
    if(phoneVal.length != 10){
        //alert("Not a valid phone number!");
        nextPage = false;
    }

    if(nextPage){
        $( "#tabs" ).tabs({
            disabled: [ 2 ],
            event: "mouseover"
        });
    }
}


function enteredValidPieInfo(){
  $( "#tabs" ).tabs({
      disabled: [],
      event: "mouseover"
  });
}


var responseArr;

function clickStartSurvey(){
    //$("#help-me-choose-intro").css("visibility", "hidden");
    $("#help-me-choose-intro").css("display","none");
    $("#theCake").css("display","none");
    $("#survey").css("display","inline");
    //$("#survey").css("visibility", "visible");
    responseArr = [null, null, null, null, null];
    reactToOption("#question_1");
    lightUpCurrent("#question_1");
}

// Displays the passed id's question and hide others
function reactToOption(id){
    var questionIDs = ["#question_1", "#question_2", "#question_3", "#question_4", "#question_5"];
    lightUpCompleted();
    var index;
    for(index = 0; index < questionIDs.length; index ++){
        currID = questionIDs[index];
        if(currID != id){
            $(currID).css("display","none");
        } else{
            $(currID).css("display", "inline");
            lightUpCurrent(currID);
        }

    }

}

// Calculates which progress indicator to make green
function lightUpCurrent(id){
    // var index;
    // for(index = 0; index < responseArr.length; index ++){
    //   if (("question_"+(index+1)) != id) {
    //     var rgb = $("a#option_"+(index + 1)+".circle").css("background-color").match(/\d+/g);
    //     var hex = '#'+ Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);
    //       if(hex == "#00FF00"){
    //           $("a#option_"+(index + 1)+".circle").css("background-color", "gray");
    //       }
    //   }
    // }
    questionNum = id.substring(id.length-1, id.length);
    $("a#option_"+questionNum+".circle").css("background-color", "#00FF00");
}

function lightUpCompleted(){
    var index;
    for(index = 0; index < responseArr.length; index ++){
        if(responseArr[index] != null){
            $("a#option_"+(index + 1)+".circle").css("background-color", "green");
        }
    }


}
function hasNull(){
    var index;
    for (index = 0; index < responseArr.length; index ++){
        if(responseArr[index] == null){
            return true;
        }
    }
    return false;
}

function populateResponseArray(questionNum, responseNum){
    responseArr[questionNum - 1] = questionNum + "." +responseNum;
    //alert(responseArr);
    $("#hollow-circle-" + questionNum + "" + responseNum).css("border-color", "green");
    if(hasNull()){
        lightUpCompleted();
        lightUpCurrent("#question_" + (questionNum + 1))
        reactToOption("#question_" + (questionNum + 1));
    } else{
        var theCake = calculateCake();
        displayCaculatedCake(theCake);
    }
}
cakes = {
    "raspberry":["1.3", "1.4", "2.2", "3.1", "4.1", "4.3", "5.2"],
    "choco_choco":["1.1", "1.3", "1.4", "2.3", "3.1", "3.4", "4.1", "4.3", "5.3"],
    "apricot_tea": ["1.1", "1.4", "2.2", "3.3", "4.1", "5.2", "5.1"],
    "lavender_rose": ["1.3", "1.4", "2.3", "3.2", "3.4", "4.4", "5.1", "5.2", "5.4"],
    "rosemary_pecan": ["1.3", "1.4", "2.1", "3.3", "4.2", "5.1", "5.4"],
    "choco_almond": ["1.2", "1.1", "2.2", "3.2", "4.3", "5.3"],
    "eldeberry": ["1.3", "1.4", "2.3", "3.4", "4.2", "4.3", "5.2", "5.4"],
    "strawberry": ["1.1", "1.2", "2.1", "2.2", "3.2", "4.1", "4.4", "5.2", "5.3"]
}
comments = {
  "raspberry":"https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=aQSMQjtk6ndFvU0fWE-W3Q",
  "choco_choco":"https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=6IdhAbjxasFCND9vIklTTw",
  "apricot_tea":"https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=XtfVpxpZTae0MWgaP2gzGg",
  "lavender_rose": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=fkraG1aZwkONF7iLObsk1A",
  "rosemary_pecan": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=KWdNfjEhp1KuN2X3WVcY3w",
  "choco_almond": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=0Qu_3FOB6e-GGDJODHeH6A",
  "eldeberry": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=5EHv9wiImgxecvA8NatXYQ",
  "strawberry": "https://www.yelp.com/biz_photos/the-butterwood-bake-consortium-pittsburgh?select=R7vYu5F5p_Vje3mhA0OGLQ"

}
cake_name = {
  "raspberry":"Raspberry cake with chocolate buttercream",
  "choco_choco":"Chocolate with chocolate!",
  "apricot_tea":"Apricot vanilla tea cake",
  "lavender_rose": "Lavender rose with blackberry cream",
  "rosemary_pecan": "Rosemary and pecan cake",
  "choco_almond": "Vegan chocolate cake with almond buttercream",
  "eldeberry": "Elderberry cake with blackberries and creme.",
  "strawberry": "Strawberry cake"

}
function calculateCake(){
    var maxEqual = 0;
    var maxCake = new Set([]);
    for(var cake in cakes){
        cakeNumbers = cakes[cake];
        intersection = cakeNumbers.filter(value => -1 !== responseArr.indexOf(value));
        if(intersection.length > maxEqual){
            maxEqual = intersection.length;
            maxCake = new Set([cake]);
        } else if(intersection.length == maxEqual){
            maxCake.add(cake);
        }
    }
    if (maxCake.length == 1){
        console.log(maxCake);
        ansCake = maxCake[0];
    } else {
        console.log(maxCake);
        var arrCakes = Array.from(maxCake);
        var min = 0;
        var max = arrCakes.length-1;
        console.log(max);
        var randInd = Math.floor((Math.random() * max) + min);
        console.log(randInd);
        console.log(arrCakes);
        console.log(arrCakes[randInd]);
        ansCake = arrCakes[randInd];
    }
    if(ansCake == null || ansCake == ""){
        return "choco_choco";
    }else{
        return ansCake;
    }

}

function displayCaculatedCake(theCake){
    $("#survey").css("display","none");
    var imageUrl = $("#theCake").css("background-image");
    imageUrl=imageUrl.replace('choco_choco',theCake);
    $("#theCake").css("background-image",imageUrl);
    $("#theCakeComment").attr("href", comments[theCake]);
    var cakeName = $("#theCakeComment").text();
    cakeName = cakeName+" "+cake_name[theCake];
    $("#theCakeComment").text(cakeName);

    $("#theCake").css("visibility", "visible");
    $("#theCake").css("display", "block");
    $("#theCake").css("height","35em");
}
