function showServerErrors(errors) {
    for (key in errors) {
        if (errors[key] != "")
        {
            this.showError(key, errors[key])
        }
    }
}

function checkValidate(e){
    let selector = e.target.name;
    let value = e.target.value;

    if (selector == 'word'){
        isWord(selector,value)
    }

    if (selector == 'pronunciation') {
        isPronunciation(selector, value)
    }

    if (selector == 'meaning') {
        isMeaning(selector, value)
    }

    if (selector == 'phone') {
        isPhone(selector, value)
    }

    if (selector == 'password') {
        isPassword(selector, value)
    }

    if (selector == 'type') {
        isUserType(selector, value)
    }

    if (selector == 'description') {
        isDescription(selector, value)
    }

    if(selector == 'priority'){
        isNumber(selector,value)
    }
}

function isWord(selector,value) {

    let word = new RegExp('^[a-zA-Z ]+$');

    if(!word.test(value)){
        this.showError(selector, 'space, အက္ခရာ အကြီး၊ အသေးတို့ကိုသာ အသုံးပြုပါ');
    }
    else if (value.length > 30 || value.length < 1) {
        this.showError(selector, 'စာလုံးရေ ၁ လုံးမှ ၃၀ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isPronunciation(selector, value) {

    if(!value){
        this.showNormal(selector)
    }
    else if (value && (value.length > 30 || value.length < 1)) {
        this.showError(selector, 'စာလုံးရေ ၁ လုံးမှ ၃၀ လုံးအတွင်း ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isMeaning(selector, value) {

    if(value.length == 0){
        this.showError(selector, 'ကျေးဇူးပြုပြီး စကားလုံး အဓိပ္ပါယ်ကို ထည့်ပါ');
    }
    if (value.length > 100 || value.length < 1) {
        this.showError(selector, 'စာလုံးရေ ၁၁ လုံးမှ ၅၀ လုံးအတွင်း ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isPassword(selector, value) {

    if (value.length > 30 || value.length < 5) {
        this.showError(selector, 'စာလုံးရေ ၅ လုံးမှ ၃၀ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isPhone(selector, value) {

    console.log(value.length)

    let phone = new RegExp('^[+]+[0-9]+$');

    if (!phone.test(value)){
        this.showError(selector, '+ နှင့် ဂဏန်းများကိုသာ အသုံးပြုပါ');
    }
    else if (value.length > 15 || value.length < 11) {
        this.showError(selector, 'စာလုံးရေ ၁၁ လုံးမှ ၁၅ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isDescription(selector,value){

    if (value.length > 1000 || value.length < 50) {
        this.showError(selector, 'စာလုံးရေ ၅၀ လုံးမှ ၁၀၀၀ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isUserType(selector, value) {

    if (value.length > 10 || value.length < 4) {
        this.showError(selector, 'စာလုံးရေ ၄ လုံးမှ ၁၀ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isNumber(selector, value) {
    if (value == "" || value > 50 || value < 1) {
        this.showError(selector, '၁ မှ ၅၀ အတွင်း ကိန်းဂဏန်းကိုသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function showNormal(selector) {
    $("[name='" + selector + "']").removeClass('is-invalid is-valid');
}

function showError(selector,message = null){
    $("[name='"+selector+"']").addClass('is-invalid');
    $("." +selector).text(message);
}

function showValid(selector){
    $("[name='" + selector + "']").removeClass('is-invalid');
    $("[name='" + selector + "']").addClass('is-valid');
}