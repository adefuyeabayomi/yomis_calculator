/*calculator dom manipulator*/
let resultBlock=document.querySelector('.result-block'), textInputBlock=document.querySelector('.text-input-block'),historyBlock=document.querySelector('.history-block');
let controlKeys=document.querySelector('.control-keys'),scientificKeys=document.querySelector('.scientific-keys'),numerals=document.querySelector('.numerals'), operators=document.querySelector('.operators');
let keysArray=['ce','c','delete','history','sin','cos','tan','ln','log','arcSin','arcCos','arcTan','10powX','epowX','xpow2','percentage','sqrt','powY','rtY','pie','n-factorial','(',')','plusOrMinus','7','8','9','4','5','6','1','2','3','.','0','equals','+','-','/','*'];
/*setting the value attribute in the relevant places*/
function setAttrTo(parentDoc,dataSet){
    class dataSetError extends Error{};
    class parentDocError extends Error{};
    if(parentDoc == undefined){
        throw new parentDocError('parent node is undefined');
    }
    if(dataSet == undefined){
        throw new dataSetError('Dataset is undefined');
    }
    else var a=parentDoc;
    for(let counter = 0 ; counter<a.querySelectorAll('p').length; counter++){
        a.querySelectorAll('p')[counter].setAttribute('value',dataSet[counter]);
        a.querySelectorAll('p')[counter].addEventListener('click',evaluateClickEvent);
    }
}

setAttrTo(document.querySelector('.part-one'), keysArray);

for(let counter=0; counter<4; counter++){
    controlKeys.querySelectorAll('p')[counter].removeEventListener('click',evaluateClickEvent);
}

let controlarr=['ce','c','delete','history'];
for(let counter=0; counter<controlarr.length-1; counter++){
    controlKeys.querySelectorAll('p')[counter].setAttribute('class',controlarr[counter]);
}

document.querySelector('.equals').removeEventListener('click',evaluateClickEvent);
function evaluateClickEvent(e){
    if(resultBlock.style.display=='block'){
            displayCalculation();
            if(resultBlock.childNodes[1]){
                resultBlock.removeChild(resultBlock.childNodes[1]);
            }
        }
    const val = e.target.getAttribute('value');
    if(val !== null){
        myCalculation.set(val);
        myCalculation.display();
        hideThemes();
        hideMenu();
    }
    else{ hideMenu();
        hideThemes();

    }
    
}
    document.querySelector('.delete').addEventListener('click',()=>{
   try{
    myCalculation.delete();
    if(myCalculation.currentValue=='powY'){
        myCalculation.delete();
    }
} catch(e){
    console.error(e);
}
finally{
    
}
});
//NavBar.addEventListener('click',show(document.querySelector('.mode-list')));
let menuList= document.querySelector('.toggle-click-div'),themeList=document.querySelector('.theme-div p');

