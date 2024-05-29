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

    if (selector == 'name' || selector == 'title' || selector == 'icon'){
        isName(selector,value)
    }

    if (selector == 'icon') {
        isIcon(selector, value)
    }

    if (selector == 'email') {
        isEmail(selector, value)
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

function isName(selector,value) {

    let name = new RegExp('^[a-zA-Z ]+$');

    if(!name.test(value)){
        this.showError(selector, 'space, အက္ခရာ အကြီး၊ အသေးတို့ကိုသာ အသုံးပြုပါ');
    }
    else if (value.length > 30 || value.length < 5) {
        this.showError(selector, 'စာလုံးရေ ၅ လုံးမှ ၃၀ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isIcon(selector, value) {

    let name = new RegExp('^[a-zA-Z- ]+$');

    if (!name.test(value)) {
        this.showError(selector, 'space, - နှင့် အက္ခရာ အကြီး၊ အသေးတို့ကိုသာ အသုံးပြုပါ');
    }
    else if (value.length > 15 || value.length < 5) {
        this.showError(selector, 'စာလုံးရေ ၅ လုံးမှ ၁၅ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isEmail(selector, value) {

    let email = new RegExp('^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    
    if(!email.test(value)) {
        this.showError(selector, 'မှန်ကန်သော အီးမေးလ်ကိုသာ ထည့်ပါ');
    }
    else if (value.length > 50 || value.length < 11) {
        this.showError(selector, 'စာလုံးရေ ၁၁ လုံးမှ ၅၀ လုံးအတွင်းသာ ထည့်ပါ');
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

function showError(selector,message = null){
    $("[name='"+selector+"']").addClass('is-invalid');
    $("." +selector).text(message);
}

function showValid(selector){
    $("[name='" + selector + "']").removeClass('is-invalid');
    $("[name='" + selector + "']").addClass('is-valid');
}