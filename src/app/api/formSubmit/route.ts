
import { NextRequest, NextResponse } from 'next/server';
import { ShippingAddress } from "@/types/types";

export async function POST(request: NextRequest) {
  try {
    const shippingAddress: ShippingAddress = await request.json();

    const formData = new URLSearchParams({
      'entry.1143325676': shippingAddress.firstName,
      'entry.576107359': shippingAddress.lastName,
      'entry.1482482918': shippingAddress.address,
      'entry.1402194576': shippingAddress.postalCode,
      'entry.74427669': shippingAddress.city,
      'entry.1311701849': shippingAddress.state,
      'entry.1472250056': shippingAddress.email,
      'entry.1857547821': shippingAddress.phone,
    });

    const response = await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSeeuTanvz4phEHe7CHsEWdquPO0ba8peeFMqDVtXKDqi0Kaww/formResponse',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200 || response.status === 302) {
      return NextResponse.json({
        message: 'Form submitted successfully',
        success: true
      }, { status: 200 });
    } else {
      console.error('Google Forms submission failed:', response.status, response.statusText);
      return NextResponse.json({
        message: 'Failed to submit form',
        success: false
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({
      message: 'Error submitting form',
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 });
  }
}