function showMenu(){
 document.querySelector('.mode-list').style.display='block';
 menuList.removeEventListener('click',showMenu);
 menuList.addEventListener('click',hideMenu);
 hideThemes();
}
function hideMenu(){
document.querySelector('.mode-list').style.display='none';
menuList.removeEventListener('click',hideMenu);
menuList.addEventListener('click',showMenu);
}
function showThemes(){
document.querySelector('.theme-list').style.display='block';
themeList.removeEventListener('click',showThemes);
themeList.addEventListener('click',hideThemes);
hideMenu();
}
function hideThemes(){
document.querySelector('.theme-list').style.display='none';
themeList.removeEventListener('click',hideThemes);
themeList.addEventListener('click',showThemes);
}
menuList.addEventListener('click',showMenu);
themeList.addEventListener('click',showThemes);
//normal,scientific,and conversion.
let Ntxt=document.querySelector('.normal-txt'), Stxt=document.querySelector('.scientific-txt'), Ctxt=document.querySelector('.conversion-txt');
function normalMode(){
    Ntxt.style.display='block';
    Stxt.style.display='none';
    Ctxt.style.display='none';
    document.querySelector('.part-one').style.display='block';
    document.querySelector('.part-two').style.display='none';
let scientificKeys=document.querySelector('.scientific-keys')||document.querySelector('.scientific-keys-normode');
scientificKeys.getAttribute('class')=='scientific-keys-normode'? true : scientificKeys.setAttribute('class','scientific-keys-normode');
let numerals=document.querySelector('.numerals'),operators=document.querySelector('.operators');
for(let count= 0 ; count<numerals.children.length; count++){
    let each = numerals.children[count];
    each.setAttribute('class','nu-row-normode');
}
operators.children[0].setAttribute('class','op-container-normode');
hideMenu()
}
function scientificMode(){
    Ntxt.style.display='none';
    Stxt.style.display='block';
    Ctxt.style.display='none';
    let scientificKeys=document.querySelector('.scientific-keys')||document.querySelector('.scientific-keys-normode');
    document.querySelector('.part-one').style.display='block';
    document.querySelector('.part-two').style.display='none';
    scientificKeys.getAttribute('class')=='scientific-keys'? true : scientificKeys.setAttribute('class','scientific-keys');
    let numerals=document.querySelector('.numerals'),operators=document.querySelector('.operators');
    for(let count= 0 ; count<numerals.children.length; count++){
        let each = numerals.children[count];
        each.setAttribute('class','nu-row');
    }
    operators.children[0].setAttribute('class','op-container');
    hideMenu();
}
function conversionMode(){
    Ntxt.style.display='none';
    Stxt.style.display='none';
    Ctxt.style.display='block';
let part1=document.querySelector('.part-one'),part2=document.querySelector('.part-two');
part1.style.display='none';
part2.style.display='block';
hideMenu();
}
document.querySelector('.mode-list').children[0].addEventListener('click',normalMode);
document.querySelector('.mode-list').children[1].addEventListener('click',scientificMode);
document.querySelector('.mode-list').children[2].addEventListener('click',conversionMode);
function themeNormal(){
    
    document.getElementsByTagName("main")[0].style['background-color']='#231164';
document.getElementsByTagName("main")[0].style['color']='white';
hideThemes();
}
function themeLight(){
    document.getElementsByTagName("main")[0].style['background-color']="#e8e4e4";
    document.getElementsByTagName("main")[0].style['color']='#1d2724';
    hideThemes();    
}
function themeDark(){
    document.getElementsByTagName("main")[0].style['background-color']='#00001B';
    document.getElementsByTagName("main")[0].style['color']='#ffffff';
hideThemes();
}
document.querySelector('.theme-list').children[0].addEventListener('click',themeLight);
document.querySelector('.theme-list').children[1].addEventListener('click',themeDark);
document.querySelector('.theme-list').children[2].addEventListener('click',themeNormal);
function displayResult(){
textInputBlock.style.display='none';
resultBlock.style.display='block';
historyBlock.style.display='none';
}
function displayCalculation(){
    textInputBlock.style.display='block';
    resultBlock.style.display='none';
    historyBlock.style.display='none';
}
function displayHistory(){
    textInputBlock.style.display='none';
    resultBlock.style.display='none';
    historyBlock.style.display='block';
}
let cancelEverythingButton=controlKeys.children[0];
let cancelButton=controlKeys.children[1];
let historyButton=controlKeys.children[3];
let clearHistoryButton=document.querySelector('.clear-history');
let backToCalculation=document.querySelector('.back-to-calculation');
let equalsButton=document.querySelector('.equals');
//equals displays result,appends history, formats calculations DOM HistoryElement
historyButton.addEventListener('click',displayHistory)
function equals(){
    document.querySelector('.no-history').style.display='none';
    document.querySelector('.history-control').style.display='flex';
    displayResult();
    if(resultBlock.childNodes[1]==undefined){
        if(myCalculation.compliant){
            try{
            resultBlock.appendChild(document.createTextNode('Ans = '+ String(myCalculation.getResult(myCalculation.modify))));
            myCalculation.DOMdisplayResult.appendChild(document.createTextNode('Ans = ' + String(myCalculation.getResult(myCalculation.modify))));
            historyBlock.appendChild(myCalculation.DOMdisplay);
            myCalculation.DOMdisplay=document.createElement('section');
            myCalculation.DOMdisplayCalculation=document.createElement('p');
            myCalculation.DOMdisplayResult=document.createElement('p');
            myCalculation.DOMdisplay.style.border='2px solid';
            myCalculation.DOMdisplay.style.margin='3px';
            myCalculation.DOMdisplay.style['border-radius']='10px';
            myCalculation.DOMdisplayCalculation.appendChild(document.createTextNode('Ans '));
            myCalculation.DOMdisplay.appendChild(myCalculation.DOMdisplayCalculation); 
            myCalculation.DOMdisplay.appendChild(myCalculation.DOMdisplayResult);
            }
        catch(e){
            resultBlock.appendChild(document.createTextNode('NaN: check History to see what went wrong'));
            historyBlock.appendChild(myCalculation.DOMdisplay);
            myCalculation.DOMdisplayResult.appendChild(document.createTextNode('NaN'));
            myCalculation=new Calculation;
            //textInputBlock is refreshed.
            function emptyTextInput(){
                if(textInputBlock.lastElementChild){
                    textInputBlock.removeChild(textInputBlock.lastElementChild);
                }
                if(textInputBlock.lastElementChild){
                    return emptyTextInput();
                }
            }
            emptyTextInput();
            throw e;
        }  
        }
        if(!myCalculation.compliant){
            resultBlock.appendChild(document.createTextNode('NaN: Check history to see what went wrong'));
            historyBlock.appendChild(myCalculation.DOMdisplay);
            myCalculation.DOMdisplayResult.appendChild(document.createTextNode('NaN'));
            myCalculation=new Calculation;
            //textInputBlock is refreshed.
            emptyTextInput();
        }
   }    
}
equalsButton.addEventListener('click',equals);
function emptyTextInput(){
    if(textInputBlock.lastElementChild){
        textInputBlock.removeChild(textInputBlock.lastElementChild);
    }
    if(textInputBlock.lastElementChild){
        return emptyTextInput();
    }
}
function emptyHistory(){
    document.querySelector('.no-history').style.display='block';
    if(historyBlock.lastElementChild !== ( document.querySelector('.no-history') || document.querySelector('.history-control'))){
        historyBlock.removeChild(historyBlock.lastElementChild)
    }
    if(historyBlock.children.length == 2){
        return ;
    }
    else return emptyHistory();
}
function cancel(){
    displayCalculation();
    emptyTextInput();
    myCalculation= new Calculation;
    if(resultBlock.childNodes[1]){
        resultBlock.removeChild(resultBlock.childNodes[1]);
    }
}
cancelButton.addEventListener('click',cancel);
function BackToCalculation(){
    if(historyBlock.style.display=='block'){
        displayCalculation();
        if(resultBlock.childNodes[1]){
            resultBlock.removeChild(resultBlock.childNodes[1]);
        }
    }
}
backToCalculation.addEventListener('click',BackToCalculation);

clearHistoryButton.addEventListener('click',emptyHistory);
function ClearEveryThing(){
    emptyHistory();
    cancel();
}
cancelEverythingButton.addEventListener('click',ClearEveryThing);
