import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectReddit, refreshReddit } from "../actions";
import Picker from "./Picker";
import Posts from "./Posts";

const AsyncApp = ({
  selectReddit,
  refreshReddit,
  lastUpdated,
  selectedReddit,
  isFetching,
  posts,
}) => {
  
  const handleChange = (e) => {
    selectReddit(e);
  };

  const handleRefreshClick = (e) => {
    e.preventDefault();
    refreshReddit(selectedReddit);
  };

  return (
    <div>
      <Picker
        value={selectedReddit}
        onChange={handleChange}
        options={["reactjs", "frontend"]}
      />
      <p>
        {lastUpdated && (
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
          </span>
        )}
        {!isFetching && (
          <a href="#" onClick={handleRefreshClick}>
            Refresh
          </a>
        )}
      </p>
      {isFetching && posts.length === 0 && <h2>Loading...</h2>}
      {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
      {posts.length > 0 && (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
      )}
    </div>  
  );
};

AsyncApp.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{
  const { selectedReddit, postsByReddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsByReddit[
    selectedReddit
  ] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps, { selectReddit, refreshReddit })(
  AsyncApp
);
