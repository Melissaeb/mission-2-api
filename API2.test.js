const { getRiskRating } = require('./API2')

test('Valid input with keywords', () => {

    const input = {claim_history: "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes."};
    const output = { risk_rating: 3};
    expect(getRiskRating(input)).toEqual(output);
});

test('Valid input with repeating keywords', () => {

    const input = {claim_history: "I had a crash and a bump, last year and another crash and bump the year before."};
    const output = { risk_rating: 4};
    expect(getRiskRating(input)).toEqual(output);
});

test('Valid input where keywords are used in a different tense', () => {

    const input = {claim_history: "Last year, I collided with another car and it smashed my bumper."};
    const output = { risk_rating: 2};
    expect(getRiskRating(input)).toEqual(output);
});

test('Valid input where keywords exceed 5', () => {

    const input = {claim_history: "I've collided and bumped with several vehicles, a crash witch resulted in one scratch of my car and a scratch of another. It also smashed my windshield."};
    const output = { risk_rating: 5};
    expect(getRiskRating(input)).toEqual(output);
});

test('Valid input with no keywords', () => {

    const input = {claim_history: "I've had no incidents in the last four years."};
    const output = { risk_rating: 1};
    expect(getRiskRating(input)).toEqual(output);
});

test('Invalid input or an empty string', () => {

    const input = {claim_history: ""};
    const output = { error: "there is an error" }
    expect(getRiskRating(input)).toEqual(output);
});

test('Invalid input with a non-string value', () => {

    const input = {claim_history: 123456};
    const output = { error: "there is an error" }
    expect(getRiskRating(input)).toEqual(output);
});

