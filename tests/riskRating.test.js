const request = require("supertest");
const expressApp = require("../app");  

describe("Risk Rating API Tests", () => {
    test('Valid input with keywords', async () => {
        const input = { claimHistory: "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes." };
        const response = await request(expressApp)
            .post("/api/risk-rating")
            .send(input);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 3 });
    });

    test('Valid input with repeating keywords', async () => {
        const input = { claimHistory: "I had a crash and a bump, last year and another crash and bump the year before." };
        const response = await request(expressApp)
            .post("/api/risk-rating")
            .send(input);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 4 });
    });

    test('Valid input where keywords are used in a different tense', async () => {
        const input = { claimHistory: "Last year, I collided with another car and it smashed my bumper." };
        const response = await request(expressApp)
            .post("/api/risk-rating")
            .send(input);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 3 });
    });

    test('Valid input where keywords exceed 5', async () => {
        const input = { claimHistory: "I've collided and bumped with several vehicles, a crash witch resulted in one scratch of my car and a scratch of another. It also smashed my windshield." };
        const response = await request(expressApp)
            .post("/api/risk-rating")
            .send(input);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 5 });
    });

    test('Valid input with no keywords', async () => {
        const input = { claimHistory: "I've had no incidents in the last four years." };
        const response = await request(expressApp)
            .post("/api/risk-rating")
            .send(input);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ risk_rating: 1 });
    });

    test('Invalid input or an empty string', async () => {
        const input = { claimHistory: "" };
        const response = await request(expressApp)
            .post("/api/risk-rating")
            .send(input);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Invalid input: claim history is required and must be a non-empty string." });
    });

    test('Invalid input with a non-string value', async () => {
        const input = { claimHistory: 123456 };
        const response = await request(expressApp)
            .post("/api/risk-rating")
            .send(input);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Invalid input: claim history is required and must be a non-empty string."});
    });
});
