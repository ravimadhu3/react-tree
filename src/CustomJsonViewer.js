import React from 'react';
import './App.css';
import JSONTree from 'react-json-tree'

class CustomJsonViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 0,
            path: [],
            jsonData : {},
            jsonRules : {},
            tableData : {},
            tableRules : {},
            pathHierarchy : []
        }

    }

    componentDidMount() {
        this.fetchBulkJson();
    }

    fetchBulkJson() {
        this.setState({loading : 1, jsonData : {}})
        fetch("http://127.0.0.1:8081/fds/bulk-json")
            .then(res => res.json())
            .then(
                (result) => {
                    setTimeout(() => {
                        this.setState({
                            jsonData: result,
                            loading: 0
                        });
                    }, 2000)
                },
                (error) => {
                    this.setState({
                        loading: 0
                    });
                }
            );
        this.fetchRulesJson();
    }

    fetchRulesJson() {
        this.setState({ jsonRules : {}})
        fetch("http://127.0.0.1:8081/fds/rules-json")
            .then(res => res.json())
            .then(
                (result) => {
                    setTimeout(() => {
                        this.setState({
                            jsonRules: result,
                        });
                    }, 2000)
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    setTableData(path, tableData) {
        this.setState({tableData : tableData, path : path})
    }

    setTableRule(path) {
        let jsonRules = this.state.jsonRules;
        let tableRules = jsonRules
        if(path.length > 0) {
            for(let k = path.length - 1; k >= 0  ; k--){
                console.warn(path.length + "Path ---> " + k + "--->" + path[k])
                /*if(path[k] == "root"){
                    break
                } else  {
                    console.warn("Path ---> " + k + "--->" + path[k] + ", tableRules :" +  JSON.stringify(tableRules))
                }*/
                if(tableRules != undefined && path[k] != "root") {
                    tableRules = tableRules[path[k]]
                }
            }
        }
        this.setState({pathHierarchy : path, tableRules : tableRules})
    }

    render() {
        let tableContent = [];
        let tableDetailView = {};
        let tableData = this.state.tableData;
        let tableRules = this.state.tableRules;

        Object.keys(tableData).forEach((key, index) => {
            if(!(tableData[key] instanceof Object)) {
                tableDetailView[key] = tableData[key]

                let component = <tr><td>{key}</td><td><input type="text" name={""} value={tableData[key]} onChange={(e) => {
                    tableData[key] = e.target.value
                    this.setState({
                        tableData: tableData
                    })
                }
                }/></td></tr>;

                if(tableRules != undefined && tableRules != null && Object.keys(tableRules).length > 0){
                    let rules = tableRules[key];
                    if(rules != undefined && rules != null && Object.keys(rules).length > 0){
                        if(rules["isEdit"] == "No")
                        component = <tr><td>{key}</td><td><input type="text" disabled name={""} value={tableData[key]} onChange={(e) => {
                            tableData[key] = e.target.value
                            this.setState({
                                tableData: tableData
                            })
                        }
                        }/></td></tr>;
                    }
                }
                tableContent.push(component)
            }
        });
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-sm-3"}>
                        <input type="button" onClick={()=>this.fetchBulkJson()} value={"Get Data"}/> <br/><br/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-sm-3"}>
                        <div className="content-viewer" style={{ overflow: "auto", marginRight: 20}}>
                            <h5><b>JSON Tree</b><br/></h5>
                            {
                                Object.keys(this.state.jsonData).length > 0 ? <JSONTree data={this.state.jsonData}
                                    //hideRoot={true}
                                                                    shouldExpandNode={()=>false}
                                                                    theme={{
                                                                        valueLabel: {
                                                                            display :"none",
                                                                        },
                                                                        value: {
                                                                            display :"none",
                                                                        }
                                                                    }}
                                                                    valueRenderer={raw => <span onClick={()=> alert(raw)}>{raw}</span>}
                                                                    labelRenderer={raw => <span onClick={()=> this.setTableRule(raw)}>{raw[0]}</span>}
                                                                    getItemString={(type, data, itemType, itemString) => <span onClick={()=> this.setTableData("", data)}>{itemType} {itemString} View </span> }
                                /> :  <span>Loading...</span>
                            }

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
                            <h5><b>Full Path</b></h5>
                            {
                                JSON.stringify(this.state.pathHierarchy)
                            }
                            <br/><br/>
                            <h5><b>Full Json Data</b></h5>
                            {
                                JSON.stringify(tableDetailView)
                            }
                            <br/><br/>

                            <h5><b>Rule for Node</b></h5>
                            {
                                JSON.stringify(this.state.tableRules)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomJsonViewer;
