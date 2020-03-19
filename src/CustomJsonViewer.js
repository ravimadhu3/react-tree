import React from 'react';
import './App.css';
import JSONTree from 'react-json-tree'

class CustomJsonViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: [],
            jsonData : {
                "name": 'ss',
                "glossary": {
                    "title": "example glossary",
                    "GlossDiv": {
                        "title": "S",
                        "GlossList": {
                            "GlossEntry": {
                                "ID": "SGML",
                                "SortAs": "SGML",
                                "GlossTerm": "Standard Generalized Markup Language",
                                "Acronym": "SGML",
                                "Abbrev": "ISO 8879:1986",
                                "GlossDef": {
                                    "para": "A meta-markup language, used to create markup languages such as DocBook.",
                                    "GlossSeeAlso": ["GML", "XML", "GM1", "XM2"],
                                },
                                "GlossSee": "markup"
                            }
                        }
                    }
                }
            },
            tableData : {},
        }

    }

    // componentDidMount() {
    //     this.setTableData("", this.state.jsonData)
    // }

    setTableData(path, tableData) {
        this.setState({tableData : tableData, path : path})
    }


    render() {
        let tableContent = [];
        let tableData = this.state.tableData;

        Object.keys(tableData).forEach((key, index) => {
            if(!(tableData[key] instanceof Object)) {
                tableContent.push(<tr><td>{key}</td><td><input type="text" name={""} value={tableData[key]} onChange={(e) => {
                    tableData[key] = e.target.value
                    this.setState({
                        tableData: tableData
                    })
                }
                }/></td></tr>)
            }
        });
        return (
            <div className={"row"}>
                <div className={"col-sm-3"}>
                    <div className="content-viewer">
                        <h5><b>JSON Tree</b><br/></h5>
                        <JSONTree data={this.state.jsonData}
                                  //hideRoot={true}
                                  shouldExpandNode={()=>false}
                                  theme={{
                            valueLabel: {
                                display :"none",
                            },
                            value: {
                                display :"none",
                            },
                        }}
                                  getItemString={(type, data, itemType, itemString) => <span onClick={()=> this.setTableData("", data)}>{itemType} {itemString}</span> }
                        />
                    </div>
                </div>
                <div className={"col-sm-6"}>
                    <div className="content-viewer" style={{ overflow: "auto", marginRight: 20}}>
                        <h5><b>Leaf Node Value Editor</b></h5><br/>
                        {
                            tableContent.length>0 ? <table border="1" cellPadding={"15"}>
                                <tr><td style={{fontWeight: 'bold'}}>Key</td><td style={{fontWeight: 'bold'}}>Value</td></tr>
                                {
                                    tableContent
                                }
                            </table> : null
                        }
                    </div>
                </div>
                <div className={"col-sm-3"}>
                    <div className="content-viewer" style={{ overflow: "auto", marginRight: 20, wordWrap: 'break-word'}}>
                        <h5><b>Full Json Data</b></h5>
                        <br/>
                        {
                            JSON.stringify(this.state.jsonData)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomJsonViewer;
