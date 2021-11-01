# POAO development proxy

Simple CORS proxy for local development. Can be used to send HTTP requests to other domains without worrying about CORS.

## Config

Proxyen konfigureres med JSON, enten ved å legge JSON direkte inn i variablen **JSON_CONFIG** 
eller ved å spesifisere en JSON-fil med **JSON_CONFIG_FILE_PATH**.

Den viktigste delen av configen er proxy endepunktene som man setter opp. Proxy endepunktene kan ha følgende felter:

- **fromPath** -> (Required) Hvilken path som proxyen skal matche. Alle requests som starter med **fromPath** vil bli matchet av configen.
- **toUrl** -> (Required) Hvilken URL som proxy requestet skal sendes til. **fromPath** vil bli appendet til **toUrl** før requestet blir sendt videre
- **fromContextPath** -> (Optional) Brukes for å sette hva i **fromPath** som regnes som en del av context path.
 Context path vil ikke bli appendet til **toUrl** når proxy requestet blir sendt videre.
 
F.eks med følgende proxy endepunkt: 
`{ "fromPath": "/my-path/test", "toUrl": "https://my-app.dev.intern.nav.no/proxy", "fromContextPath": "/my-path" }`

og det blir sendt et request til proxyen som ser slik ut: `http://localhost:<port>/my-path/test/hello/world`, 
så vil URLen proxyet videre til `https://my-app.dev.intern.nav.no/proxy/test/hello/world`.

Eksempel JSON config:
```json
{
  "port": 8080,
  "proxy": {
      "proxies": [
        { "fromPath": "/my-path/test", "toUrl": "https://my-app.dev.intern.nav.no", "fromContextPath": "/my-path" }
      ]
   }
}
```

## Eksempel

Dev proxyen kan f.eks brukes med docker-compose slik som vist nedenfor:

```yaml
version: '3.7'
services:
  dev-proxy:
    image: 'ghcr.io/navikt/poao-dev-proxy/poao-dev-proxy:<latest-version>'
    container_name: poao-dev-proxy
    ports:
      - '58080:8080'
    environment:
      JSON_CONFIG: >
        {
          "proxy": {
            "proxies": [
              ...
            ]
          }
        }
```