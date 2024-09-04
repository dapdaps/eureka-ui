export const relativeOdyssey = [5, 8];

export interface Potential {
  key: string;
  value: string;
  label: string;
}

export const AirdropList: Potential[] = [
  {
    key: 'estimated_date',
    label: 'Estimated date',
    value: '',
  },
  {
    key: 'likelihood',
    label: 'Likelihood',
    value: '',
  },
  {
    key: 'difficulty',
    label: 'Difficulty',
    value: '',
  },
];

export const TABS = [
  {
    key: '1',
    label: 'Overview',
    bp: "1006-002-008"
  },
  {
    key: '2',
    label: 'My History',
    bp: "1006-002-007"
  },
];