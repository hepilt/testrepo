import { test, expect } from '@playwright/test';
import randomstring from 'randomstring';
import { Pet } from '../models/Pet';
import { PetStore } from '../services/PetStore';

test.describe('EXERCISE 2: DATA HANDLING IN APIS', () => {
  test.use({ baseURL: 'https://petstore.swagger.io/' });

  const PROFILE = {
    username: randomstring.generate({
      length: 12,
      charset: 'alphabetic',
      capitalization: 'lowercase'
    }),
    firstName: 'Joe',
    lastName: 'Doe',
    email: 'email@example.com',
    password: '1234*&$!',
    phone: "000-000-001",
  };

  [{ testData: PROFILE }].forEach(({ testData }) =>
    test('Create user and retrive data',
      async ({ request }) => {
        console.log(`User: ${JSON.stringify(testData)}`)

        let response = await request.post('/v2/user', {
          data: testData
        });
        expect((await response.json()).code).toBe(200)

        response = await request.get(`/v2/user/${testData.username}`);
        expect(await response.json()).toMatchObject(testData);
      })
  );

  test('List sold pets', async ({ request }) => {
    const response = await request.get('/v2/pet/findByStatus?status=sold');
    expect(response.ok()).toBeTruthy();
    const pets = await response.json();

    const soldPets = pets.map((pet: { id: number; name: string }) => ({ id: pet.id, name: pet.name }));
    expect(soldPets.length).toBeGreaterThan(0);

    console.log(soldPets);
  });


  test('Count pets by name', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
    const pets: Pet[] = await response.json();

    const petStore = new PetStore(pets);
    const nameCounts = petStore.countPetsByRepeatedNames();

    expect(Object.keys(nameCounts).length).toBeGreaterThan(0);

    console.log(nameCounts);
  });

  test.afterAll(async ({ request }) => {
    await request.delete(`/v2/user/${PROFILE.username}`);
  })
})