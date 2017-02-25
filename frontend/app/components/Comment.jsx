import React from 'react'

export default class Comment extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title"></h4>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.comment.user.full_name} says:</h6>
          <p className="card-text">{this.props.comment.comment}</p>
        </div>
      </div>
    )
  }
}
