var createMyDashboardObj = require('../lib/handlers/gmdashboard/helpers/create_my_dashboard_obj');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('create dashboard object', function () {

  it('return the object', function (done) {

    const jobs = [
       { title: 'Front End',
        employmentType: 'Contract',
        owner:
         { id: '1',
           firstName: 'Anita',
           lastName: 'Czapla',
           initials: 'AC' },
        client: '1',
        previousClient: '',
        categories: { total: 0, data: [] },
        businessSectors: { total: 0, data: [] },
        description: '',
        address: { city: 'Manchester', countryID: '2188' },
        dateAdded: 1463138759554,
        active: true,
        id: '1' }
      ];

      const stages = [
        { id: 1, name: 'Submitted' },
        { id: 2, name: 'Phone Screen' },
        { id: 3, name: 'Interview Stage 1' },
        { id: 4, name: 'Interview Stage 2' },
        { id: 5, name: 'Interview Stage 3' },
        { id: 6, name: 'Technical Test' },
        { id: 7, name: 'Face to Face' },
        { id: 8, name: 'References Requested' },
        { id: 9, name: 'Offer' },
        { id: 10, name: 'Placement' }
      ];

      const result = createMyDashboardObj(jobs, stages);
      expect(result['1'].hasOwnProperty('6')).to.equal(true);
      done();
  });
});
