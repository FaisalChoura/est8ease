interface sqmPriceCollection {
  studio: number;
  oneBR: number;
  twoBR: number;
  threeBR: number;
}

const areaPricePerSqm: Map<string, sqmPriceCollection> = new Map();
areaPricePerSqm.set('Emaar_Beach_Front', {
  studio: 0,
  oneBR: 36502.75,
  twoBR: 44291.62,
  threeBR: 38610.11,
});

areaPricePerSqm.set('JLT', {
  studio: 24318.88,
  oneBR: 14970.22,
  twoBR: 17861.62,
  threeBR: 14765.7,
});

areaPricePerSqm.set('City_Walk', {
  studio: 27953.85,
  oneBR: 31697.53,
  twoBR: 29713.21,
  threeBR: 31667.39,
});

areaPricePerSqm.set('Down_Town', {
  studio: 24007.8,
  oneBR: 35124.76,
  twoBR: 45796.09,
  threeBR: 35124.76,
});

areaPricePerSqm.set('Dubai_Hills', {
  studio: 19467.59,
  oneBR: 19958.42,
  twoBR: 23417.94,
  threeBR: 19579.53,
});

areaPricePerSqm.set('Business_Bay', {
  studio: 21080.02,
  oneBR: 21452.45,
  twoBR: 26851.62,
  threeBR: 43566.89,
});

areaPricePerSqm.set('Marina', {
  studio: 78765.91,
  oneBR: 87237.1,
  twoBR: 79831.54,
  threeBR: 21194.12,
});

export { areaPricePerSqm };
