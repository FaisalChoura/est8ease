interface sqmPriceCollection {
  studio: number;
  oneBR: number;
  twoBR: number;
  threeBR: number;
}

const areaPricePerSqm: Map<string, sqmPriceCollection> = new Map();
areaPricePerSqm.set('Emaar_Beach_Front', {
  studio: 0,
  oneBR: 35521,
  twoBR: 38750,
  threeBR: 38750,
});

areaPricePerSqm.set('Marina', {
  studio: 0,
  oneBR: 22604,
  twoBR: 19375,
  threeBR: 15069,
});

export { areaPricePerSqm };
