require 'rails_helper'

RSpec.describe TicketsController, type: :controller do
  before(:each) do
    @user = FactoryGirl.create(:user)
    sign_in @user
  end

  describe 'GET #show' do
    subject { JSON.parse(response.body)["id"]}
    let!(:ticket) { create(:ticket) }

    before(:each) do
      get :show, params: { id: ticket.id }, format: :json
    end

    it { is_expected.to eq(ticket.id) }
  end

  describe 'GET #index' do
    subject { JSON.parse(response.body).count }
    let!(:tickets) { create_list(:ticket, 5) }

    before(:each) do
      get :index, format: :json
    end

    it { is_expected.to eq(tickets.count) }
  end

  describe 'GET #mine' do
    subject { JSON.parse(response.body).count }
    let!(:my_tickets) { create_list(:ticket, 5, creator: @user) }
    let!(:tickets) { create_list(:ticket, 5) }

    before(:each) do
      get :mine, format: :json
    end

    it { is_expected.to eq(my_tickets.count) }
  end

  describe 'GET #closed_last_30_days' do
    subject { JSON.parse(response.body).count }
    let!(:my_tickets) { create_list(:ticket, 2, assignee: @user) }
    let!(:my_closed_tickets) { create_list(:ticket, 3, assignee: @user) }
    let!(:tickets) { create_list(:ticket, 5) }

    before(:each) do
      my_closed_tickets.each { |t| t.update(status: 'closed') }
      get :closed_last_30_days, format: :json
    end

    it { is_expected.to eq(my_closed_tickets.count) }
  end

  describe 'GET #assinged_to_me' do
    subject { JSON.parse(response.body).count }
    let!(:my_assigned_tickets) { create_list(:ticket, 5, assignee: @user) }
    let!(:tickets) { create_list(:ticket, 5) }

    before(:each) do
      get :assigned_to_me, format: :json
    end

    it { is_expected.to eq(my_assigned_tickets.count) }
  end

  describe 'PATCH #assign_to_me/:id' do
    subject { JSON.parse(response.body).count }
    let!(:ticket) { create(:ticket) }

    it('assigns ticket to the current_user') do
      expect {
        patch :assign_to_me, params: { id: ticket.id }, format: :json
      }.to change { Ticket.where(assignee_id: @user.id).count }.by(1)
    end
  end

  describe 'PATCH #update/:id' do
    let(:attrs) { { status: 'in progress', priority: 'high' } }
    let!(:ticket) { create(:ticket) }

    before(:each) do
      patch :update, params: { id: ticket.id, ticket: attrs }, format: :json
      ticket.reload
    end

    it { expect(ticket.status).to eq attrs[:status] }
    it { expect(ticket.priority).to eq attrs[:priority] }
  end

  describe 'POST #create' do
    context('with valid attributes') do
      it('creates new ticket') do
        expect {
          post :create, params: { ticket: attributes_for(:ticket) }, format: :json
        }.to change { Ticket.count }.by(1)
      end
    end
  end
end
