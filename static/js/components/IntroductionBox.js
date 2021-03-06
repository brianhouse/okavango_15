
import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import autobind from 'autobind-decorator'

class IntroductionBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      complete: false,
      contentEnabled: false,
      startDate: -1,
      currentPosts: [],
      posts: [
        {
          content: <p key="0"></p>,
          timeRange: [0, 4000]
        },
        {
          content: <p key="1">Beginning in 2015,a group of Ba'yei, scientists and explorers have been exploring the Okavango River System in traditional flat-bottomed boats, gathering crucial biodiversity and environmental data.</p>,
          timeRange: [4000, 11000]
        },
        {
          content: <p key="2">You can use this platform to explore what the team saw and experienced on their last expedition through this verdant and vitally important ecosystem.</p>,
          timeRange: [11000, 19000]
        }
      ]
    }
  }

  @autobind
  skip () {
    const { enableContent } = this.props
    this.state.complete = true
    this.state.contentEnabled = true
    enableContent()
  }

  @autobind
  tick () {
    const { enableContent } = this.props
    const { posts, startDate } = this.state

    if (location.pathname !== '/map') {
      requestAnimationFrame(this.tick)
      return
    } else if (startDate === -1) {
      this.setState({
        ...this.state,
        startDate: Date.now()
      })
      requestAnimationFrame(this.tick)
      return
    }

    const now = Date.now() - startDate
    var currentPosts = []
    posts.forEach(p => {
      if (p.timeRange[0] <= now && p.timeRange[1] > now) {
        currentPosts.push(p)
      }
    })

    if (now > posts[posts.length - 1].timeRange[1] - 6000 && !this.state.contentEnabled) {
      this.state.contentEnabled = true
      enableContent()
    }

    var flag = true
    if (currentPosts.length !== this.state.currentPosts.length) flag = false
    else {
      for (var i = 0; i < Math.max(currentPosts.length, this.state.currentPosts.length); i++) {
        if (currentPosts[i] !== this.state.currentPosts[i]) {
          flag = false
          break
        }
      }
    }

    if (!flag) {
      this.setState({
        ...this.state,
        currentPosts: currentPosts
      })
    }
    if (now > posts[posts.length - 1].timeRange[1]) {
      this.state.complete = true
      return
    }
    requestAnimationFrame(this.tick)
  }

  componentDidMount () {
    requestAnimationFrame(this.tick)
  }

  render () {
    const { currentPosts, complete } = this.state
    const { animate } = this.props
    const posts = currentPosts.map(p => {
      return p.content
    })

    const container = () => {
      return (
        <ReactCSSTransitionGroup transitionName="notif" transitionEnterTimeout={500} transitionLeaveTimeout={200}>
          {posts}
        </ReactCSSTransitionGroup>
      )
    }

    // if (complete || !animate) return <div></div>
    if (complete) return <div></div>
    return (
      <div id="IntroductionBox">
        {container()}
      </div>
    )
  }
}

IntroductionBox.propTypes = {
  enableContent: PropTypes.func.isRequired,
  animate: PropTypes.bool.isRequired
}

export default IntroductionBox
