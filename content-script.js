// Check if the password is present in storage
browser.storage.local.get("solarAssistantPassword").then((result) => {
  var password = result.solarAssistantPassword;
  // If the password is not present, show a prompt to the user
  if (!password) {
    const passwordPrompt = window.prompt("Please enter your Solar Assistant password:", "");
    if (passwordPrompt) {
      // Save the password to storage
      browser.storage.local.set({ solarAssistantPassword: passwordPrompt });
    }
    password = passwordPrompt;
  }
  const passwordTextbox = document.getElementById("password");
  console.log(passwordTextbox);

  // Check if a password textbox was found
  if (passwordTextbox) {
    // Fill in the password
    passwordTextbox.value = password;

    // Find the closest submit button to the password textbox
    const submitButton = document.querySelector('button[type="submit"]');
    console.log(submitButton);
    // Check if a submit button was found
    if (submitButton) {
      // Click the submit button
      submitButton.click();
    }
  }
});