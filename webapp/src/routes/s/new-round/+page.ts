import type { PageLoad } from './$types';

const ROUND_TYPES = [
  {
    value: 'tgc',
    label: 'TGC'
  },
  {
    value: 'tgc-special',
    label: 'TGC Special'
  },
  {
    value: 'practice',
    label: 'Practice'
  },
  {
    value: 'society',
    label: 'Society'
  },
  {
    value: 'ranked',
    label: 'Ranked'
  }
] 

export const load: PageLoad = async ({ parent }) => {
  await parent()
 
  return { ROUND_TYPES };
};