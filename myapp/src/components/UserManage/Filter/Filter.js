import React, { Component } from "react";
import axios from "axios";

export default class Filter extends Component {
  constructor() {
    super();
    this.state = {
      selectValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    var y = [];
    var data;
    // if (e === "all") {
    //   data = "http://localhost:3000/users";
    // }else{
    //   data = "http://localhost:3000/users";
    // }
    axios
      .get(`http://localhost:3000/users`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then(response => {
        response.data.map(item => {
          if (e === "all") {
            y.push(item);
          } else {
            var itemActive =
              typeof item.active === "boolean"
                ? item.active.toString()
                : item.active;
            if (itemActive === e) {
              y.push(item);
            }
          }
        });

        this.props.select(y);
      });
  }
  render() {
    return (
      <div>
        <span>Filter Status</span>&nbsp;&nbsp;
        <select
          className="browser-default custom-select"
          style={{ width: 200 }}
          onChange={e => this.handleChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    );
  }
}
