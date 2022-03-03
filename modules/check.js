let lf=['xpow2','n-factorial'];
let rf=['10powX','epowX','sqrt'];
let amS=['sin','cos','tan','ln','log','arcSin','arcCos','arcTan','percentage','rtY','pie','powY'];
let functionalKeys=lf.concat(rf).concat(amS);
//
let hasSci=function(arr){
    for(let each of arr){
        if(functionalKeys.some(x=> x==each)){
            return each;
        }
    }
};
function leftHandSci(key,val){
    let value=Number(val);
    function xpow2(arg){
        return Math.pow(arg,2);
    }
    function factorial(arg){
        if (arg <= 0) { // terminal case
            return 1;
          } else { // block to execute
            return (arg * factorial(arg - 1));
          }
    }
    if(key=='xpow2'){
        return xpow2(value);
    }
    else return factorial(value);
}//end

function rightHandSci(key,val){
    let value= Number(val);
    function tenPowX(arg){
        return Math.pow(10,arg);
    }
    function epowX(arg){
        return Math.exp(arg);
    }
    function sqrt(arg){
        return Math.sqrt(arg);
    }
    if(key == '10powX'){
        return tenPowX(value);
    }
    if(key == 'epowX'){
        return epowX(value);
    }
    else return sqrt(value);
}//end

function ambidextrousSci(key,val1,val2){
    function degreeToRad(degree){
        return degree*0.017453;
      }
    let value1=Number(val1),value2=Number(val2);
    function sin(arg1,arg2){
        if(arg1){
            return arg1 * Math.sin(degreeToRad(arg2));
        }
        else{
            return Math.sin(degreeToRad(arg2));
        }
    }
    function cos(arg1,arg2){
        if(arg1){
            return arg1 * Math.cos(degreeToRad(arg2));
        }
        else{
            return Math.cos(degreeToRad(arg2));
        }
    }
    function tan(arg1,arg2){
        if(arg1){
            return arg1 * Math.tan(degreeToRad(arg2));
        }
        else{
            return Math.tan(degreeToRad(arg2));
        }
    }
    function arcSin(arg1,arg2){
        if(arg1){
            return arg1 * Math.asin(degreeToRad(arg2));
        }
        else{
            return Math.asin(degreeToRad(arg20));
        }
    }
    function arcCos(arg1,arg2){
        if(arg1){
            return arg1 * Math.acos(degreeToRad(arg2));
        }
        else{
            return Math.acos(degreeToRad(arg20));
        }
    }
    function arcTan(arg1,arg2){
        if(arg1){
            return arg1 * Math.atan(degreeToRad(arg2));
        }
        else{
            return Math.atan(degreeToRad(arg2));
        }
    }
    function ln(arg1,arg2){
        function ln(arg){
            return Math.log(arg)/Math.log(Math.E);
        }
        if(arg1){
            return arg1 * ln(arg2);
        }
        else{
            return ln(arg2);
        }
    }
    function log(arg1,arg2){
        if(arg1){
            return arg1 * Math.log(arg2);
        }
        else{
            return Math.log(arg2);
        }
    }
    function displayRoot(root,num){
        return Math.round(Math.pow(num,1/root));
    }
    function rtY(arg1,arg2){
        if(!arg1){
            return Math.sqrt(arg2);
        }
        else{
            return displayRoot(arg1,arg2);
        }
    }
    function percentage(arg1,arg2){
        return (arg1/arg2)*100;
    }
    function pie(arg1,arg2){
        if(arg1){
            return arg1 * Math.PI * arg2;
        }
        else return Math.PI * arg2;
    }

    if(key=='sin'){
        return sin(value1,value2);
    }
    if(key=='cos'){
        return cos(value1,value2);
    }
    if(key=='tan'){
        return tan(value1,value2);
    }
    if(key=='arcTan'){
        return arcTan(value1,value2);
    }
    if(key=='arcCos'){
        return arcCos(value1,value2);
    }
    if(key=='arcSin'){
        return arcSin(value1,value2);
    }
    if(key=='ln'){
        return ln(value1,value2);
    }
    if(key=='log'){
        return log(value1,value2);
    }
    if(key=='rtY'){
        return rtY(value1,value2);
    }
    if(key=='pie'){
        return pie(value1,value2);
    }
    if(key=='percentage'){
        return percentage(value1,value2);
    }
}//end
function divide(calculation){
    let index = calculation.indexOf('/');
    if(index!== -1){
        let result = (Number(calculation[index-1]))/Number((calculation[index+1]));
        calculation.splice(index-1,3,result);
    }
    index = calculation.indexOf('/');
    if(index !== -1){
        return divide();
    }
    return calculation;
}
function multiply(calculation){
    let index = calculation.indexOf('*');
    if(index!== -1){
        let result = Number((calculation[index-1]))*Number((calculation[index+1]));
        calculation.splice(index-1,3,result);
    }
    index = calculation.indexOf('*');
    if(index !== -1){
        return multiply();
    }
    return calculation;
}
function add(calculation){
    let index = calculation.indexOf('+');
    if(index!== -1){
        let result = Number((calculation[index-1]))+Number((calculation[index+1]));
        calculation.splice(index-1,3,result);
    }
    index = calculation.indexOf('+');
    if(index !== -1){
        return add();
    }
    return calculation;
}
function substract(calculation){
    let index = calculation.indexOf('-');
    if(index!== -1){
        let result = Number((calculation[index-1]))-Number((calculation[index+1]));
        calculation.splice(index-1,3,result);
    }
    index = calculation.indexOf('-');
    if(index !== -1){
        return substract();
    }
    return calculation;
}



