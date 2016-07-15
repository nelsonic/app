## Overview

Main goal for the [gm-magic](https://github.com/FAC-GM/gm-magic) extension is to collect and enhance the data for the specific linkedin profiles.

For the main overview of the extension, please check the [manifest.json](https://github.com/FAC-GM/gm-magic/blob/test/chrome-extension/manifest.json)

How it works:

- [background.js](https://github.com/FAC-GM/gm-magic/blob/test/chrome-extension/js/background.js) send the [AJAX POST request to api endpoint](https://github.com/FAC-GM/gm-magic/blob/test/chrome-extension/js/background.js#L59-L69) with the profile object
- depending on different [url](https://github.com/FAC-GM/gm-magic/blob/test/chrome-extension/js/background.js#L15) ('regular' or 'recruiter') we use following function to collect the data:
  - [scraperRecruiter](https://github.com/FAC-GM/gm-magic/blob/test/chrome-extension/js/scrapeRecruiter.js)
  - [scraper](https://github.com/FAC-GM/gm-magic/blob/test/chrome-extension/js/scrape.js)

- how to publish extension is explained in the [README](https://github.com/FAC-GM/gm-magic)

References:
- [dwyl-learn-extension tutorial](https://github.com/dwyl/learn-chrome-extensions)
- [official docs](https://developer.chrome.com/extensions)
- [our basic explanation](https://github.com/FAC-GM/gm-magic/issues/1)
