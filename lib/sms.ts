'use server'

const SMS_API_KEY = process.env.SMS_IR_API_KEY;
const SMS_TEMPLATE_ID = process.env.SMS_IR_TEMPLATE_ID;

export async function sendVerificationCode(mobile: string, code: string) {
  try {
    const response = await fetch('https://api.sms.ir/v1/send/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'x-api-key': SMS_API_KEY || '',
      },
      body: JSON.stringify({
        mobile,
        templateId: SMS_TEMPLATE_ID,
        parameters: [
          {
            name: "Code",
            value: code
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.status !== 1) {
      throw new Error(data.message || 'خطا در ارسال پیامک');
    }

    return data;
  } catch (error) {
    console.error('SMS sending error:', error);
    throw new Error('خطا در ارسال پیامک');
  }
}