export const qboAccounts = {
  '1000': {
    name: 'WF Checking (xx1275)',
    matchedCategoryNames: ['Checking'],
    order: 0,
  },
  '2600': {
    name: 'Prepaid Revenue',
    matchedCategoryNames: ['PPD Revenue'],
    order: 1,
  },
  '4101': {
    name: 'Sales:Food Sales -:Food',
    matchedCategoryNames: ['FOOD'],
    order: 2,
  },
  '4102': {
    name: 'Sales:Food Sales -:Dumplings',
    matchedCategoryNames: ['TIPPLES Dumplings'],
    order: 3,
  },
  '4103': {
    name: 'Sales:Food Sales -:Meat',
    matchedCategoryNames: ['Meat'],
    order: 4,
  },
  '4104': {
    name: 'Sales:Food Sales -:Seafood',
    matchedCategoryNames: ['Seafood'],
    order: 5,
  },
  '4105': {
    name: 'Sales:Food Sales -:Desserts',
    matchedCategoryNames: ['Desserts'],
    order: 6,
  },
  '4220': {
    name: 'Sales:Bar Sales -:Liquor',
    matchedCategoryNames: ['LIQUOR'],
    order: 7,
  },
  '4235': {
    name: 'Sales:Bar Sales -:Beer',
    matchedCategoryNames: ['BEER'],
    order: 8,
  },
  '4210': {
    name: 'Sales:Bar Sales -:Wine',
    matchedCategoryNames: ['WINE'],
    order: 9,
  },
  '4240': {
    name: 'Sales:Bar Sales -:Beverages, N/A Bev, CBD',
    matchedCategoryNames: ['BEVERAGES'],
    order: 10,
  },
  '4310': {
    name: 'Sales:Retail:TicketSales',
    matchedCategoryNames: ['TICKETS'],
    order: 11,
  },
  '4320': {
    name: 'Sales:Retail:Merch',
    matchedCategoryNames: ['RETAIL'],
    order: 12,
  },
  '2360': {
    name: 'Sales Tax Payable',
    matchedCategoryNames: ['totalTaxes'],
    order: 13,
  },
  '7201': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Manager',
    matchedCategoryNames: ['Mgr\\nMeal'],
    order: 14,
  },
  '7215': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Band Comp',
    matchedCategoryNames: ['Band Comp'],
    order: 15,
  },
  '7204': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Did Not Like',
    matchedCategoryNames: ['Did Not Like'],
    order: 16,
  },
  '7214': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Service Comp',
    matchedCategoryNames: ['Service Comp'],
    order: 17,
  },
  '7208': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Production Error',
    matchedCategoryNames: ['Food Error'],
    order: 18,
  },
  '7203': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:$ Off',
    matchedCategoryNames: ['$ Off'],
    order: 19,
  },
  '7223': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Walk Out',
    matchedCategoryNames: ['Walk Out'],
    order: 20,
  },
  '7202': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Industry',
    matchedCategoryNames: ['Industry'],
    order: 21,
  },
  '7205': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Education',
    matchedCategoryNames: ['Education'],
    order: 22,
  },
  '7206': {
    name: 'CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Friends & Family',
    matchedCategoryNames: ["Tipple's F/F"],
    order: 23,
  },
  '7209': {
    name: "7209 CONTROLLABLE EXPENSES:Marketing -:Comps & Promotion:Management's Friends and Family",
    matchedCategoryNames: [],
    order: 24,
  },
  '2370': {
    name: 'Tips Payable',
    matchedCategoryNames: ['totalTips'],
    order: 25,
  },
  '1010': {
    name: 'Petty Cash',
    matchedCategoryNames: ['pettyCash'],
    order: 26,
  },
  '7440': {
    name: '7440 CONTROLLABLE EXPENSES:General & Administrative -:Cash (Over) / Short',
    matchedCategoryNames: ['extraCash'],
    order: 27,
  },
}

export const qboAccountCategories = {
  nonCashPayments: ['1000', '2600'],
  salesByCategory: [
    '4101',
    '4102',
    '4103',
    '4104',
    '4105',
    '4220',
    '4235',
    '4210',
    '4240',
    '4310',
    '4320',
  ],
  taxes: ['2360'],
  comps: [
    '7201',
    '7215',
    '7204',
    '7214',
    '7208',
    '7203',
    '7223',
    '7202',
    '7205',
    '7206',
    '7209',
  ],
  tips: ['2370'],
  cashPayments: ['1010', '7440'],
}
