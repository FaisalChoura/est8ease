interface sqmPriceCollection {
  studio: number;
  oneBR: number;
  twoBR: number;
  threeBR: number;
}

const areaPricePerSqm: Map<string, sqmPriceCollection> = new Map();
areaPricePerSqm.set('Emaar_Beach_Front', {
  studio: 0,
  oneBR: 38925.2,
  twoBR: 44114.77,
  threeBR: 43450.28,
});

areaPricePerSqm.set('JLT', {
  studio: 16026.1,
  oneBR: 15729.65,
  twoBR: 12665.88,
  threeBR: 13676.61,
});

areaPricePerSqm.set('City_Walk', {
  studio: 20742.04,
  oneBR: 23981.97,
  twoBR: 20519.58,
  threeBR: 23548.72,
});

areaPricePerSqm.set('Down_Town', {
  studio: 20198.04,
  oneBR: 25667.6,
  twoBR: 27958.15,
  threeBR: 30821.35,
});

areaPricePerSqm.set('Dubai_Hills', {
  studio: 23612.41,
  oneBR: 23614.34,
  twoBR: 22573.09,
  threeBR: 16995.0,
});

areaPricePerSqm.set('Business_Bay', {
  studio: 23798.98,
  oneBR: 21560.09,
  twoBR: 22499.63,
  threeBR: 16654.44,
});

areaPricePerSqm.set('Marina', {
  studio: 21284.03,
  oneBR: 16731.01,
  twoBR: 19484.64,
  threeBR: 18572.83,
});

export { areaPricePerSqm };
