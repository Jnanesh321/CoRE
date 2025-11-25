const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    }
  }

  try {
    const { email } = JSON.parse(event.body)

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid email format'
        })
      }
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('id, is_active')
      .eq('email', normalizedEmail)
      .single()

    if (existing) {
      if (existing.is_active) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'This email is already subscribed to our newsletter'
          })
        }
      } else {
        // Reactivate subscription
        const { error } = await supabase
          .from('newsletter_subscriptions')
          .update({ 
            is_active: true, 
            unsubscribed_at: null 
          })
          .eq('id', existing.id)

        if (error) {
          console.error('Reactivation error:', error)
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Failed to resubscribe. Please try again.'
            })
          }
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Successfully resubscribed to newsletter'
          })
        }
      }
    }

    // Create new subscription
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        email: normalizedEmail,
        is_active: true
      }])

    if (error) {
      console.error('Subscription error:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Failed to subscribe. Please try again.'
        })
      }
    }

    // TODO: Send welcome email

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed to newsletter'
      })
    }

  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Server error. Please try again later.'
      })
    }
  }
}
