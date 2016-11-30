import test from 'tape';
import harvester from '../../app/scripts/link-harvester';

test('basics', (t) => {
  t.deepEqual(harvester(), {}, 'No input returns empty object');
  t.deepEqual(harvester(''), {}, 'Empty string returns empty object');
  t.end();
});

test('email', (t) => {
  t.deepEqual(harvester('<a href="mailto:sit@amet.com">site</a>'),
    {emailAddresses: ['sit@amet.com']}
    , 'One email address');
  t.deepEqual(harvester('<a href="mailto:sit@amet.com">site</a> asd <a href="mailto:magna@aliqua.com">Ut</a>'),
    {emailAddresses: ['sit@amet.com', 'magna@aliqua.com']}
    , 'Two email addresses');
  t.end();
});

test('links', (t) => {
  t.deepEqual(harvester('<a href="http://exampleurl1.com">labore et</a>'),
    {
      links: [
        {
          linkText: 'labore et',
          url: 'http://exampleurl1.com'
        }
      ]
    },
    'One http link');
  t.deepEqual(harvester('<a href="http://exampleurl1.com">labore et</a> askjsk <a href="https://exampleurl2.com">aliquip</a>'),
    {
      links: [
        {
          linkText: 'labore et',
          url: 'http://exampleurl1.com'
        },
        {
          linkText: 'aliquip',
          url: 'https://exampleurl2.com'
        }
      ]
    },
    'Two http links');
  t.end();
});

test('anchors', (t) => {
  t.deepEqual(harvester('<a href="#anchor">quis nostrud</a>'), {}, 'Anchors are filtered');
  t.end();
});

test('Integration', (t) => {
  t.deepEqual(harvester(`Lorem ipsum dolor <a href="mailto:sit@amet.com">sit
e</a> consectetur <span>adipiscing elit</span>, sed do <strong>eiusmod tempor
incididunt</strong> ut <a href="http://exampleurl1.com">labore et</a> dolore
<a href="mailto:magna@aliqua.com">Ut</a>. <em>enim ad minim</em> veniam, <a href="#anchor">quis nostrud</a>
exercitation ullamco laboris nisi ut <a href="https://exampleurl2.com">aliquip</a> ex ea commodo consequat.</p>`),
    {
      links: [{linkText: "labore et", url: "http://exampleurl1.com"}, {
        linkText: "aliquip",
        url: "https://exampleurl2.com"
      }],
      emailAddresses: ['sit@amet.com', 'magna@aliqua.com']
    },
    'Mails and links and anchors mixed');
  t.end();
});