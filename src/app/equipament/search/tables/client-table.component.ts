import { Component, ViewEncapsulation } from '@angular/core'
declare var jQuery: any

const PEOPLE = [
  {
    '_id': '5863f8c82cda47cf16cb1b46',
    'index': 0,
    'guid': '28bfce74-7782-444f-878d-a1a74e2c8ef4',
    'name': 'Floyd Wallace',
    'email': 'floydwallace@savvy.com',
    'phone': '+55 (988) 567-2940',
    'address': '419 Newport Street, Carlos, Connecticut, 9647'
  },
  {
    '_id': '5863f8c8d064eac063e3ad4b',
    'index': 1,
    'guid': '1077d401-fef8-4b55-b26e-a22c38799d41',
    'name': 'Ferguson Mcintyre',
    'email': 'fergusonmcintyre@savvy.com',
    'phone': '+55 (999) 431-3177',
    'address': '838 Riverdale Avenue, Lumberton, Utah, 8908'
  },
  {
    '_id': '5863f8c8719fc2506c5b7b15',
    'index': 2,
    'guid': '9f7e6f89-1ae2-4ac7-931f-fdc23ffae396',
    'name': 'Donna Gross',
    'email': 'donnagross@savvy.com',
    'phone': '+55 (986) 548-2513',
    'address': '715 Dover Street, Valle, Mississippi, 1652'
  },
  {
    '_id': '5863f8c8e959bcb91cc647cf',
    'index': 3,
    'guid': 'e649b378-e8cd-4442-ac20-ae51b5117e07',
    'name': 'Christina Boone',
    'email': 'christinaboone@savvy.com',
    'phone': '+55 (811) 515-3039',
    'address': '835 Heath Place, Jennings, Virgin Islands, 5069'
  },
  {
    '_id': '5863f8c8c56690265095c216',
    'index': 4,
    'guid': '47928bea-6b9f-41bd-900e-44005e5137d1',
    'name': 'Leila Gaines',
    'email': 'leilagaines@savvy.com',
    'phone': '+55 (918) 490-3534',
    'address': '517 Milton Street, Dupuyer, Indiana, 5919'
  },
  {
    '_id': '5863f8c8d969f30441b73206',
    'index': 5,
    'guid': '8c262ee5-b462-42d6-ae4f-853de92b4865',
    'name': 'Nora Nielsen',
    'email': 'noranielsen@savvy.com',
    'phone': '+55 (883) 561-3432',
    'address': '325 Battery Avenue, Idamay, District Of Columbia, 2321'
  },
  {
    '_id': '5863f8c826c83f78256db277',
    'index': 6,
    'guid': 'd953da69-3407-488b-b252-4e1f24d3e55f',
    'name': 'Simpson Rosario',
    'email': 'simpsonrosario@savvy.com',
    'phone': '+55 (811) 442-2761',
    'address': '458 Franklin Avenue, Snelling, Wyoming, 1051'
  },
  {
    '_id': '5863f8c8c70135de97612b9e',
    'index': 7,
    'guid': 'f29b923c-fb8d-4b02-bd0b-6f74ff9bf540',
    'name': 'Jones Tyler',
    'email': 'jonestyler@savvy.com',
    'phone': '+55 (831) 552-3146',
    'address': '435 Malta Street, Sardis, Virginia, 6862'
  },
  {
    '_id': '5863f8c8fb4751b4ee5b0c7e',
    'index': 8,
    'guid': '15c21fcd-39f4-4002-8a34-9a614a728fe0',
    'name': 'Tabatha Scott',
    'email': 'tabathascott@savvy.com',
    'phone': '+55 (871) 418-2359',
    'address': '571 Kingston Avenue, Whitehaven, Puerto Rico, 9663'
  },
  {
    '_id': '5863f8c8f9a21f0329cd7bed',
    'index': 9,
    'guid': '8724ca6f-39e5-49dc-b1e4-390e261d3631',
    'name': 'Odonnell Slater',
    'email': 'odonnellslater@savvy.com',
    'phone': '+55 (825) 564-3360',
    'address': '393 Jewel Street, Hollins, West Virginia, 5325'
  },
  {
    '_id': '5863f8c8c6ce4aa1c7038d51',
    'index': 10,
    'guid': '18b16f73-dfc2-41fc-a0f3-a0af93e08519',
    'name': 'Kathryn Stark',
    'email': 'kathrynstark@savvy.com',
    'phone': '+55 (802) 508-2420',
    'address': '520 Bergen Avenue, Nicholson, Pennsylvania, 4957'
  },
  {
    '_id': '5863f8c82831308a32cffe06',
    'index': 11,
    'guid': '78e2df92-9f03-4944-a4ad-60a76f474bf8',
    'name': 'Alana Witt',
    'email': 'alanawitt@savvy.com',
    'phone': '+55 (885) 512-2978',
    'address': '473 Lawrence Avenue, Greenbackville, Massachusetts, 4778'
  },
  {
    '_id': '5863f8c89aa2ce6a63b7ef6d',
    'index': 12,
    'guid': '140115f6-113d-4292-b190-7f874b2f897a',
    'name': 'Lawrence Powers',
    'email': 'lawrencepowers@savvy.com',
    'phone': '+55 (844) 495-2407',
    'address': '804 Oceanic Avenue, Thornport, Rhode Island, 831'
  },
  {
    '_id': '5863f8c808b971c0cde7f21c',
    'index': 13,
    'guid': '3dbf5a05-1253-47c1-a535-a48fb69c0d91',
    'name': 'Benton Shepard',
    'email': 'bentonshepard@savvy.com',
    'phone': '+55 (963) 581-3028',
    'address': '960 Columbia Street, Kieler, Maryland, 358'
  },
  {
    '_id': '5863f8c8b8947bcbb0ab3ac3',
    'index': 14,
    'guid': 'e0721454-5481-47a2-8187-d927a6cbb273',
    'name': 'Kidd Cox',
    'email': 'kiddcox@savvy.com',
    'phone': '+55 (924) 598-3928',
    'address': '581 Rutland Road, Northchase, Northern Mariana Islands, 6925'
  },
  {
    '_id': '5863f8c83cddb37b66566720',
    'index': 15,
    'guid': '18f9e3e9-3089-4aac-b17d-4d0531ab2ef4',
    'name': 'Ramirez Love',
    'email': 'ramirezlove@savvy.com',
    'phone': '+55 (977) 533-3535',
    'address': '187 Agate Court, Mappsville, Guam, 1200'
  },
  {
    '_id': '5863f8c8a6a92e8ac603ecf6',
    'index': 16,
    'guid': '4e42bb72-c61f-4ef8-9dfe-9d013faa9f8c',
    'name': 'Earlene Thompson',
    'email': 'earlenethompson@savvy.com',
    'phone': '+55 (968) 463-3141',
    'address': '557 Claver Place, Golconda, Georgia, 7726'
  },
  {
    '_id': '5863f8c8c8745dea09838c63',
    'index': 17,
    'guid': '3517f9d1-1b4f-42fb-b344-7e05ff728c72',
    'name': 'Jenny Abbott',
    'email': 'jennyabbott@savvy.com',
    'phone': '+55 (898) 544-3717',
    'address': '932 Harkness Avenue, Muir, North Carolina, 1945'
  },
  {
    '_id': '5863f8c806cb87aa105e74c4',
    'index': 18,
    'guid': '77bbc2fe-0491-472e-b3d3-ff7e0026091e',
    'name': 'Buchanan Cortez',
    'email': 'buchanancortez@savvy.com',
    'phone': '+55 (950) 468-2441',
    'address': '912 Bowery Street, Babb, Marshall Islands, 6392'
  },
  {
    '_id': '5863f8c812c059a358104d6e',
    'index': 19,
    'guid': 'b655b755-22a9-426b-8c96-15e5d5d679f6',
    'name': 'Morgan Lane',
    'email': 'morganlane@savvy.com',
    'phone': '+55 (817) 462-2038',
    'address': '993 Amber Street, Grahamtown, Montana, 7396'
  },
  {
    '_id': '5863f8c8d4ac3f72aee61bbb',
    'index': 20,
    'guid': '4d81a84c-fd24-4d7f-b69e-76ac9262aeb3',
    'name': 'Ayers Garner',
    'email': 'ayersgarner@savvy.com',
    'phone': '+55 (810) 502-2143',
    'address': '487 Waldane Court, Welch, New Jersey, 9791'
  }
]

@Component({
  selector: '[search-client-table]',
  templateUrl: './client-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./client-table.styles.scss']
})

export class SearchClientTable {

  data: any[] = PEOPLE

  constructor() {}

  selected(element, data) {
    this.toggleSelected(element)
  }

  toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }

}
