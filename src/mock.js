import Rx from 'rxjs/Rx';
import faker from 'faker';

const randPriceMult = 1000000;

const createProperty = (id, type) => {
  return {
    id,
    address: `${faker.address.city()} ${faker.address.streetAddress()}`,
    price: Math.round(Math.random() * randPriceMult),
    lastUpdate: Date.now(),
    type
  }
};

const getAllProperties = (n) => {
  const result = [];
  for (let i = 10000; i < 10000 + n; i++) {
    result.push(createProperty(i, 'Home'));
    result.push(createProperty(i+n, 'Condo'));
  }
  return result;
};

const properties = getAllProperties(200);


export default Rx.Observable
  .interval(1000)
  .mergeMap(
    () => Rx.Observable
      .from(properties)
      .map((property) => {
        const random = Math.random();
        const randomToUse = Math.round(random * 10000);
        return {
          ...property,
          price: random >= 0.5 ? property.price + randomToUse : property.price - randomToUse,
          lastUpdate: Date.now()
        };
      })
  );