function baseCase(baseCaseArray){
    let calculation = baseCaseArray;
    function SCI(){
        let key= hasSci(calculation);
        let prev;
        let next;
        let keyIndex;
        let prevKey; 
        let nextKey;
        if(key){
            
            keyIndex=baseCaseArray.indexOf(key);
            prev=lf.some(x=> x==key) || amS.some(x=> x==key);
            next=rf.some(x=> x==key) || amS.some(x=> x==key);
            prevKey=Number(calculation[keyIndex-1]);
            nextKey=Number(calculation[keyIndex+1]);
            if(prev && next){
                if(key === 'pie'){
                    if(Number.isNaN(prevKey) && Number.isNaN(nextKey)){
                        let result = ambidextrousSci(key,undefined,undefined);
                        calculation.splice(keyIndex,1,result); console.log('im in pie block 1'); debugger;
                    }
                    if(Number.isNaN(prevKey) && !Number.isNaN(nextKey)){
                        let result=ambidextrousSci(key,undefined,calculation[keyIndex+1]);
                        calculation.splice(keyIndex,2,result); console.log('im in pie block 2'); debugger;
                    }
                    else {
                        let result= ambidextrousSci(calculation[keyIndex-1],calculation[keyIndex+1]);
                        calculation.splice(keyIndex-1,3,result); console.log('pie else block'); debugger;
                    }
                }
                else{
                    if(Number.isNaN(prevKey)){
                        let result=ambidextrousSci(key,undefined,nextKey);
                        calculation.splice(keyIndex,2,result); console.log('im in else block if prev is not a number'); debugger;
                    }
                    else{
                        let result = ambidextrousSci(key,calculation[keyIndex-1],calculation[keyIndex+1]);
                        calculation.splice(keyIndex-1,3,result); console.log('am in else else block, all goes well'); debugger;
                    }
            }
            }
            if(prev && !next){
                let result = leftHandSci(key,calculation[keyIndex-1]);
                calculation.splice(keyIndex-1,2,result); 
            }
            if(!prev && next){
                let result = rightHandSci(key,calculation[keyIndex+1]);
                calculation.splice(keyIndex,2,result); 
            }
        } console.log(calculation);
        key=hasSci(calculation); debugger; 
        if(key){
            return SCI();
        }
        else{
            return ;
        }
        
    }
    function DMAS(){
        calculation = divide(calculation); 
        calculation=multiply(calculation);
        calculation= add(calculation);
        calculation=substract(calculation);
    }
SCI();
DMAS();
return calculation[0];
}