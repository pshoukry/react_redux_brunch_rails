require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  before(:each) do
    @user = FactoryGirl.create(:user)
    sign_in @user
  end

  describe 'POST #create' do
    context('with valid attributes') do
      it('creates new comment') do
        expect {
          post :create, params: { comment: attributes_for(:comment) }, format: :json
        }.to change { Comment.count }.by(1)
      end
    end
  end
end
