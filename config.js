const httpsOnlyCheckbox = document.getElementById("httpsOnly");
const domainInput = document.getElementById("domain");
const passwordInput = document.getElementById("password");

// Load saved values from browser.storage.local and update the UI
browser.storage.local.get().then((data) => {
  httpsOnlyCheckbox.checked = data.httpsOnly ?? true;
  domainInput.value = data.domain ?? "";
  passwordInput.value = data.password ?? "";
});

// Save values to browser.storage.local on every change of the input fields
httpsOnlyCheckbox.addEventListener("change", () => {
  browser.storage.local.set({ httpsOnly: httpsOnlyCheckbox.checked });
});

domainInput.addEventListener("input", () => {
  browser.storage.local.set({ domain: domainInput.value });
});

passwordInput.addEventListener("input", () => {
  browser.storage.local.set({ password: passwordInput.value });
});
