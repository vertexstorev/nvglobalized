// Import Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// YOUR SUPABASE DETAILS
const supabaseUrl = 'https://isdtgodfleyncozeufub.supabase.co'
const supabaseKey = 'sb_publishable_eAsBlSR35HWPFDP1sL8KOw_9OYbAeAn'

const supabase = createClient(supabaseUrl, supabaseKey)


// ==========================
// SIGN UP
// ==========================
const signupBtn = document.getElementById('signupBtn')

if (signupBtn) {

    signupBtn.addEventListener('click', async () => {

        const fullname = document.getElementById('signup-fullname').value
        const email = document.getElementById('signup-email').value
        const password = document.getElementById('signup-password').value
        const confirmPassword = document.getElementById('signup-confirmPassword').value

        // Check passwords
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        // Sign up user
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullname
                }
            }
        })

        if (error) {
            alert(error.message)
        } else {
            alert('Signup successful! Check your email.')
            console.log(data)
            window.location.href = 'index.html'
        }

    })

}


// ==========================
// LOGIN
// ==========================
const loginForm = document.getElementById('login')

if (loginForm) {

    loginForm.addEventListener('submit', async (e) => {

        e.preventDefault()

        const email = document.getElementById('login-email').value
        const password = document.getElementById('login-password').value

        // Login user
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            alert(error.message)
            // Redirect to signup page if user not found
            window.location.href = 'signup.html'
        } else {
            alert('Login successful!')
            console.log(data)

            // Redirect after login
            window.location.href = 'index.html'
        }

    })

}

// CHECK USER SESSION
async function checkUser() {

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {

        console.log(user)

        document.getElementById('login-email').style.display = 'block'

        document.getElementById('login-password').textContent =
            user.user_metadata.full_name || 'User'

        document.getElementById('login-email').textContent =
            user.email

    }

}

checkUser()

const logoutBtn = document.getElementById('logoutBtn')

if(logoutBtn){

    logoutBtn.addEventListener('click', async () => {

        await supabase.auth.signOut()

        alert('Logged out')

        window.location.href = 'signup.html'

    })

}