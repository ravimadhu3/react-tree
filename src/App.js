import React from 'react';
import './App.css';
import DatatablePage from './DataTable'
import JsonTreeViewer from './JsonTreeViewer'
import CustomJsonViewer from "./CustomJsonViewer";

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            activeTab: 2,
            flowsList: {},
            dataStoreList: {},
            activeFlowFromListIndex: 1,
            url: ""

        }
    }

    fetchDataStore() {
        // fetch("http://localhost:8081/fds/data-store")
        fetch("http://localhost:8081/fds/treeview")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dataStoreList: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchFlowList() {
        fetch("http://localhost:8081/fds/flow-list")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        flowsList: result['flows'],
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchDataStore()
        this.fetchFlowList()
    }

    changeTab(value) {
        this.setState({activeTab: value})
    }

    changeFlow(value, url) {
        this.setState({activeFlowFromListIndex: value, url : url})
    }

    render() {
        let that = this;

        let flowsList = this.state.flowsList
        let flowsListContent = []
        if (this.state.activeTab == 1) {
            Object.keys(flowsList).forEach(function (item) {
                let url = flowsList[item].url
                let name = flowsList[item].name
                flowsListContent.push(<li className="list-group-item" onClick={() => that.changeFlow(item, url)}>{name}
                    <i className="fa-angle-right fa icon-right "></i></li>)
            });
        }

        return (
            <div>
                <div className="navbar">
                    <div className="row menu">
                        <div className={this.state.activeTab == 1 ? "col-sm-3 flex-center tab-active" : "col-sm-3 flex-center" } onClick={() => this.changeTab(1)}>
                            Flows
                        </div>
                        <div className={this.state.activeTab == 0 ? "col-sm-3 flex-center tab-active" : "col-sm-3 flex-center" } onClick={() => this.changeTab(0)}>
                            Data Store
                        </div>
                        <div className={this.state.activeTab == 2 ? "col-sm-3 flex-center tab-active" : "col-sm-3 flex-center"} onClick={() => this.changeTab(2)}>
                            Json Viewer
                        </div>
                    </div>
                </div>
                <br/>
                <div className="container-fluid">
                    {
                        this.state.activeTab == 0 ? <JsonTreeViewer json={this.state.dataStoreList}/> : null
                    }
                    {
                        this.state.activeTab == 1 ? <div className={"row"}>
                            <div className="col-sm-3">

                                <div className="content-viewer">
                                    <ul className="list-group">
                                        {flowsListContent}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-9">

                                <div className="content-viewer">
                                    <iframe src={that.state.url} frameBorder="0" width={"100%"} height={"100%"}></iframe>
                                </div>
                            </div>
                        </div> : null
                    }
                    {
                        this.state.activeTab == 2 ? <CustomJsonViewer /> : null
                    }
                </div>
            </div>

        );
    }
}

export default App;
