// export default {
//   async fetch(request, env, ctx) {

//     const { pathname } = new URL(request.url)

//     const headers = {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Content-Type": "application/json"
//     }

//     if (request.method === "OPTIONS") {
//       return new Response(null, { headers })
//     }

//     // ─── FEEDBACK ─────────────────────────────────────
//     if (pathname === "/feedback" && request.method === "POST") {
//       const body = await request.json()

//       const dbResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/feedback`, {
//         method: "POST",
//         headers: {
//           "apikey": env.SUPABASE_ANON_KEY,
//           "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
//           "Content-Type": "application/json",
//           "Prefer": "return=minimal"
//         },
//         body: JSON.stringify({
//           name: body.name,
//           email: body.email,
//           phone: body.phone,
//           message: body.message
//         })
//       })

//       if (!dbResponse.ok) {
//         return new Response(
//           JSON.stringify({ error: "Failed to save feedback" }),
//           { status: 500, headers }
//         )
//       }

//       const accountSid = env.TWILIO_ACCOUNT_SID
//       const authToken = env.TWILIO_AUTH_TOKEN

//       await fetch(
//         `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
//         {
//           method: "POST",
//           headers: {
//             "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`),
//             "Content-Type": "application/x-www-form-urlencoded"
//           },
//           body: new URLSearchParams({
//             From: "whatsapp:+14155238886",
//             To: "whatsapp:+256784918779",
//             Body: `New message from ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nMessage: ${body.message}`
//           })
//         }
//       )

//       return new Response(
//         JSON.stringify({ success: "Feedback submitted!" }),
//         { status: 200, headers }
//       )
//     }

//     // ─── SIGNUP ───────────────────────────────────────
//     if (pathname === "/signup" && request.method === "POST") {
//       const body = await request.json()

//       const response = await fetch(`${env.SUPABASE_URL}/auth/v1/signup`, {
//         method: "POST",
//         headers: {
//           "apikey": env.SUPABASE_ANON_KEY,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: body.email,
//           password: body.password
//         })
//       })

//       const data = await response.json()

//       if (data.error) {
//         return new Response(
//           JSON.stringify({ error: data.error.message }),
//           { status: 400, headers }
//         )
//       }

//       return new Response(
//         JSON.stringify({ success: "Signup successful! Check your email." }),
//         { status: 200, headers }
//       )
//     }

//     // ─── SIGNIN ───────────────────────────────────────
//     if (pathname === "/signin" && request.method === "POST") {
//       const body = await request.json()

//       const response = await fetch(`${env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
//         method: "POST",
//         headers: {
//           "apikey": env.SUPABASE_ANON_KEY,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: body.email,
//           password: body.password
//         })
//       })

//       const data = await response.json()

//       if (data.error) {
//         return new Response(
//           JSON.stringify({ error: data.error.message }),
//           { status: 400, headers }
//         )
//       }

//       return new Response(
//         JSON.stringify({ success: "Signed in!", user: data.user }),
//         { status: 200, headers }
//       )
//     }

//     // ─── SERVE STATIC FILES ───────────────────────────
//     return env.ASSETS.fetch(request)

//   }
// }

// export default {
//   async fetch(request, env, ctx) {

//     const { pathname } = new URL(request.url)

//     const headers = {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Content-Type": "application/json"
//     }

//     // ─── OPTIONS ──────────────────────────────────────
//     if (request.method === "OPTIONS") {
//       return new Response(null, { headers })
//     }

//     // ─── FEEDBACK ─────────────────────────────────────
//     if (pathname === "/feedback" && request.method === "POST") {
//       try {
//         const body = await request.json()

//         const dbResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/feedback`, {
//           method: "POST",
//           headers: {
//             "apikey": env.SUPABASE_ANON_KEY,
//             "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
//             "Content-Type": "application/json",
//             "Prefer": "return=minimal"
//           },
//           body: JSON.stringify({
//             name: body.name,
//             email: body.email,
//             phone: body.phone,
//             message: body.message
//           })
//         })

//         if (!dbResponse.ok) {
//           return new Response(
//             JSON.stringify({ error: "Failed to save feedback" }),
//             { status: 500, headers }
//           )
//         }

//         await fetch(
//           `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
//           {
//             method: "POST",
//             headers: {
//               "Authorization": "Basic " + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
//               "Content-Type": "application/x-www-form-urlencoded"
//             },
//             body: new URLSearchParams({
//               From: "whatsapp:+14155238886",
//               To: "whatsapp:+256784918779",
//               Body: `New message from ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nMessage: ${body.message}`
//             })
//           }
//         )

//         return new Response(
//           JSON.stringify({ success: "Feedback submitted!" }),
//           { status: 200, headers }
//         )

