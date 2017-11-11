const grabScore = require('./grabScore');

async function printScore(username) {
	const data = await grabScore(username);
	console.log("finished fetching");
	console.log(data, username);
}
printScore(`mtthwdvs`);

//dailymailuk: -4823

//PrisonPlanet: -2839
//RealAlexJones: -2624

//nytimes: -1933
//cnnbrk: -1872
//cnn:-1722
//sosadtoday: -1700
//foxnews: -1575
//loopzoop: -1516
//riplimewire: -1349
//tmz: -1287
//ggreenwald:-1175
//JulianAssange: -960
//EhJovan: -847
//maggieNYT: -820
//polinaemm: -733
//taylorswift13: -600
//xylesmavier: -481

//BreitBart: -55
//anitahitta: -35
//ByYourLogic: 48
//trjstn: 69
//khamenei_ir: 194
//grubbyguy: 302
//neeratanden: 409
//tracethmpsn: 421
//mtthwdvs: 517
//patatoreid: 656
//briteboypls: 723
//hashmita7: 745
//DonaldJTrumpJr: 768
//libbycwatson: 785
//airhrs: 863

//MMFlint: 1142
//berniesanders: 1206
//twinkpiece: 1248


// The Non Offenders
//hillaryclinton: 2259
//realdonaldtrump: 2716
//katyperry: 2779

//barackobama: 3471
//positiveminds__: 3640
//JustinBieber: 3995
//RickWarren: 4489
//KimKardashian: 4567

//ivankatrump: 5891
//KylieJenner: 6157

//Pontifex: 7231
//Life_Affirming: 8652
//joelosteen: 9187