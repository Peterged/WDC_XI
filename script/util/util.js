export const Type = {
    equal(variable, variable2){
        return (typeof variable == typeof variable2);
    }
}

class Verify {
    constructor(string, element = ""){
        if(element) {
            if(Type.equal(element, "")){
                if(!/^[#.]\w+/.test(element)) throw new RangeError("Invalid selector!");
                this.element = document.querySelector(element); 
            }
            else {
                this.element = element;
            }
        }

        if(!Type.equal(string, "")) throw new RangeError("Argument must be a string!");
        this.string = string;
    }
    /**
     * 
     * @param {*} string 
     * @param {*} addString 
     * @returns 
     */
    #addIfEmpty(string, addString){
        if(!Type.equal(string, "")) throw new RangeError("Argument must be a string!");
        if(string) return string += addString;
    }
    capital(text){
        return !/[A-Z]/g.test(this.string) ?
            `${text || "Input"} must contain a uppercase letter!` : "";
    }
    lowercase(text){
        return !/[a-z]/g.test(this.string) ?
            `${text || "Input"} must contain a lowercase letter!` : "";
    }
    /**
     * 
     * @param {*} text 
     * @returns 
     */
    symbol(text){
        return !new RegExp(`[^A-Za-z0-9]`, 'g').test(this.string) ? 
            `${text || "Input"} must contain a symbol!` : "";
    }
    /**
     * 
     * @param {number} length 
     * @param {number} maxLength 
     * @param {string} text 
     * @returns 
     */
    minmax(length, maxLength, text){
        if(this.string.length < length || this.string.length > maxLength){
            if(maxLength < 1)
                return `${text || "Input"} must atleast contain ${length} character${length>1?"s":""}`;
                return `${text || "Input"} must atleast contain between ${length}-${maxLength} character${maxLength>1?"s":""}`;
        }
        return "";
    }
    /**
    * @param {number} length minimum password length
    * @param {Element} element Element to show warning
    * @returns
    */
    allPassword(length, element){   
        let br = document.createElement("br");
        br.textContent = "";
        let str = "";
        let stri = this.string;
            this.element.innerText += this.capital("Password");

        if(!/[A-Z]/g.test(stri)) {
            if(str) str += "<br>";
            str += this.capital("Password");
        }

        if(!/[a-z]/g.test(stri)) {
            if(str) str += "<br>";
            str += this.lowercase("Password");
        }
        
        if(!new RegExp(`[^A-Za-z0-9]`, 'g').test(stri)) {
            if(str) str += "<br>";
            str += this.symbol("Password");
        }

        if(stri.length < length) {
            if(str) str += "<br>";
            str += this.minmax(length, 0, "Password");
        }
        
        return str;
    }   


    email(){
        let str = "";
        let stri = this.string;
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(stri))
            str += "Invalid email format";
        
        return str || "";
    }

    regexText(regex, stri){
        return regex.test(regex) ? stri : "";
    }
    
    regexMatch(regex, stri){
        return regex.match(stri);
    }
}



export class Input {
    constructor(element){
        if(Type.equal(element, "")){
            if(!/^[#.]\w+/.test(element)) throw new RangeError("Invalid selector!");
            this.element = document.querySelector(element); 
        }
        else {
            this.element = element;
        }
    }

    passwordCheck(welement, passwordLength = 8){
        if(Type.equal(welement, "")){
            if(!/^[#.]\w+/.test(welement)) throw new RangeError("Invalid selector!");
            var welementL = document.querySelector(welement); 
        }
        else {
            var welementL = welement;
        }

            this.element.addEventListener('input', ({target}) => {
                if(!target.value) {
                    welementL.innerText = "";
                    return;
                }
                target.style.borderColor = "red";
                let verify = new Verify(target.value, welementL);
                welementL.innerHTML = verify.allPassword(passwordLength);
            })
    }

    
    emailCheck(welement){
        if(Type.equal(welement, "")){
            if(!/^[#.]\w+/.test(welement)) throw new RangeError("Invalid selector!");
            var welementL = document.querySelector(welement); 
        }
        else {
            var welementL = welement;
        }
            
        
            this.element.addEventListener('input', ({target}) => {
                if(!target.value) {
                    welementL.innerText = "";
                    return;
                }
                target.style.borderColor = "red";
                let verify = new Verify(target.value);
                welementL.innerText = verify.email();
            })
    }

    lengthCheck(welement){
        if(Type.equal(welement, "")){
            if(!/^[#.]\w+/.test(welement)) throw new RangeError("Invalid selector!");
            var welementL = document.querySelector(welement); 
        }
        else {
            var welementL = welement;
        }

            this.element.addEventListener('input', ({target}) => {
                if(!target.value) {
                    welementL.innerText = "";
                    return;
                }

                target.style.borderColor = "red";
                let verify = new Verify(target.value);
                welementL.innerText = verify.minmax(3, 24, "Username");




                
            })
            
    }
}
