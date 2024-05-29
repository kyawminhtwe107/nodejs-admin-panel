function showServerErrors(errors) {
    for (key in errors) {
        if (errors[key] != "") {
            this.showError(key, errors[key])
        }
    }
}

function checkValidate(e) {
    let selector = e.target.name;
    let value = e.target.value;

    if (selector == 'title') {
        isStringAndNumber(selector, value)
    }

    if (selector == 'chapter_no') {
        isNumber(selector, value);
    }

}

function isNumber(selector, value) {

    let name = new RegExp('^[0-9]+$');

    if (!name.test(value)) {
        this.showError(selector, 'ကိန်းဂဏန်ကိုသာ အသုံးပြုပါ');
    }
    else if (value.length > 50 || value.length < 1) {
        this.showError(selector, 'စာလုံးရေ ၅ လုံးမှ ၃၀ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function isStringAndNumber(selector, value) {

    let name = new RegExp('^[a-zA-Z0-9 ]+$');

    if (!name.test(value)) {
        this.showError(selector, 'space, အက္ခရာ အကြီး၊ အသေး နှင့် ဂဏန်း တို့ကိုသာ အသုံးပြုပါ');
    }
    else if (value.length > 30 || value.length < 5) {
        this.showError(selector, 'စာလုံးရေ ၅ လုံးမှ ၃၀ လုံးအတွင်းသာ ထည့်ပါ');
    }
    else {
        this.showValid(selector);
    }
}

function showError(selector, message = null) {
    $("[name='" + selector + "']").addClass('is-invalid');
    $("." + selector).text(message);
}

function showValid(selector) {
    $("[name='" + selector + "']").removeClass('is-invalid');
    $("[name='" + selector + "']").addClass('is-valid');
}