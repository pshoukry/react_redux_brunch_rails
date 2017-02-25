class CommentsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    @comment = Comment.create(comment_params)
    @comment.user = current_user
    @comment.save
    render json: @comment
  end

  private

  def comment_params
    params.require(:comment).permit(:comment, :ticket_id)
  end
end
