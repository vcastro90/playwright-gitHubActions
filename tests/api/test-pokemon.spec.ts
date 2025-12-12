import { test, expect } from "@playwright/test";

test('Get pokemon details -200 OK', async ({ request }) => {
    const namePokemon = 'squirtle';
    const weightPokemon = 90;
    const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    const responseBody = await response.json();

    console.log(responseBody)

    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe(namePokemon);
    expect(responseBody.weight).toBe(weightPokemon);


});

test('Moves de squirtle en orden alfabético', async ({ request }) => {
    const namePokemon = 'squirtle';
    const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    // Extract move names from the moves array
    const moves: string[] = responseBody.moves.map((move: any) => move.move.name);

    // Manual bubble sort algorithm 
    for (let i = 0; i < moves.length - 1; i++) {
        for (let j = 0; j < moves.length - i - 1; j++) {
            if (moves[j] > moves[j + 1]) {
                // Swap elements
                const temp = moves[j];
                moves[j] = moves[j + 1];
                moves[j + 1] = temp;
            }
        }
    }

    // Log the sorted moves
    console.log(`\nMovimientos de ${namePokemon} en orden alfabético (sin usar sort):`);
    moves.forEach((moveName: string, index: number) => {
        console.log(`${index + 1}. ${moveName}`);
    });

    // Verify that we have moves
    expect(moves.length).toBeGreaterThan(0);
});

test('List pokemon moves in alphabetical order', async ({ request }) => {
    const namePokemon = 'pikachu';
    const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    // Extract move names from the moves array
    const moveNames: string[] = responseBody.moves.map((move: any) => move.move.name);

    // Sort move names alphabetically
    const sortedMoves = moveNames.sort();

    // Log the sorted moves
    console.log(`\nMovimientos de ${namePokemon} en orden alfabético:`);
    sortedMoves.forEach((moveName: string, index: number) => {
        console.log(`${index + 1}. ${moveName}`);
    });

    // Verify that we have moves
    expect(sortedMoves.length).toBeGreaterThan(0);
});
