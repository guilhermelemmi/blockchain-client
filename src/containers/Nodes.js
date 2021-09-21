import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/nodes";
import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";

export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeURL: null,
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    this.props.actions.checkNodeStatuses(this.props.nodes);
  }

  toggleNodeExpanded(node) {
    this.setState({
      expandedNodeURL:
        node.url === this.state.expandedNodeURL ? null : node.url,
    });
  }

  render() {
    const { nodes } = this.props;
    return (
      <Box paddingTop={7}>
        <Typography variant="h4" component="h1">
          <strong style={{ color: "#000" }}>Nodes</strong>
        </Typography>
        {nodes.map((node) => {
          return (
            <Node
              node={node}
              key={node.url}
              expanded={node.url === this.state.expandedNodeURL}
              toggleNodeExpanded={this.toggleNodeExpanded}
            />
          );
        })}
      </Box>
    );
  }
}

Nodes.propTypes = {
  actions: PropTypes.object.isRequired,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      online: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      blocks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    })
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    nodes: state.entities.nodes.allIds.map(
      (nodeId) => state.entities.nodes.byId[nodeId]
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
