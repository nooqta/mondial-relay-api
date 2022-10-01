var soap = require('soap');
const crypto = require('crypto');
const statusCodes = require('./statusCodes');
// WSI2_CreationExpedition
// WSI2_CreationEtiquette
// WSI2_RechercheCP
// WSI4_PointRelais_Recherche
// WSI2_TracingColisDetaille
// WSI3_GetEtiquettes
// WSI2_STAT_Label

const merchant = process.env.ENSEIGNE || 'BDTEST13';
const privateKey = process.env.PRIVATE_KEY || 'PrivateK';
var url = 'https://api.mondialrelay.com/Web_Services.asmx?WSDL';
let args = {
    Enseigne: merchant,
    Pays: 'FR',
    Ville: 'PARIS',
    NbResult: '15',
};
// calculate Mondial Relay security key
const securityKey = (args) => {
    const content = args.join('') + privateKey;
    return crypto.createHash('md5').update(content).digest('hex').toUpperCase();

}

const validateStatusCode = (code) => {
    if (code !== '0') {
        console.log(statusCodes[code]);
        return false;
    }
    return true;
}

// WSI2_RechercheCP
searchZipCodes = (args) => {
    return new Promise((resolve, reject) => {
        return soap.createClient(url, (err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args));
            client.WSI2_RechercheCP(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (validateStatusCode(result.WSI2_RechercheCPResult.STAT)) {
                    return resolve(result.WSI2_RechercheCPResult.Liste.Commune);
                } else {
                    return reject(statusCodes[result.WSI2_RechercheCPResult.STAT]);
                }
            });
        });
    });
}
searchZipCodes(args).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
// // then/catch
// soap.createClientAsync(url).then((client) => {
//     return client.WSI2_RechercheCP(args, function (err, result) {
//         const code = result.WSI2_RechercheCPResult.STAT;
//         console.log(result);
//         if(validateStatusCode(code)) {
//             const communes = result.WSI2_RechercheCPResult.Liste.Commune;
//             console.log(communes);
//         }
//         return result;
//     });
// }).catch((err) => {
//     console.log(err);
// });

// async/await
// var client = await soap.createClientAsync(url);
// var result = await client.WSI2_RechercheCP(args);
// console.log(result[0]);