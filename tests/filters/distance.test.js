const { distance } = require('../../utils/filters');

test('Ignore if restaurant too far', () => {
    const result = distance(
        {
            description: 'Tasty stuff',
            location: [
                24.941325187683105,
                60.169938852212965,
            ],
            name: 'Test restaurant',
            online: false,
            tags: [
                'hamburger',
                'fries',
            ],
        },
        60.12345,
        20.12345,
        3,
    );

    expect(result).toBe(false);
});

test('Handle negative distance values', () => {
    const result = distance(
        {
            description: 'Tasty stuff',
            location: [
                24.941325187683105,
                60.169938852212965,
            ],
            name: 'Test restaurant',
            online: false,
            tags: [
                'hamburger',
                'fries',
            ],
        },
        60.12345,
        20.12345,
        -4,
    );

    expect(result).toBe(false);
});

test('Select restaurant if distance within range', () => {
    const result = distance(
        {
            description: 'Tasty stuff',
            location: [
                24.922072,
                60.183413,
            ],
            name: 'Test restaurant',
            online: false,
            tags: [
                'hamburger',
                'fries',
            ],
        },
        60.17045,
        24.93147,
        2,
    );

    expect(result).toBe(true);
});