//       } catch (err) {
//         return new Response(
//           JSON.stringify({ error: err.message }),
//           { status: 500, headers }
//         )
//       }
//     }

//     // ─── SIGNUP ───────────────────────────────────────
//     if (pathname === "/signup" && request.method === "POST") {
//       try {
//         const body = await request.json()

//         if (!body.email || !body.password) {
//           return new Response(
//             JSON.stringify({ error: "Email and password required" }),
//             { status: 400, headers }
//           )
//         }

//         const response = await fetch(`${env.SUPABASE_URL}/auth/v1/signup`, {
//           method: "POST",
//           headers: {
//             "apikey": env.SUPABASE_ANON_KEY,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email: body.email,
//             password: body.password
//           })
//         })

//         const data = await response.json()

//         if (data.error) {
//           return new Response(
//             JSON.stringify({ error: data.error.message }),
//             { status: 400, headers }
//           )
//         }

//         return new Response(
//           JSON.stringify({ success: "Signup successful! Check your email." }),
//           { status: 200, headers }
//         )

//       } catch (err) {
//         return new Response(
//           JSON.stringify({ error: err.message }),
//           { status: 500, headers }
//         )
//       }
//     }

//     // ─── SIGNIN ───────────────────────────────────────
//     if (pathname === "/signin" && request.method === "POST") {
//       try {
//         const body = await request.json()

//         if (!body.email || !body.password) {
//           return new Response(
//             JSON.stringify({ error: "Email and password required" }),
//             { status: 400, headers }
//           )
//         }

//         const response = await fetch(`${env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
//           method: "POST",
//           headers: {
//             "apikey": env.SUPABASE_ANON_KEY,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email: body.email,
//             password: body.password
//           })
//         })

//         const data = await response.json()

//         if (data.error) {
//           return new Response(
//             JSON.stringify({ error: data.error.message }),
//             { status: 400, headers }
//           )
//         }

//         return new Response(
//           JSON.stringify({ success: "Signed in!", user: data.user }),
//           { status: 200, headers }
//         )

//       } catch (err) {
//         return new Response(
//           JSON.stringify({ error: err.message }),
//           { status: 500, headers }
//         )
//       }
//     }

//     // ─── SERVE STATIC FILES ───────────────────────────
//     if (request.method === "GET") {
//       return env.ASSETS.fetch(request)
//     }

//     // ─── FALLBACK ─────────────────────────────────────
//     return new Response(
//       JSON.stringify({ error: "Method not allowed" }),
//       { status: 405, headers }
//     )

//   }
// }

//////////////////////////////
	// SUPABASE CONNECTION
	//////////////////////////////

	const SUPABASE_URL="https://isdtgodfleyncozeufub.supabase.co"
	const SUPABASE_ANON_KEY="sb_publishable_eAsBlSR35HWPFDP1sL8KOw_9OYbAeAn"

	const supabase = window.supabase.createClient(
		SUPABASE_URL,
		SUPABASE_ANON_KEY
	);

//////////////////////////////
	// LOGIN SYSTEM
	//////////////////////////////

	const loginForm = document.querySelector("#login");

	loginForm.addEventListener("submit", async (e) => {

		e.preventDefault();

		const email =
			document.querySelector("#email").value.trim();

		const password =
			document.querySelector("#password").value;

		if (!email || !password) {
			alert("Please fill in all fields");
			return;
		}

		try {

			const { data, error } =
				await supabase.auth.signInWithPassword({

					email: email,
					password: password

				});

			if (error) {
				alert(error.message);
				console.error(error);
				return;
			}

			console.log(data);

			alert("Login successful!");

		} catch (err) {

			console.error(err);
			alert("Something went wrong");
      // redirect after login
			window.location.href = "/signup.html";

		}

	});



	


	//////////////////////////////
	// SIGNUP SYSTEM
	//////////////////////////////

	const signupBtn =
		document.querySelector("#signupBtn");

		signupBtn.addEventListener("click", async () => {

		const fullName =
			document.querySelector("#fullname").value;

		const email =
			document.querySelector("#email").value;

		const password =
			document.querySelector("#password").value;

		const confirmPassword =
			document.querySelector("#confirmPassword").value;


		//////////////////////////////
		// PASSWORD CHECK
		//////////////////////////////

		if(!fullName || !email || !password){
			alert("Please fill in all fields");
			return;
		}
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
	
		//////////////////////////////
		// SIGN UP USER
		//////////////////////////////

		const response = await fetch("https://www.nvglobalizedug.com/signup",{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email, password, fullName})
		})


		//////////////////////////////
		// RESPONSE
		//////////////////////////////

		const data = await response.json()
		if (data.error){
			alert(data.error)
		} else {
			alert("Acount created! Check your email for verification link.")
			window.location.href = "index.html#login"
		}

	});