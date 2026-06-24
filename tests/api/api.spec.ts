import { test, expect, request } from '@playwright/test';
import { AuthenticationModel } from '../../models/apiResponses/Authentication';
import { ESimOrderModel, Sim} from '../../models/apiResponses/ESimOrder';
import { ESimDetailsModel } from '../../models/apiResponses/ESimDetails';

test.describe("API testing",() =>{

    test('Journey to order eSims and validate order details ', async ({ request }) => {

        let token:string;
        let packageId: string = "moshi-moshi-7days-1gb";
        let _quantity: string = "6";
        let simsArray: Sim[];

        await test.step("Get the Bearer token and validate response", async() => {

            const authResponse = await request.post('v2/token', {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                  client_id: "92d73dd36ed012dbd5f59220076d845a",
                  client_secret:"DDpoEo76i3S0kH7xOYwLiAqZ0yxCs1N6352wLoSD", 
                  grant_type: "client_credentials"
                }

            });

            expect(authResponse.status()).toBe(200);

            const authResponseObject: AuthenticationModel = await authResponse.json();
            expect(authResponseObject.meta.message).toBe("success");
            token = authResponseObject.data.access_token;
        });

        
        await test.step("Place a new order for multiple eSims", async() => {       
            const orderResponse = await request.post('/v2/orders', {
                headers: {
                  "Authorization": `Bearer ${token}`
                },
                multipart: {
                  package_id: packageId,
                  quantity: _quantity
                }
            });
            
            expect(orderResponse.status()).toBe(200);
            
            const orderResponseObject: ESimOrderModel = await orderResponse.json();
            expect(orderResponseObject.meta.message).toBe("success");
            expect(orderResponseObject.data.package_id).toBe(packageId);
            expect(orderResponseObject.data.quantity).toBe(Number(_quantity));


            simsArray = orderResponseObject.data.sims;
        });


        await test.step("Get individual eSims and confirm details match with those from the placed order", async () => { 
            for (let sim of simsArray){
                const eSimDetailsResponse = await request.get(`/v2/sims/${sim.iccid}`, {
                    headers: {
                      "Authorization": `Bearer ${token}`
                    },
                });

                expect(eSimDetailsResponse.status()).toBe(200);
                const eSimDetailsResponseObject: ESimDetailsModel = await eSimDetailsResponse.json();
                expect(eSimDetailsResponseObject.meta.message).toBe("success");

                expect(eSimDetailsResponseObject.data).toMatchObject(sim);
            }
        });
     
        
    });
});