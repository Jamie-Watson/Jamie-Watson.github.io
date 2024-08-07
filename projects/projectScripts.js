function emailCopy(){
    var email="jwats018@uottawa.ca";
    navigator.clipboard.writeText(email);
    alert("Copied email: " + email);
}