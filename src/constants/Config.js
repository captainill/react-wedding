import keyMirror from "react/lib/keyMirror";

const envrironment = process.env.NODE_ENV;

const Config = {
  imagePath: (envrironment === 'production') ? 'http://d2dxb827r4wo7a.cloudfront.net' : '/assets',
  creatorTwitter: '@captainill',
  keywords: 'Love,HTML,JavaScript',
  siteUrl: 'http://www.tayloranderica.com',
  siteTitle: 'Taylor & Erica Crawford',
  siteDescription: 'Happily Ever After...',
  siteImageUrl: 'http://d2dxb827r4wo7a.cloudfront.net/images/DSC_0120.jpg'
}

export default Config;
