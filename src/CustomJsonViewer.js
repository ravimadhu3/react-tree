import React from 'react';
import './App.css';
import JSONTree from 'react-json-tree'
import JSONViewer from 'react-json-viewer';

class CustomJsonViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData : {
                "general": {
                    "name": "paris",
                    "overallLocation": "Paris, France",
                    "overallLocationLatLng": {
                        "lat": 48.856614,
                        "lng": 2.3522219000000177
                    },
                    "price": "2",
                    "coverImage": {
                        "fileUrl": "blob:http://localhost:3021/05d5f817-d1b1-42de-b3f3-110a161064cf",
                        "processType": "activity",
                        "fileName": "f0fce82b-cad4-4047-97ce-8475eb12954e.jpeg"
                    },
                    "description": "paris trip ",
                    "date": {
                        "start": "2020-01-12T18:30:00.000Z",
                        "end": "2020-01-12T18:30:00.000Z"
                    },
                    "trip_date": [
                        "2020-1-13"
                    ],
                    "no_of_trip_days": 0
                },
                "items": {
                    "2020-1-13": {
                        "activityJson": [
                            {
                                "activityName": "paris Trip ",
                                "description": "paris Trip ",
                                "location": "Paris, France",
                                "latlng": {
                                    "lat": 48.856614,
                                    "lng": 2.3522219000000177
                                },
                                "activityImage": "4b7a1808-f830-496a-8306-7ce3b3e92500.jpeg",
                                "category": [
                                    {
                                        "value": "Eat/Drink",
                                        "label": "Eat/Drink"
                                    }
                                ],
                                "bookingInfo": "paris",
                                "activityPhotoRecent": [
                                    {
                                        "file": {},
                                        "fileUrl": "blob:http://localhost:3021/93303060-0149-46c9-b925-707452b4fe20",
                                        "processType": "activity",
                                        "type": "new",
                                        "fileName": "4b7a1808-f830-496a-8306-7ce3b3e92500.jpeg",
                                        "docsId": "4b7a1808-f830-496a-8306-7ce3b3e92500"
                                    }
                                ],
                                "activityPhoto": [],
                                "activity_id": "d8e1c958-3500-4545-91f8-1c448dfd3432",
                                "showActivityImage": "https://zimodesolutions.com/tripographers-api/vp?action=activity&key=4b7a1808-f830-496a-8306-7ce3b3e92500.jpeg&id=2e6e4dbe-1823-42bc-9e5b-e8243613758f",
                                "oldUserId": "2e6e4dbe-1823-42bc-9e5b-e8243613758f"
                            }
                        ]
                    }
                },
                "tags": {
                    "country": [
                        {
                            "value": 75,
                            "sortname": "FR",
                            "label": "France",
                            "phoneCode": 33
                        }
                    ],
                    "cityes": [
                        {
                            "value": "17726",
                            "label": "Paris",
                            "state_id": "1278"
                        }
                    ],
                    "tagsPurpose": [
                        "Solo"
                    ],
                    "tagsGeneral": [
                        "Food/Drink"
                    ]
                },
                "notes": {
                    "note": [
                        {
                            "noteHeading": "paris",
                            "noteDescription": "paris"
                        }
                    ]
                }
            },
            tableData : {
                "general": {
                    "name": "paris",
                    "overallLocation": "Paris, France",
                    "overallLocationLatLng": {
                        "lat": 48.856614,
                        "lng": 2.3522219000000177
                    },
                    "price": "2",
                    "coverImage": {
                        "fileUrl": "blob:http://localhost:3021/05d5f817-d1b1-42de-b3f3-110a161064cf",
                        "processType": "activity",
                        "fileName": "f0fce82b-cad4-4047-97ce-8475eb12954e.jpeg"
                    },
                    "description": "paris trip ",
                    "date": {
                        "start": "2020-01-12T18:30:00.000Z",
                        "end": "2020-01-12T18:30:00.000Z"
                    },
                    "trip_date": [
                        "2020-1-13"
                    ],
                    "no_of_trip_days": 0
                },
                "items": {
                    "2020-1-13": {
                        "activityJson": [
                            {
                                "activityName": "paris Trip ",
                                "description": "paris Trip ",
                                "location": "Paris, France",
                                "latlng": {
                                    "lat": 48.856614,
                                    "lng": 2.3522219000000177
                                },
                                "activityImage": "4b7a1808-f830-496a-8306-7ce3b3e92500.jpeg",
                                "category": [
                                    {
                                        "value": "Eat/Drink",
                                        "label": "Eat/Drink"
                                    }
                                ],
                                "bookingInfo": "paris",
                                "activityPhotoRecent": [
                                    {
                                        "file": {},
                                        "fileUrl": "blob:http://localhost:3021/93303060-0149-46c9-b925-707452b4fe20",
                                        "processType": "activity",
                                        "type": "new",
                                        "fileName": "4b7a1808-f830-496a-8306-7ce3b3e92500.jpeg",
                                        "docsId": "4b7a1808-f830-496a-8306-7ce3b3e92500"
                                    }
                                ],
                                "activityPhoto": [],
                                "activity_id": "d8e1c958-3500-4545-91f8-1c448dfd3432",
                                "showActivityImage": "https://zimodesolutions.com/tripographers-api/vp?action=activity&key=4b7a1808-f830-496a-8306-7ce3b3e92500.jpeg&id=2e6e4dbe-1823-42bc-9e5b-e8243613758f",
                                "oldUserId": "2e6e4dbe-1823-42bc-9e5b-e8243613758f"
                            }
                        ]
                    }
                },
                "tags": {
                    "country": [
                        {
                            "value": 75,
                            "sortname": "FR",
                            "label": "France",
                            "phoneCode": 33
                        }
                    ],
                    "cityes": [
                        {
                            "value": "17726",
                            "label": "Paris",
                            "state_id": "1278"
                        }
                    ],
                    "tagsPurpose": [
                        "Solo"
                    ],
                    "tagsGeneral": [
                        "Food/Drink"
                    ]
                },
                "notes": {
                    "note": [
                        {
                            "noteHeading": "paris",
                            "noteDescription": "paris"
                        }
                    ]
                }
            },
        }

    }

    render() {
        return (
            <div className={"row"}>
                <div className={"col-sm-3"}>
                    <div className="content-viewer">
                        <h5> Tree  <br/></h5>
                        <JSONTree data={this.state.jsonData} theme={{
                            valueLabel: {
                                display :"none",
                            },
                            value: {
                                display :"none",
                            },
                        }}
                                  getItemString={(type, data, itemType, itemString) => <span onClick={()=> this.setState({tableData : data})}>{itemType} {itemString}</span> }
                        />
                    </div>
                </div>
                <div className={"col-sm-9"}>
                    <div className="content-viewer" style={{ overflow: "auto", marginRight: 20}}>
                        <h5> Data Viewer <br/></h5>
                        <JSONViewer json={this.state.tableData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomJsonViewer;
