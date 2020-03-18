import React from 'react';
import './App.css';
import JSONTree from 'react-json-tree'

class JsonTreeViewer extends React.Component {
    render() {
        const json = {
            array: [1, 2, 3],
            bool: true,
            object: {
                foo: 'bar'
            },
        }
        return (
            <div className={"col-sm-12"}>
                <div className="content-viewer">
                <h1>Json Tree Viewer <br/></h1>
                <JSONTree data={this.props.json} />
                </div>
            </div>
        )
    }
}

export default JsonTreeViewer;
