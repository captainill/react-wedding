import keyMirror from "react/lib/keyMirror";

const envrironment = process.env.NODE_ENV;

const Config = {
  imagePath: (envrironment === 'production') ? 'http://d7ut1n2771fln.cloudfront.net' : '/public',
  creatorTwitter: '@captainill',
  keywords: 'Love,HTML,JavaScript',
  siteUrl: 'http://tayloranderica.com',
  siteTitle: 'Taylor & Erica Crawford',
  siteDescription: 'Happily Ever After...',
  siteImageUrl: 'http://d7ut1n2771fln.cloudfront.net/images/DSC_0120.jpg'
}

export default Config;
