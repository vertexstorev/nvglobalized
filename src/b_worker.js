// export default {
//   async fetch(request, env) {

//     // Access keys safely here
//     const supabaseUrl = env.SUPABASE_URL
//     const supabaseKey = env.SUPABASE_ANON_KEY

//     // Handle form submission
//     if (request.method === "POST") {
//       const body = await request.json()

//       // Call Supabase
//       const response = await fetch(`${supabaseUrl}/rest/v1/feedback`, {
//         method: "POST",
//         headers: {
//           "apikey": supabaseKey,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body)
//       })

//       return new Response("Success", { status: 200 })
//     }

//     return new Response("Not found", { status: 404 })
//   }
// }

// // Handle WhatsApp notification via Twilio
// if (pathname === "/notify" && request.method === "POST") {
//   const body = await request.json()

//   // Twilio credentials from wrangler secrets
//   const accountSid = env.TWILIO_ACCOUNT_SID
//   const authToken = env.TWILIO_AUTH_TOKEN

//   // Twilio API call
//   const twilioResponse = await fetch(
//     `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
//     {
//       method: "POST",
//       headers: {
//         "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`),
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       body: new URLSearchParams({
//         From: "whatsapp:+14155238886",
//         To: "whatsapp:+256784918779",
//         Body: `New message from ${body.name}: ${body.message}`
//       })
//     }
//   )

//   const result = await twilioResponse.json()

//   if (result.error_code) {
//     return new Response("Twilio error", { status: 500 })
//   }

//   return new Response("WhatsApp sent", { status: 200 })
// }

export default {
  async fetch(request, env) {

    const { pathname } = new URL(request.url)

    // ─── CORS HEADERS ─────────────────────────────────
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    }

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers })
    }

    // ─── FEEDBACK ─────────────────────────────────────
    if (pathname === "/feedback" && request.method === "POST") {
      const body = await request.json()

      // 1. Save to Supabase
      const dbResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/feedback`, {
        method: "POST",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: body.message
        })
      })

      if (!dbResponse.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to save feedback" }),
          { status: 500, headers }
        )
      }

      // 2. Send WhatsApp via Twilio
      const accountSid = env.TWILIO_ACCOUNT_SID
      const authToken = env.TWILIO_AUTH_TOKEN

      await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`),
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            From: "whatsapp:+14155238886",
            To: "whatsapp:+256784918779",
            Body: `New message from ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nMessage: ${body.message}`
          })
        }
      )

      return new Response(
        JSON.stringify({ success: "Feedback submitted!" }),
        { status: 200, headers }
      )
    }

    // ─── SIGNUP ───────────────────────────────────────
    if (pathname === "/signup" && request.method === "POST") {
      const body = await request.json()

      const response = await fetch(`${env.SUPABASE_URL}/auth/v1/signup`, {
        method: "POST",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password
        })
      })

      const data = await response.json()

      if (data.error) {
        return new Response(
          JSON.stringify({ error: data.error.message }),
          { status: 400, headers }
        )
      }

      return new Response(
        JSON.stringify({ success: "Signup successful! Check your email." }),
        { status: 200, headers }
      )
    }

    // ─── SIGNIN ───────────────────────────────────────
    if (pathname === "/signin" && request.method === "POST") {
      const body = await request.json()

      const response = await fetch(`${env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password
        })
      })

      const data = await response.json()

      if (data.error) {
        return new Response(
          JSON.stringify({ error: data.error.message }),
          { status: 400, headers }
        )
      }

      return new Response(
        JSON.stringify({ success: "Signed in!", user: data.user }),
        { status: 200, headers }
      )
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers }
    )
  }
}