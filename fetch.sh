#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"


mkdir -p data
while read -r location
do
    echo "fetching $location"
    curl "https://order.buddyspizza.com/api/vendors/$location"   -H 'authority: order.buddyspizza.com'   -H 'sec-ch-ua: "Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"'   -H 'x-olo-viewport: Desktop'   -H 'x-olo-country: us'   -H 'dnt: 1'   -H 'x-olo-request: 1'   -H 'x-olo-app-platform: web'   -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36'   -H 'accept: application/json, */*'    -H 'referer: https://order.buddyspizza.com/menu/woodhaven-buddys' -H 'cookie: CT=O1v5MSeMV0K0qTPq2ngN6%2FNQ%3D%3Dzjai0pX5DQO6v%2B4Qjspqb1tnOvFuLc%2FdlVImaYoLlKs%3D; __cf_bm=j92tUD.b2Q768i9AUeTpu9VMaZczQnL2paQhL6qSnIg-1634236398-0-AX5L899YonBj3blzlIS+8QOIfXl9W5xKSJI4NlUtwgqv4GPtlZK9pbot04FXY1l6KUrWx1F9qaf1NlKdOoMrfr2pjDlRwUn/R/I0QCOzFgFi; _pxhd=85H49OBezFgxmOZz-31cwF/pclqZc-Vwh55jv-mRxQlQXXn7/isjpsjIsoZdP7gr8KrjQx/uYakL30AfwvPLmw==:KWvof68r7d5hPPJRf4EdqqBr6Ya3gmIqPwZfLgz6m/S2yrMuLr6oPMnThws9e-w9vJc1BuND4rAEGRAPEcoNgHEO5VXofbuj748s0Q8Pyds=' > "data/$location.json"
done < locations
