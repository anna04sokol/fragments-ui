// src/app.js
import { getUserFragments, createFragment } from "./api";
import { signIn, getUser } from "./auth";

async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  const loginBtn = document.querySelector("#login");
  const createSection = document.querySelector("#create-fragment");
  const form = document.querySelector("#fragmentForm");
  const output = document.querySelector("#output");

  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    signIn();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    return;
  }

  // Do an authenticated request to the fragments API server and log the result
  const userFragments = await getUserFragments(user);

  // Update the UI to welcome the user
  userSection.hidden = false;
  // Show the user's username
  userSection.querySelector(".username").innerText = user.username;

  createSection.hidden = false;

  // Disable the Login button
  loginBtn.disabled = true;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fragmentInput = document.getElementById("fragmentInput").value;
    const fragmentType = document.getElementById("fragmentType").value;

    try {
      const result = await createFragment(user, fragmentInput, fragmentType);

      output.innerHTML = `Fragment was created. Location: ${result.location}`;

      document.getElementById("fragmentInput").value = "";
    } catch (err) {
      output.innerHTML = `Error: ${err.message}`;
    }
  });
}

// Wait for the DOM to be ready, then start the app
addEventListener("DOMContentLoaded", init);
