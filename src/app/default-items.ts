import {ListItem} from './list-items.service';

const _ITEMS: ListItem[] = [
  {slug: 'matias', name: 'Matias Niemela', information: [
    {type: 'twitter', value: '@yearofmoo'},
    {type: 'website', value: 'www.yearofmoo.com'},
    {type: 'company', value: 'Google Inc'}
  ],
    photo: 'matias.jpg',
    blurb: 'Matias animates all the things',
  },
  {slug: 'miles', name: 'Miles Malerba', information: [
    {type: 'company', value: 'Google Inc'}
  ],
    photo: 'miles.jpg',
    blurb: 'Miles says he isn\'t materialistic',
  },
  {slug: 'stephen', name: 'Stephen Fluin', information: [
    {type: 'company', value: 'Google Inc'}
  ],
    photo: 'stephen.jpg',
    blurb: 'something cool about Stephen',
  },
  {slug: 'gerard', name: 'Gerard Sans', information: [
    {type: 'company', value: 'GDE'}
  ],
    photo: 'gerard.jpg',
    blurb: 'Gerard is a mega awesome GDE',
  },
  {slug: 'wilson', name: 'Wilson Mendez', information: [
    {type: 'company', value: 'GDE'}
  ],
    photo: 'wilson.png',
    blurb: 'Wilson is a mega awesome GDE',
  },
  {slug: 'eiji', name: 'Eiji Kitamura', information: [
    {type: 'company', value: 'Google'}
  ],
    photo: 'eiji.png',
    blurb: 'Eiji knows where all the good places are in Tokyo',
  },
  {slug: 'kentaro', name: 'Kentaro Okuno', information: [
    {type: 'github', value: 'https://github.com/armorik83'}
  ],
    photo: 'kentaro.jpg',
    blurb: 'Kentaro knows his way around RxJS',
  },
  {slug: 'naoki', name: 'Naoki Matagawa', information: [
    {type: 'company', value: 'Asial Corporation'}
  ],
    photo: 'naoki.png',
    blurb: 'Naoki is presenting on Web Components and Onsen UI',
  },
  {slug: 'simon', name: 'Simon Takenaka', information: [],
    photo: 'simon.jpg',
    blurb: 'Simon is presenting on ReactiveForms',
  },
  {slug: 'takeshi', name: 'Takeshi Takatsudo', information: [
    {type: 'website', value: 'https://www.pxgrid.com/'}
  ],
    photo: 'takeshi.jpg',
    blurb: 'pxGrid and Angular',
  },
  {slug: 'shumpei', name: 'Takeshi Takatsudo', information: [
    {type: 'website', value: 'https://techfeed.io/'}
  ],
    photo: 'shumpei.jpg',
    blurb: 'TechFeed.io and Angular',
  },
  {slug: 'furukawa', name: 'Yosuke Furukawa', information: [
    {type: 'website', value: 'http://yosuke-furukawa.hatenablog.com/'}
  ],
    photo: 'furukawa.jpg',
    blurb: 'Yosuke Furukawa has a nice looking blog',
  },
  {slug: 'yuta', name: 'Yuta Moriyama', information: [
  ],
    photo: 'yuta.png',
    blurb: 'English Debate Community',
  },
  {slug: 'saki', name: 'Saki Homma', information: [
  ],
    photo: 'saki.jpg',
    blurb: 'Saki has a nice looking avatar picture',
  },
  {slug: 'tomohiro', name: 'Tomohiro Noguchi', information: [
    {type: 'github', value: 'https://github.com/ovrmrw'}
  ],
    photo: 'tomohiro.jpg',
    blurb: 'Be sure to visit Tomohiro\'s github profile',
  },
  {slug: 'yasunobu', name: 'Yasunobu Ikeda', information: [
    {type: 'website', value: 'https://ics.media/'}
  ],
    photo: 'yasunobu.jpg',
    blurb: 'ICS media\'s website has some really pretty animations',
  },
  {slug: 'yosuke', name: 'Yosuke Kurami', information: [
  ],
    photo: 'yosuke.png',
    blurb: 'Yosuke has a nice looking avatar picture',
  },
];

assertUniqueSlugs(_ITEMS);

export const DEFAULT_ITEMS = _ITEMS;

function assertUniqueSlugs(items: ListItem[]) {
  const visitedSlugs: {[slug: string]: boolean} = {};
  items.forEach(item => {
    const slug = item.slug;
    if (visitedSlugs[slug]) {
      throw new Error(`Please make sure all item slugs are unique (${slug} showed up twice)`);
    }
    visitedSlugs[slug] = true;
  });
}
