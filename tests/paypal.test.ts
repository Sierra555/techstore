import { generateAccessToken, paypal } from "../lib/paypal";

//Test to generate Access Token from PayPal

test('geenrates token from paypal', async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse);

  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThanOrEqual(0);
});

//Test to create a paypal order

test('creates a paypal order', async () => {
  const price = 1245.0;

  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);

  expect(orderResponse).toHaveProperty('id');
  expect(orderResponse).toHaveProperty('status');
  expect(orderResponse.status).toBe('CREATED');

});

//Test to capture payment eith a mock order

test('captures a paypal order payment ', async () => {
  const orderId = '4UU301336N7081122';

  const mockCapturePayment = jest
        .spyOn(paypal, 'capturePayment')
        .mockResolvedValue({
          status: 'COMPLETED'
        });
  
  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toHaveProperty('status', 'COMPLETED');

  mockCapturePayment.mockRestore();
})