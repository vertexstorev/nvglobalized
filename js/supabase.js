require('dotenv').config()

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

console.log(supabase)

document
    .getElementById("signup")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const { data, error } =
            await supabaseClient.auth.signUp({
                email,
                password,
            });

        if (error) {
            alert(error.message);
        } else {
            alert("Signup successful");
        }
    });

    // www.nvglobalizedug.com
import { createClient } from '@supabase/supabase-js'

// This handles invite + magic links
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    console.log("User signed in:", session.user)
  }
});

const hash = window.location.hash

if (hash.includes("access_token")) {
  console.log("user signed in via magic link or invite:", hash)
}

// emailjs integration
function sendEmail() {
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        phone : document.getElementById("phone").value, 
        message : document.getElementById("message").value
}
    emailjs.send(service_jqjp0kz, template_g4defpr, parms).then(alert("message sent successfully"))
}