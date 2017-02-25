class TicketsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    @tickets = Ticket.all
    render json: @tickets, include: {
      creator: { only: :full_name }, assignee: { only: :full_name }
    }
  end

  def show
    @ticket = Ticket.find(params[:id])
    render json: @ticket, include: [:creator, :assignee, comments: {include: [:user]} ]
  end

  def mine
    @tickets = Ticket.where(creator_id: current_user.id)
    render json: @tickets, include: {
      creator: { only: :full_name }, assignee: { only: :full_name }
    }
  end

  def closed_last_30_days
    @tickets = Ticket.where(assignee_id: current_user.id, status: 'closed')
      .where('updated_at > ?', Time.now.advance(days: -30))
    render json: @tickets, include: {
      creator: { only: :full_name }, assignee: { only: :full_name }
    }
  end

  def assigned_to_me
    @tickets = Ticket.where(assignee_id: current_user.id)
    render json: @tickets, include: {
      creator: { only: :full_name }, assignee: { only: :full_name }
    }
  end

  def assign_to_me
    @ticket = Ticket.find(params[:id])
    @ticket.assignee = current_user
    @ticket.save
    render json: @ticket
  end

  def update
    @ticket = Ticket.find(params[:id])
    @ticket.update(ticket_params)
    render json: @ticket
  end

  def create
    @ticket = Ticket.new(ticket_params)
    @ticket.creator = current_user
    @ticket.save
    render json: @ticket
  end

  private

  def ticket_params
    params.require(:ticket).permit(:title, :description, :status, :priority)
  end
end
