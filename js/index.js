"use strict";

var CamperRow = React.createClass({
  displayName: "CamperRow",

  render: function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.rank
      ),
      React.createElement(
        "td",
        null,
        React.createElement("img", { height: "80", width: "80", src: this.props.camper.img }),
        " ",
        this.props.camper.username
      ),
      React.createElement(
        "td",
        null,
        this.props.camper.recent
      ),
      React.createElement(
        "td",
        null,
        this.props.camper.alltime
      )
    );
  }
});

var LeaderList = React.createClass({
  displayName: "LeaderList",

  render: function render() {
    var rows = [];
    this.props.leaders.forEach(function (camper, rank) {
      rows.push(React.createElement(CamperRow, { rank: rank + 1, camper: camper, key: camper.username }));
    });
    return React.createElement(
      "tbody",
      null,
      rows
    );
  }
});

var HeaderBar = React.createClass({
  displayName: "HeaderBar",

  render: function render() {
    return React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          null,
          "Rank"
        ),
        React.createElement(
          "th",
          null,
          "Username"
        ),
        React.createElement(
          "th",
          null,
          React.createElement(
            "span",
            { className: "sortText", onClick: this.props.sortByRecent },
            "Past 30 Days"
          )
        ),
        React.createElement(
          "th",
          null,
          React.createElement(
            "span",
            { className: "sortText", onClick: this.props.sortByAlltime },
            "All Time"
          )
        )
      )
    );
  }
});

var LeaderTable = React.createClass({
  displayName: "LeaderTable",

  getInitialState: function getInitialState() {
    return { leaders: [] };
  },
  componentDidMount: function componentDidMount() {
    $.getJSON(this.props.url, function (leaders) {
      this.setState({ leaders: leaders });
    }.bind(this));
  },
  sortByRecent: function sortByRecent() {
    this.state.leaders.sort(function (a, b) {
      return b.recent - a.recent;
    });
    this.setState({ leaders: this.state.leaders });
  },
  sortByAlltime: function sortByAlltime() {
    this.state.leaders.sort(function (a, b) {
      return b.alltime - a.alltime;
    });
    this.setState({ leaders: this.state.leaders });
  },
  render: function render() {
    return React.createElement(
      "table",
      null,
      React.createElement(
        "caption",
        null,
        "FCC Brownie Points Leaderboard"
      ),
      React.createElement(HeaderBar, { sortByRecent: this.sortByRecent,
        sortByAlltime: this.sortByAlltime }),
      React.createElement(LeaderList, { leaders: this.state.leaders })
    );
  }
});

React.render(React.createElement(LeaderTable, { url: "http://fcctop100.herokuapp.com/api/fccusers/top/recent" }), document.getElementById('container'));