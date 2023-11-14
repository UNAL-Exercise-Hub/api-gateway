import XMLHttpRequest from "xhr2";

export const soap = () => {
  return new Promise((resolve, reject) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso",
      true
    );

    // build SOAP request
    var sr =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      "<soap:Body>" +
      '<CountryIntPhoneCode xmlns="http://www.oorsprong.org/websamples.countryinfo">' +
      "<sCountryISOCode>CO</sCountryISOCode>" +
      "</CountryIntPhoneCode>" +
      "</soap:Body>" +
      "</soap:Envelope>";

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const xml = xmlhttp.responseText;
          const regex = /<m:CountryIntPhoneCodeResult>(\d+)<\/m:CountryIntPhoneCodeResult>/;
          const match = xml.match(regex);
          resolve(match[1])
        } else {
          reject (new Error('Requist SOAP failed'))
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  });
};
