import { Resend } from 'resend'
import QRCode from 'qrcode'

const resend = new Resend(process.env.RESEND_API_KEY)

type BookingEmailPayload = {
  to: string
  eventTitle: string
  eventDate: string
  venue: string
  city: string
  quantity: number
  total: number
  ticketId: string
}

export async function sendBookingEmail(payload: BookingEmailPayload) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set. Skipping email.')
    return
  }

  const {
    to,
    eventTitle,
    eventDate,
    venue,
    city,
    quantity,
    total,
    ticketId
  } = payload

  try {
    // Generate QR code as PNG buffer
    const qrPngBuffer = await QRCode.toBuffer(ticketId, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 240
    })

    await resend.emails.send({
      from: 'ShowUp <onboarding@resend.dev>',
      to,
      subject: `Your tickets for ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Booking Confirmed</h2>

          <p>
            Your booking for <strong>${eventTitle}</strong> has been confirmed.
          </p>

          <h3>Event details</h3>
          <ul>
            <li><strong>Date:</strong> ${eventDate}</li>
            <li><strong>Venue:</strong> ${venue}, ${city}</li>
            <li><strong>Tickets:</strong> ${quantity}</li>
            <li><strong>Total paid:</strong> ₹${total}</li>
          </ul>

          <h3>Your entry QR code</h3>
          <p>Please show this QR code at the venue during check-in.</p>

          <div style="margin: 16px 0; text-align: center;">
            <img
              src="cid:ticket-qr"
              alt="Ticket QR Code"
              style="width: 240px; height: 240px;"
            />
          </div>

          <p style="font-size: 14px;">
            <strong>Ticket ID:</strong> ${ticketId}
          </p>

          <hr />

          <p style="font-size: 12px; color: #666;">
            This is a system-generated email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'ticket-qr.png',
          content: qrPngBuffer,
          contentId: 'ticket-qr'
        }
      ]
    })
  } catch (err) {
    console.error('Failed to send booking email', err)
  }
}
