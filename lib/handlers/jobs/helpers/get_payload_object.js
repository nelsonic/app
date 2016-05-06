module.exports = function (payload, users) {
  var user = {};
    users.forEach(function (userObj) {

      if (userObj.id.toString() === payload.user.toString()) {
        user.id = userObj.id;
        user.firstName = userObj.names.firstname;
        user.lastName = userObj.names.lastname;
      }
    });

    var categories = {total: 0, data: []};

    if (payload.categories) {
      if (typeof payload.categories === "string") {
        categories.data = [{id: payload.categories}];
      } else {
        categories.data = payload.categories.map(id => {return {id: id}});
      }
        categories.total = categories.data.length;
    }

    var businessSectors = {total: 0, data: []};

    if (payload.businessSectors) {
      if (typeof payload.businessSectors === "string") {
        businessSectors.data = [{id: payload.businessSectors}];
      } else {
        businessSectors.data = payload.businessSectors.map(id => {return {id: id}});
      }

      businessSectors.total = businessSectors.data.length;
    }

    var address = {};
    address.city = payload.city;
    address.countryID = payload.countryId;

    //keep the value of dates as null even if is not submitted
    var timestampStartDate = Date.now();
    var timestampDateEnd = null;

    var skills = payload.skillList || [];
    if(typeof skills === 'string') {
      skills = [skills];
    }

    var jobObj = {
      title: payload.title,
      employmentType: payload.employmentType,
      owner: user,
      client: payload.client,
      previousClient: payload.previousClient,
      customText1: payload.customText1,
      customText2: payload.customText2,
      customText3: payload.customText3,
      customTextBlock1: payload.customTextBlock1,
      customText5: payload.customText5,
      customText6: payload.customText6,
      customText7: payload.customText7,
      customText8: payload.customText8,
      customTextBlock2: payload.customTextBlock2,
      customText11: payload.customText11,
      startDate: timestampStartDate,
      dateEnd: timestampDateEnd,
      salary: payload.salary,
      payRate: payload.payRate,
      skillList: skills.join(','),
      customText12: payload.customText12,
      categories: categories,
      businessSectors: businessSectors,
      description: payload.description,
      address: address,
      dateAdded: Date.now(),
      active: (payload.active === 'on') ? true : false
    };

  return jobObj;
}
