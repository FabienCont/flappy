const allTypes = {
  number: { defaultValue: 0 },
  boolean: { defaultValue: false },
  object: { defaultValue: {} },
  snippet: { defaultValue: { scope: 'common', name: 'get-screen-height' } },
  string: { defaultValue: 'defaultString' },
  dico: { defaultValue: {} },
  'array<object>': { defaultValue: {} },
  'array<number>': { defaultValue: 0 },
  'array<string>': { defaultValue: '' },
  'array<dico>': { defaultValue: {} },
  'array<snippet>': { defaultValue: { scope: 'common', name: 'get-screen-height' } },
  'array<array>': { defaultValue: [] },
};

export { allTypes };
