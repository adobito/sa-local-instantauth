// Get the values of httpsOnly and domain from local storage
browser.storage.local.get(['httpsOnly', 'domain']).then((result) => {
  const { httpsOnly, domain } = result;

  // Get the URL of the current page and parse it using the URL object
  const url = new URL(window.location.href);

  // Check if the URL is within the domain and in the path /sign_in
  if (url.hostname === domain && url.pathname === '/sign_in') {
    // Check the protocol if httpsOnly is enabled or disabled
    if (httpsOnly && url.protocol === 'https:' || !httpsOnly && (url.protocol === 'http:' || url.protocol === 'https:')) {
      infiniteLoopCheck(automatedPasswordFiller,
        function () {
          alert('Password might be incorrect or some other issue may be causing the login to fail');
        }
      );
    }
  }
});

function infiniteLoopCheck(onSuccess, onFailure) {
  browser.storage.local.get('timestamp').then((result) => {
    // Get the current timestamp
    const now = Date.now();
    if (result.timestamp && now - result.timestamp < 10000) {
      // Show an alert if the timestamp is less than 10 seconds old
      onFailure();

      // Remove the timestamp from local storage
      browser.storage.local.remove('timestamp');
    } else {
      // Set the current timestamp in local storage
      browser.storage.local.set({ timestamp: now });
      onSuccess();
    }
  });
}


function automatedPasswordFiller() {
  browser.storage.local.get("password").then((result) => {
    var password = result.password;
    // If the password is not present, show a prompt to the user
    if (!password) {
      const passwordPrompt = window.prompt("Please enter your Solar Assistant password:", "");
      if (passwordPrompt) {
        // Save the password to storage
        browser.storage.local.set({ password: passwordPrompt });
      }
      password = passwordPrompt;
    }
    const passwordTextbox = document.getElementById("password");

    // Check if a password textbox was found
    if (passwordTextbox) {
      // Fill in the password
      passwordTextbox.value = password;

      // Find the closest submit button to the password textbox
      const submitButton = document.querySelector('button[type="submit"]');
      // Check if a submit button was found
      if (submitButton) {
        // Click the submit button
        submitButton.click();
      }
    }
  });
}