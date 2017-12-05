import path from 'path';

const config = {
  bundleId: 'com.firstgroup.firstgroupstaff',
  displayName: 'First Student Connect',
  developmentTeam: '9BD6VT39FR',
  appleId: 'iphone@utrack.com',
  itcTeamId: 'Firstgroup America Inc',
  codeSigningIdentity: 'iPhone Distribution: Firstgroup America Inc (9BD6VT39FR)',
  provisioningProfile: path.resolve('config', 'provisioning_profiles', 'FirstGroup_Staff_AppStore.mobileprovision'),
  version: {
    code: '21',
    name: '1.1.0',
    stage: ''
  },
  oneSignal: {
    appId: '1e8ffa37-78e0-4976-98da-b8d29fa4289a',
    googleProjectNumber: '1080448450900',
    baseUrl: 'https://onesignal.com/api/v1'
  },
  match: {
    gitBranch: 'utrack'
  },
  fabric: {
    apiKey: '63e3dc84d8a4670b88dc34828596150be03f292e',
    buildSecret: '3c526d0211a36bd73163c01ecfc16e3275b838dfce05742541ed1c31e5549312'
  },
  api: {
    baseUrl: 'https://www.firststudentconnect.com/api/v1'
  },
  app: {
    newsfeedUrl: 'https://www.firststudentconnect.com/api/v1/newsfeed',
    perkspotUrl: 'https://firstgroup.perkspot.com/login',
    adpUrl: 'https://www.firststudentconnect.com/adp.html',
    wellsfargoUrl: 'https://www.firststudentconnect.com/api/v1/newsfeed'
  },
  google: {
    iosClientId: '1080448450900-2tnqdmq5om6p40oi44l0ghv28hlorlh7.apps.googleusercontent.com',
    reversedClientId: 'com.googleusercontent.apps.1080448450900-2tnqdmq5om6p40oi44l0ghv28hlorlh7',
    webClientId: '1080448450900-14spp8617kq47f8dc42bkt3altb4jmh6.apps.googleusercontent.com'
  },
  facebook: {
    appId: 'fb413074109076413'
  }
};

export default config;
