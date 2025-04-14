import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { PRODUCT_CONFIG, SHIPPING_CONFIG } from "../../constants/product";

// Initialize Cashfree (v5+ syntax)
const cashfree = new Cashfree(
    CFEnvironment.PRODUCTION,
    process.env.CASHFREE_APP_ID!,
    process.env.CASHFREE_SECRET_KEY!
);

const PRODUCT_PRICE = PRODUCT_CONFIG.price;
const SHIPPING_COST = SHIPPING_CONFIG.cost;
const MAX_QUANTITY = 20;

export async function POST(request: NextRequest){
    try {
        const {amount, currency, cartItems} = await request.json();

        if (currency !== 'INR') {
            return NextResponse.json({error: "Invalid currency"}, {status: 400});
        }

        let calculatedAmount = 0;

        if (cartItems && Array.isArray(cartItems)) {
            // Validate each cart item - prices are always taken from constants for security
            for (const item of cartItems) {
                if (!item.quantity || item.quantity < 1 || item.quantity > MAX_QUANTITY) {
                    return NextResponse.json({error: "Invalid quantity"}, {status: 400});
                }
                // Always use server-side price from constants, ignore any client-side price
                calculatedAmount += PRODUCT_PRICE * item.quantity;
            }
            calculatedAmount += SHIPPING_COST;
        } else {
            if (amount < PRODUCT_PRICE || amount > (PRODUCT_PRICE * MAX_QUANTITY + SHIPPING_COST)) {
                return NextResponse.json({error: "Invalid amount"}, {status: 400});
            }
            calculatedAmount = amount;
        }

        if (Math.abs(calculatedAmount - amount) > 0.01) {
            return NextResponse.json({error: "Amount mismatch"}, {status: 400});
        }

        const orderRequest = {
            order_amount: calculatedAmount,
            order_currency: currency,
            order_id: `order_${Date.now()}`,
            customer_details: {
                customer_id: `customer_${Date.now()}`,
                customer_phone: "9999999999" 
            },
            order_meta: {
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?order_id={order_id}`
            }
        };

        const response = await cashfree.PGCreateOrder(orderRequest);

        if (response.status === 200 && response.data) {
            return NextResponse.json({
                orderId: response.data.order_id,
                paymentSessionId: response.data.payment_session_id
            });
        } else {
            throw new Error('Failed to create Cashfree order');
        }
    } catch(error) {
        console.error('Order creation error:', error);
        return NextResponse.json({error: "Error creating order"}, {status: 500});
    }
}