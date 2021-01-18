import { Component } from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";

import { getPosts, getPostsBySubcategory } from "../../lib/api/listing";
import {
  getSupportPosts,
  getSupportPostsBySubcategory,
} from "../../lib/api/support";
import * as actions from "../../redux/actions";
import { useWindowSize } from "../../lib/hooks";

import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";

import styles from "./Category.module.css";
import globalStyles from "../../styles/Global.module.css";

class Category extends Component {
  //const router = useRouter();

  state = {
    loadingMore: false,
    posts: this.props.reduxPosts
      ? this.props.reduxPosts
      : this.props.allPosts.edges,
    hasNextPage: null,
    endCursor: null,
    numberOfPosts: 10,
    rendered: false,
    firstTimeRendered: false,
  };

  //const windowWidth = useWindowSize().width;

  componentDidMount() {
    if (!this.props.reduxPosts) {
      this.setState({
        firstTimeRendered: true,
      });
    }
    // if (!this.state.rendered) {
    //   this.calculateNumberOfPosts();
    // }
    window.addEventListener("scroll", this.onScrollHandler, false);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollHandler, false);
  }

  componentDidUpdate(prevProps) {
    // Sets posts on page change
    if (this.props.router.query != prevProps.router.query) {
      if (!this.props.reduxPosts) {
        this.setState({
          firstTimeRendered: true,
        });
      }
      this.setState({
        posts: this.props.allPosts.edges,
        reduxPosts: this.props.allPosts.edges,
      });
      this.calculateNumberOfPosts();
    }
  }

  calculateNumberOfPosts = () => {
    // Change number of posts according to screen size
    let count = this.state.numberOfPosts;
    if (process.browser) {
      if (window.width >= 640 && window.width < 1200) {
        count = 16;
      } else if (window.width >= 1200) {
        count = 15;
      }
    }
    if (count != 16) {
      // Remove unnecessary posts
      this.setState((prevState) => ({
        posts: prevState.posts.slice(0, count),
      }));
      // Run query to fetch corect endCursor
      this.loadSupportQuery(count);
    } else {
      // Set original endCursor
      this.setState({
        hasNextPage: this.props.allPosts.pageInfo.hasNextPage,
        endCursor: this.props.allPosts.pageInfo.endCursor,
      });
    }
    this.setState({
      numberOfPosts: count,
      rendered: true,
    });
  };

  loadSupportQuery = async (count) => {
    console.log("fetching support query");
    // Fetches only pageInfo object
    let supportQuery = null;
    if (this.props.subcategory) {
      supportQuery = await getSupportPostsBySubcategory(
        this.props.category,
        this.props.subcategory,
        null,
        count
      );
    } else {
      supportQuery = await getSupportPosts(this.props.category, null, count);
    }
    this.setState({
      hasNextPage: supportQuery.hasNextPage,
      endCursor: supportQuery.endCursor,
    });
    // setHasNextPage(supportQuery.hasNextPage);
    // setEndCursor(supportQuery.endCursor);
  };

  // Detecting scroll to bottom of the page
  onScrollHandler = () => {
    const siteHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight * 2;
    if (
      scrollPosition >= siteHeight &&
      !this.state.loadingMore &&
      this.state.hasNextPage &&
      this.state.endCursor
    ) {
      this.setState({
        loadingMore: true,
      });
      this.loadMorePosts();
    }
  };

  loadMorePosts = async () => {
    let newPosts = null;
    if (this.props.subcategory) {
      newPosts = await getPostsBySubcategory(
        this.props.category,
        this.props.subcategory,
        this.state.endCursor,
        this.state.numberOfPosts
      );
    } else {
      newPosts = await getPosts(
        this.props.category,
        this.state.endCursor,
        this.state.numberOfPosts
      );
    }
    this.setState({
      hasNextPage: newPosts.pageInfo.hasNextPage,
      endCursor: newPosts.pageInfo.endCursor,
    });
    const allPosts = [...this.state.posts];
    newPosts.edges.map((post) => {
      allPosts.push(post);
    });
    this.setState({
      posts: allPosts,
      loadingMore: false,
    });
  };

  render() {
    // if (windowWidth && !rendered) {
    //   calculateNumberOfPosts();
    // }
    if (!this.state.rendered) {
      this.calculateNumberOfPosts();
    }

    return (
      <div className={styles.container}>
        <Layout
          currentCategory={this.props.category}
          subcategories={this.props.subcategories}
          currentSubcategory={this.props.subcategory}
        >
          {this.state.rendered || this.props.reduxPosts ? (
            <FlipMove
              enterAnimation="fade"
              leaveAnimation="fade"
              duration={400}
              className={
                this.state.firstTimeRendered
                  ? [styles.Cards, globalStyles.FadeIn].join(" ")
                  : styles.Cards
              }
            >
              {this.state.posts.map(({ node }) =>
                node.featuredImage ? <Card post={node} key={node.id} /> : null
              )}
            </FlipMove>
          ) : null}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reduxPosts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  setReduxPosts: (posts) => dispatch(actions.setReduxPosts(posts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Category));
