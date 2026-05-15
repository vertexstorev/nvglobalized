export default {
  async fetch(request, env, ctx) {

    const { pathname } = new URL(request.url)

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers })
    }

    // ─── FEEDBACK ─────────────────────────────────────
    if (pathname === "/feedback" && request.method === "POST") {
      const body = await request.json()

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

    // ─── SERVE STATIC FILES ───────────────────────────
    return env.ASSETS.fetch(request)

  }
}