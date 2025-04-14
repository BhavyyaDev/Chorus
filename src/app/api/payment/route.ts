import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PRODUCT_CONFIG, SHIPPING_CONFIG } from "../../constants/product";


const cashfree = new Cashfree(
  process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production'
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const {
      order_amount,
      order_currency = "INR",
      customer_details,
      order_meta = {},
      order_note
    } = requestData;

    // Validate required fields
    if (!order_amount || !customer_details?.customer_id || !customer_details?.customer_phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: order_amount, customer_id, or customer_phone",
        },
        { status: 400 }
      );
    }

    // Validate amount against product constants
    const minAmount = PRODUCT_CONFIG.price + SHIPPING_CONFIG.cost;
    const maxAmount = (PRODUCT_CONFIG.price * 20) + SHIPPING_CONFIG.cost; // Max 20 items

    if (order_amount < minAmount || order_amount > maxAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid order amount. Must be between ₹${minAmount} and ₹${maxAmount}`,
        },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const order_id = `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    // Configure order request with latest API structure
    const orderRequest = {
      order_id,
      order_amount: parseFloat(order_amount.toString()),
      order_currency,
      customer_details: {
        customer_id: customer_details.customer_id,
        customer_phone: customer_details.customer_phone,
        customer_email: customer_details.customer_email || undefined,
        customer_name: customer_details.customer_name || undefined,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cashfree/redirect?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cashfree/webhook`,
        merchant_name: "Chorus",
        merchant_logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/icons/chorusBlack.svg`,
        ...order_meta,
      },
      order_note: order_note || "Chorus Salary Series Pre-order",
    };


    // Create order using the Cashfree v5+ instance method
    const response = await cashfree.PGCreateOrder(orderRequest);

    if (response.status === 200 && response.data) {
      return NextResponse.json({
        success: true,
        message: "Order created successfully!",
        data: {
          order_id: response.data.order_id,
          payment_session_id: response.data.payment_session_id,
          order_amount: response.data.order_amount,
          order_currency: response.data.order_currency,
        },
      });
    } else {
      console.error("Failed to create order:", response);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create order with Cashfree.",
          details: response.data || "No response data",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in order creation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing the request.",
        error: error?.response?.data?.message || error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}