function enter(){
  if(document.getElementById('passcode').value == "bruh"){
    window.location.href = 'tution.html'
  } else {
    document.getElementById('passcode').placeholder = "Incorrect Password!"
    document.getElementById('passcode').value = ""
    document.getElementById('passcode').classList.add("incorrect")
  }
}
