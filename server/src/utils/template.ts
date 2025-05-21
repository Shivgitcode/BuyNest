export const otpTemplate = (
	customer_name: string,
	otp_code: number,
	company_name: string,
) => {
	return `<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f6f6f6; margin: 0; padding: 0; }
    .container { max-width: 400px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px; }
    .otp { font-size: 2em; letter-spacing: 8px; background: #f0f4fa; padding: 12px 0; margin: 16px 0; border-radius: 6px; text-align: center; color: #2d5be3; font-weight: bold; }
    .footer { font-size: 0.9em; color: #888; margin-top: 24px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Hello, ${customer_name}</h2>
    <p>To verify your account, please use the following One-Time Password (OTP):</p>
    <div class="otp">${otp_code}</div>
    <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share this code with anyone for security reasons.</p>
    <div class="footer">
      If you did not request this, please ignore this email.<br>
      &copy; ${company_name}
    </div>
  </div>
</body>
</html>

`;
};
export const orderTemplate = (
	order_number: string,
	customer_name: string,
	order_date: string,
	order_items: {
		id: string;
		quantity: number;
		unitprice: number;
		name: string;
	}[],
	order_total: number,
	order_links: string,
	company_name: string,
) => {
	const formattedItems = order_items
		.map(
			(item) =>
				`<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.unitprice.toFixed(2)} - Total: $${(item.quantity * item.unitprice).toFixed(2)}</li>`,
		)
		.join("");

	return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f6f6f6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px; }
    .header { border-bottom: 2px solid #eee; padding-bottom: 12px; margin-bottom: 24px; }
    .order-summary { background: #f0f4fa; padding: 16px; border-radius: 6px; margin: 16px 0; }
    .footer { font-size: 0.9em; color: #888; margin-top: 24px; text-align: center; }
    .btn { display: inline-block; padding: 10px 24px; background: #2d5be3; color: #fff; border-radius: 4px; text-decoration: none; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Thank you for your order, ${customer_name}!</h2>
      <p>Your order <strong>#${order_number}</strong> has been confirmed.</p>
    </div>
    <p>Order Date: ${order_date}</p>
    <div class="order-summary">
      <h3>Order Summary</h3>
      <p><strong>Items:</strong></p>
      <ul>
        ${formattedItems}
      </ul>
      <p><strong>Total:</strong> ${order_total}</p>
    </div>
    <a href=${order_links} class="btn">View Your Order</a>
    <div class="footer">
      If you have any questions, contact us at {SUPPORT_EMAIL}.<br>
      &copy; ${company_name}
    </div>
  </div>
</body>
</html>
`;
};
