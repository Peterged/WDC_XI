import { Type, Input } from "./util/util.js";
try {
    const content = document.querySelector('.container .content');
    let userInput = content.querySelector('form input.username');
    let userInputWarn = content.querySelector('.warnUsername');
    let emailInput = content.querySelector('form input.email');
    let emailInputWarn = emailInput ? content.querySelector('.warnEmail') : undefined;
    let passwordInput = content.querySelector('form input.passwordInput');
    let passwordInputWarn = content.querySelector('.warnPassword');
    new Input(emailInput).emailCheck(emailInputWarn);
    userInput ? new Input(userInput).lengthCheck(userInputWarn) : undefined;
    new Input(passwordInput).passwordCheck(passwordInputWarn, 8);
} catch (err) { }
