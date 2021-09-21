import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/nodes";
import { CircularProgress, List } from "@material-ui/core";
import Block from "../components/Block";
import { ACTION_STATUSES } from "../constants/acctionStatuses";

export class Blocks extends React.Component {
  componentDidMount() {
    this.props.actions.fetchNodeBlocks(this.props.node);
  }

  renderBlocks = (blocks) =>
    blocks.map((block) => (
      <Block key={block.hash} index={block.index} data={block.data} />
    ));

  render() {
    const { blocks, error, loading } = this.props;
    if (error) {
      return <div>Oops, something wrong happened! :(</div>;
    }

    if (loading) {
      return <CircularProgress />;
    }

    return (
      <List style={{ flex: 1, padding: 0 }} divider>
        {this.renderBlocks(blocks)}
      </List>
    );
  }
}

Blocks.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  node: PropTypes.shape({
    url: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    blocks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      prevHash: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function mapStateToProps(state, ownProps) {
  const actionStatus = ownProps.node
    ? state.actionStatuses.fetchNodeBlocks[ownProps.node.url]
    : null;
  return {
    error: actionStatus ? actionStatus === ACTION_STATUSES.FAILURE : false,
    loading: actionStatus ? actionStatus === ACTION_STATUSES.START : false,
    blocks: ownProps.node
      ? ownProps.node.blocks.map(
          (blockId) => state.entities.blocks.byId[blockId]
        )
      : [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
