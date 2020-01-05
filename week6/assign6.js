function validateFirstname() {
    var fName = document.getElementById("firstName").value;
    var re1 = /^[a-zA-Z\s\'\-]{2,15}$/;
    if (re1.test(fName)) {
        document.getElementById("firstNamePrompt").style.color = "blue";
        document.getElementById("firstNamePrompt").innerHTML = "<strong>valid</strong>";
        return true;

    } else {
        document.getElementById("firstNamePrompt").style.color = "Red";
        document.getElementById("firstNamePrompt").innerHTML = "<strong>Enter 2-15 characters</strong>";
        return false;
    }
}

function validateLasttname() {
    var lName = document.getElementById("lastName").value;
    var re2 = /^[a-zA-Z\s\'\-']{2,25}$/;
    if (re2.test(lName)) {
        document.getElementById("lastNamePrompt").style.color = "blue";
        document.getElementById("lastNamePrompt").innerHTML = "<strong>valid</strong>";
        return true;

    } else {
        document.getElementById("lastNamePrompt").style.color = "Red";
        document.getElementById("lastNamePrompt").innerHTML = "<strong>Enter 2-25 characters</strong>";
        return false;
    }
}
function validatephone() {
    var phone = document.getElementById("phone").value;
    var reg3 = /^\d{3}-\d{3}-\d{4}$/;
    if (reg3.test(phone)) {
        document.getElementById("phonePrompt").style.color = "blue";
        document.getElementById("phonePrompt").innerHTML = "<strong>valid</strong>";
    return true;

} else {
        document.getElementById("phonePrompt").style.color = "Red";
        document.getElementById("phonePrompt").innerHTML = "<strong>Please follow the format</strong>";
    return false;
    }
}

/* calculate the total value of order while customers check the food
 */
function totalIt() {
    var input = document.getElementsByName("food");
    var total = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked) {
            total += parseFloat(input[i].value);
        }
    }
    document.getElementById("total").value = total.toFixed(2);
}

/* calculate the final price including tax, tips and delivery fee (if any)
 */
function totalPrice() {
    var tip = document.getElementsByName("tips");
    var tip_val;
    for (var i = 0; i < tip.length; i++) {
        if (tip[i].checked) {
            tip_val = parseFloat(tip[i].value);
        }
    }

    var order = parseFloat(document.getElementById("total").value);
 
    var tax = 0.07;
    
    var totalP = order * (tax + 1) * (tip_val + 1);

    if (order < 18) {
        totalP = totalP + 2;
        document.getElementById("totalP").innerHTML = "Total Price: "+totalP.toFixed(2) + " (including 7% tax and $2 delivery fee)";
        return [order, totalP];

    } else {
        document.getElementById("totalP").innerHTML = "Total Price: "+totalP.toFixed(2) + " (including 7% tax and no delivery fee)";
        return [order, totalP];
    }
}


function orderSum(){
    
    var values = totalPrice();
    var orderP = values[0].toFixed(2);
    var totalP = values[1].toFixed(2);
    var fname = document.getElementById("firstName").value;
    var lname = document.getElementById("lastName").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    if (fname.length<1 || lname.length<1 || phone.length<1||address.length<1 ) {
        alert("Please complete your personal information...");
        return false;
    }
    var message = "Personal Information:\n" + fname.toUpperCase() + ' ' + lname.toUpperCase();
    message = message + '\n' + phone + '\n' + address.toUpperCase() +'\n\n';
    message += 'Order Summary: \n';
    var order = document.getElementsByName("food");
    for (var i=0; i<order.length; i++) {
        if (order[i].checked){
            message += order[i].getAttribute("data-valuetwo") +': '+'$' + order[i].value + '\n';
        }
    }

    var tip = document.getElementsByName("tips");
    var tip_val;
    for (var i = 0; i < tip.length; i++) {
        if (tip[i].checked) {
            tip_val = parseFloat(tip[i].value);
        }
    }

    message += "\n" + "Order Price: $" + orderP +'\n';
    message += "Tax: 7%\n" + "Tips: " + tip_val * 100 + "%\n";
    if (orderP < 18){
        message += "Delivery fee: $2\n"
    }
    else {
        message += "Delivery fee: $0\n"
    }
    message += "Total Price: $" + totalP;

    alert(message);
}