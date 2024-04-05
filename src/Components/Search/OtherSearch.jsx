import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import Search from './Search'; // Import the Search component from appropriate location

class OtherSearch extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path='/Search/:query' render={(props) => (
                        <Search query={props.match.params.query} />
                    )} />
                    {/* Other routes */}
                    {/* Include the imported routes */}
                </Switch>
            </>
        );
    }
}

export default OtherSearch;
