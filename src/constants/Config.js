import keyMirror from "react/lib/keyMirror";

const envrironment = process.env.NODE_ENV;

const Config = {
  imagePath: (envrironment === 'production') ? 'http://d7ut1n2771fln.cloudfront.net' : '/public'
}

export default Config;
