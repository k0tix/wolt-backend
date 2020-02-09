const { search } = require('../../utils/filters');

test('Filters based on name, ignoring case', () => {
    const result = search(
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
        'TEST',
    );

    expect(result).toBe(true);
});

test('Filters based on tags', () => {
    const result = search(
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
        'ham',
    );

    expect(result).toBe(true);
});

test('Filters based on description', () => {
    const result = search(
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
        'stuff',
    );

    expect(result).toBe(true);
});

test('Ingores if nothing matches', () => {
    const result = search(
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
        'Not',
    );

    expect(result).toBe(false);
});
