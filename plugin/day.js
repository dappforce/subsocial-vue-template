export default function ({ $dayjs }) {
  $dayjs.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%dm',
      h: 'an hour',
      hh: '%dh',
      d: 'a day',
      dd: '%dd',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    }
  })
}
