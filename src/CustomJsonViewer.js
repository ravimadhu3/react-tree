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
            pathHierarchy : [],
            viewText : 0,
            hideSection3 : false
        }

    }

    componentDidMount() {
        this.fetchBulkJson();
    }

    fetchBulkJson() {
        this.setState({loading : 1, jsonData : {}})
        fetch("http://127.0.0.1:8082/fds/bulk-json")
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
        fetch("http://127.0.0.1:8082/fds/rules-json")
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
        let jsonData = this.state.jsonData;
        let tableRules = jsonRules
        let tableData = jsonData
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
        if(path.length > 0) {
            for(let k = path.length - 1; k >= 0  ; k--){
                console.warn(path.length + "Path ---> " + k + "--->" + path[k])
                if(tableData != undefined && path[k] != "root") {
                    tableData = tableData[path[k]]
                }
            }
            this.setTableData("", tableData)
        }
        this.setState({pathHierarchy : path, tableRules : tableRules})
    }

    handleChangeFile(event, fileUploadUrl)
    {
        let file = event.target.files[0];
        let formData = new FormData();
        formData.append('file1', file);
        fetch(fileUploadUrl, {
            method: "POST",
            mode: 'cors',
            redirect: 'follow',
            body: formData,
        }).then(
            function (response) {
                return response.json();
            }
        ).then(json => {
            // For refresh json
            this.fetchBulkJson();
            return json.response;
        }).catch(error => console.log(error));
    }

    submitChanges()
    {
        let that = this;
        var jsonData = this.state.jsonData;
        if(jsonData!=null && jsonData!=undefined && jsonData!="" && Object.keys(jsonData).length > 0)
        {
            var postJson ={
                jsonData : jsonData
            }
            fetch("http://127.0.0.1:8082/fds/merge-bulk-json", {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(postJson),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            }).then(
                function (response) {
                    return response.json();
                }
            ).then(function (dataresponse) {
                that.fetchBulkJson();
                return dataresponse;
            });
        }
        else {
            alert("Invalid Data")
        }
    }

    hideSection3 = type =>{
        if(type === "debug"){
            this.setState({hideSection3 : false})
        }else if(type === "hide3"){
            this.setState({hideSection3 : true})
        }
    }

    render() {
        let tableContent = [];
        let tableDetailView = {};
        let tableData = this.state.tableData;
        let tableRules = this.state.tableRules;

        Object.keys(tableData).forEach((key, index) => {
            if(!(tableData[key] instanceof Object)) {
                tableDetailView[key] = tableData[key];

                let disabled = "";
                let ddValueSelectBox = null;
                let fileUpload = null;

                if(tableRules != undefined && tableRules != null && Object.keys(tableRules).length > 0){
                    let rules = tableRules[key];
                    if(rules != undefined && rules != null && Object.keys(rules).length > 0){
                        if(rules["isEdit"] != undefined && rules["isEdit"] != null){
                            if(rules["isEdit"] == "No"){
                                disabled = "disabled"
                            }
                        }
                        if(rules["ddvalues"] != undefined && rules["ddvalues"] != null && Object.keys(rules["ddvalues"]).length > 0){
                            let ddvalues = rules["ddvalues"];
                            let ddOptionList = [];
                            Object.keys(ddvalues).forEach((key) => {
                                let selectBoxOption = ddvalues[key];
                                ddOptionList.push(<option value={selectBoxOption}>{selectBoxOption}</option>)
                            });
                            if(ddOptionList.length>0){
                                ddValueSelectBox = <select name="" id="" onChange={(e) => {
                                    tableData[key] = e.target.value
                                    this.setState({
                                        tableData: tableData
                                    })
                                }}>
                                    <option value="">Select</option>
                                    {ddOptionList}
                                </select>
                            }
                        }
                        if(rules["fileUploadUrl"] != undefined && rules["fileUploadUrl"] != null && rules["fileUploadUrl"] != "") {
                            fileUpload = <p><input type="file" onChange={(event) => this.handleChangeFile(event, rules["fileUploadUrl"])}/></p>
                        }
                    }
                }

                var component = <tr><td>{key}</td><td style={{display : "inline-flex", width: "100%"}}>
                    <input type="text" name={""} disabled={disabled} value={tableData[key]} onChange={(e) => {
                        tableData[key] = e.target.value
                        this.setState({
                            tableData: tableData
                        })
                    }
                    }/>


                    {ddValueSelectBox} { fileUpload} </td></tr>;

                tableContent.push(component)
            }
        });
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-sm-3"}>
                        <input type="button" onClick={()=>this.fetchBulkJson()} value={"Get Data"}/> <br/><br/>
                    </div>
                    <div className={"col-sm-6"}>
                    </div>
                    <div className={"col-sm-3"} style={{display: "inherit", float : "left"}}>
                        <input type="button" onClick={()=>{
                            this.submitChanges()
                        }} className={"btn btn-primary"} style={{ height: 50,  margin : 0, padding: 10 }} value={"Save Changes"}/> <br/><br/>
                        &nbsp;
                        {
                            this.state.hideSection3 ?
                                <input type="button" onClick={()=>{
                                    this.hideSection3("debug")
                                }} className={"btn btn-primary"} style={{ height: 50,  margin : 0, padding: 10 }} value={"View Debug"}/>
                                :
                                null
                        }
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-sm-3"}>
                        <div className="content-viewer" style={{ overflow: "auto", marginRight: 20,wordWrap: 'anywhere'}}>
                            <h5><b>JSON Tree</b><br/></h5>
                            {
                                Object.keys(this.state.jsonData).length > 0 ? <JSONTree data={this.state.jsonData}
                                    //hideRoot={true}
                                                                                        shouldExpandNode={()=>false}
                                                                                        theme={{
                                                                                            scheme: 'monokai',
                                                                                            author: 'wimer hazenberg (http://www.monokai.nl)',
                                                                                            base00: '#272822',
                                                                                            valueLabel: {
                                                                                                display :"none",
                                                                                            },
                                                                                            value: {
                                                                                                display :"none",
                                                                                            }
                                                                                        }}
                                                                                        valueRenderer={raw => <span onClick={()=> alert(raw)}>{raw}</span>}
                                                                                        labelRenderer={raw => <span onClick={()=> this.setTableRule(raw)}>{raw[0]}</span>}
                                                                                        getItemString={(type, data, itemType, itemString) =>
                                                                                            <span onClick={()=> this.setTableData("", data)}>
                                                                            {/*{itemType} {itemString} View*/}
                                                                        </span>
                                                                                        }
                                /> :  <span>Loading...</span>
                            }

                        </div>
                    </div>
                    <div className={ this.state.hideSection3 === false ? "col-sm-6" : "col-sm-9" }>
                        <div className="content-viewer" style={{ overflow: "auto", marginRight: 20}}>
                            <h2><b>{this.state.pathHierarchy.length > 0 ? this.state.pathHierarchy[0] : null}</b></h2><br/>
                            {
                                tableContent.length>0 ? <table border="1" cellPadding={"15"} style={this.state.hideSection3 === false ? {width : "auto"} : {width : "100%"}}>
                                    <tr><td style={{fontWeight: 'bold'}}>Key</td><td style={{fontWeight: 'bold'}}>Value</td></tr>
                                    {
                                        tableContent
                                    }
                                </table> : null
                            }
                        </div>
                    </div>

                    {this.state.hideSection3 == false ?
                        <div className={"col-sm-3"}>
                            <div className="content-viewer" style={{ overflow: "auto", marginRight: 20, wordWrap: 'break-word'}}>

                                <div className={"row"}>
                                    <h5><b>Full Path</b></h5>
                                    <div style={{marginLeft : "auto"}}>
                                        {
                                            this.state.hideSection3 == false ? <p> <a href="javascript:void(0)" onClick={()=>this.hideSection3("hide3")}>Hide</a> </p>  : <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 1})} >View</a>
                                        }
                                    </div>
                                </div>
                                {
                                    this.state.viewText == 1 ? <p> <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 0})}>Hide</a> {JSON.stringify(this.state.pathHierarchy)}</p>  : <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 1})} >View</a>
                                }
                                <br/><br/>
                                <h5><b>Full Data</b></h5>
                                {
                                    this.state.viewText == 2 ? <p> <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 0})}>Hide</a> {JSON.stringify(this.state.jsonData)}</p>  : <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 2})} >View</a>
                                }
                                <br/><br/>
                                <h5><b>Full Json Data</b></h5>
                                {
                                    this.state.viewText == 3 ? <p> <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 0})}>Hide</a> {JSON.stringify(tableDetailView)}</p>  : <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 3})} >View</a>
                                }
                                <br/><br/>

                                <h5><b>Rule for Node</b></h5>
                                {
                                    this.state.viewText == 4 ? <p> <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 0})}>Hide</a> {JSON.stringify(this.state.tableRules)}</p>  : <a href="javascript:void(0)" onClick={()=>this.setState({viewText: 4})} >View</a>
                                }
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        )
    }
}

export default CustomJsonViewer;
